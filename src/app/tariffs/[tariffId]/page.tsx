import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, TariffJsonLd } from "@/components/structured-data";
import { createClient } from "@/lib/supabase/server";
import type { Bank, Tariff } from "@/lib/supabase/types";
import { TariffClientPage } from "./tariff-client-page";

interface TariffPageProps {
	params: Promise<{ tariffId: string }>;
}

export async function generateMetadata({
	params,
}: TariffPageProps): Promise<Metadata> {
	const { tariffId } = await params;
	const supabase = await createClient();

	const { data: tariff } = await supabase
		.from("tariffs")
		.select("*, banks(name)")
		.eq("id", tariffId)
		.single();

	if (!tariff) {
		return {
			title: "Тариф не найден",
		};
	}

	const bankName = (tariff.banks as { name: string })?.name || "Банк";
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rko-sravni.ru";

	return {
		title: `${tariff.name} — ${bankName} | РКО Сравни`,
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
			siteName: "РКО Сравни",
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
	const supabase = await createClient();

	const { data: tariff, error: tariffError } = await supabase
		.from("tariffs")
		.select("*")
		.eq("id", tariffId)
		.single();

	if (tariffError || !tariff) {
		console.error("Ошибка при загрузке тарифа:", tariffError);
		notFound();
	}

	const { data: bank, error: bankError } = await supabase
		.from("banks")
		.select("*")
		.eq("id", tariff.bank_id)
		.single();

	if (bankError || !bank) {
		console.error("Ошибка при загрузке банка:", bankError);
		notFound();
	}

	const { data: similarTariffsData, error: similarTariffsError } =
		await supabase
			.from("tariffs")
			.select("*")
			.neq("id", tariff.id)
			.or(
				`price.gte.${tariff.price - 1000},price.lte.${tariff.price + 1000},bank_id.eq.${tariff.bank_id}`
			)
			.limit(4);

	if (similarTariffsError) {
		console.error("Ошибка при загрузке похожих тарифов:", similarTariffsError);
	}

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
				similarTariffs={(similarTariffsData || []) as Tariff[]}
			/>
		</>
	);
}
