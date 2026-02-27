import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, TariffJsonLd } from "@/components/structured-data";
import { getBankById, getSimilarTariffs, getTariffById } from "@/lib/data";
import type { Bank, Tariff } from "@/lib/supabase/types";
import { TariffClientPage } from "./tariff-client-page";

interface TariffPageProps {
	params: Promise<{ tariffId: string }>;
}

// ISR: обновление раз в 24 часа (условия тарифов стабильны)
export const revalidate = 86400;

export async function generateMetadata({
	params,
}: TariffPageProps): Promise<Metadata> {
	const { tariffId } = await params;
	const tariff = await getTariffById(tariffId);

	if (!tariff) {
		return {
			title: "Тариф не найден",
		};
	}

	const bank = await getBankById(tariff.bank_id);
	const bankName = bank?.name || "Банк";
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rko-sravni.ru";

	return {
		title: `${tariff.name} — ${bankName} | Сравни РКО`,
		description: `${tariff.description} ${tariff.price_label}. ${tariff.operations_limit} платежей/мес.`,
		openGraph: {
			title: `${tariff.name} — ${tariff.price_label}`,
			description: `${tariff.description} ${tariff.operations_limit} платежей/мес.`,
			images: [
				{
					url: `${siteUrl}/og/tariffs/${tariff.id}.png`,
					width: 1200,
					height: 630,
					alt: `Тариф ${tariff.name} в банке ${bankName}`,
				},
			],
			locale: "ru_RU",
			type: "website",
			siteName: "Сравни РКО",
		},
		twitter: {
			card: "summary_large_image",
			title: `${tariff.name} — ${tariff.price_label}`,
			description: `${tariff.description}`,
			images: [`${siteUrl}/og/tariffs/${tariff.id}.png`],
		},
	};
}

export default async function TariffPage({ params }: TariffPageProps) {
	const { tariffId } = await params;
	const tariff = await getTariffById(tariffId);

	if (!tariff) {
		console.error("Тариф не найден:", tariffId);
		notFound();
	}

	const bank = await getBankById(tariff.bank_id);

	if (!bank) {
		console.error("Банк не найден:", tariff.bank_id);
		notFound();
	}

	const similarTariffs = await getSimilarTariffs(
		tariffId,
		tariff.price,
		tariff.bank_id
	);

	return (
		<>
			<TariffJsonLd tariff={tariff as Tariff} bankName={bank.name} />
			<BreadcrumbJsonLd
				items={[
					{ name: "Главная", url: "/" },
					{ name: "Банки", url: "/banks" },
					{ name: bank.name, url: `/banks/${bank.id}` },
					{ name: tariff.name, url: `/tariffs/${tariff.id}` },
				]}
			/>
			<TariffClientPage
				tariff={tariff as Tariff}
				bank={bank as Bank}
				similarTariffs={similarTariffs as Tariff[]}
			/>
		</>
	);
}
