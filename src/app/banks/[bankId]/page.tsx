import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparisonPanel } from "@/components/layout/comparison-panel";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { BankJsonLd, BreadcrumbJsonLd } from "@/components/structured-data";
import { getBankById, getTariffsByBankId } from "@/lib/data";
import type { Bank, Tariff } from "@/lib/supabase/types";
import { BankClientPage } from "./bank-client-page";

interface BankPageProps {
	params: Promise<{ bankId: string }>;
}

// ISR: обновление раз в 24 часа (информация о банке меняется редко)
export const revalidate = 86400;

export default async function BankPage({ params }: BankPageProps) {
	const { bankId } = await params;
	const bank = await getBankById(bankId);

	if (!bank) {
		console.error("Банк не найден:", bankId);
		notFound();
	}

	const bankTariffs = await getTariffsByBankId(bankId);

	return (
		<div className="flex min-h-screen flex-col">
			<BankJsonLd bank={bank as Bank} />
			<BreadcrumbJsonLd
				items={[
					{ name: "Главная", url: "/" },
					{ name: "Банки", url: "/banks" },
					{ name: bank.name, url: `/banks/${bank.id}` },
				]}
			/>
			<Header />
			<BankClientPage
				initialBank={bank as Bank}
				initialBankTariffs={(bankTariffs || []) as Tariff[]}
			/>
			<Footer />
			<ComparisonPanel />
		</div>
	);
}

export async function generateMetadata({
	params,
}: BankPageProps): Promise<Metadata> {
	const { bankId } = await params;
	const bank = await getBankById(bankId);

	if (!bank) {
		return {
			title: "Банк не найден",
		};
	}

	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rko-sravni.ru";
	const priceText =
		bank.min_price === 0
			? "бесплатно"
			: `от ${bank.min_price.toLocaleString("ru-RU")}₽`;

	return {
		title: `${bank.name} — РКО, тарифы и условия | Сравни РКО`,
		description: `${bank.description} ${bank.tariff_count} тарифов, ${priceText}/мес. Рейтинг ${bank.rating || "N/A"}.`,
		openGraph: {
			title: `${bank.name} — РКО ${priceText}/мес`,
			description: `${bank.description} ${bank.tariff_count} тарифов. Рейтинг ${bank.rating || "N/A"}.`,
			images: [
				{
					url: `${siteUrl}/og/banks/${bank.id}.png`,
					width: 1200,
					height: 630,
					alt: `РКО в банке ${bank.name}`,
				},
			],
			locale: "ru_RU",
			type: "website",
			siteName: "Сравни РКО",
		},
		twitter: {
			card: "summary_large_image",
			title: `${bank.name} — РКО ${priceText}/мес`,
			description: `${bank.description} ${bank.tariff_count} тарифов.`,
			images: [`${siteUrl}/og/banks/${bank.id}.png`],
		},
	};
}
