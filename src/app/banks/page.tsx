import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Bank } from "@/lib/supabase/types";
import BanksPageClient from "./banks-page-client";

// ISR: пересборка раз в час
export const revalidate = 3600;

export const metadata: Metadata = {
	title: "Все банки с РКО — Сравнение условий и тарифов",
	description:
		"Полный каталог банков с расчётно-кассовым обслуживанием для ИП, ООО и самозанятых. Сравните условия, тарифы и выберите оптимальный вариант для вашего бизнеса.",
	keywords:
		"банки РКО, расчётно-кассовое обслуживание, тарифы банков, открыть счёт ИП, счёт для ООО, сравнение банков",
	openGraph: {
		title: "Все банки с РКО — Сравнение условий",
		description:
			"Полный каталог банков с РКО. Сравните тарифы и выберите лучший вариант.",
		locale: "ru_RU",
		type: "website",
		siteName: "РКО Сравни",
	},
	twitter: {
		card: "summary_large_image",
		title: "Все банки с РКО — Сравнение условий",
		description:
			"Полный каталог банков с РКО. Сравните тарифы и выберите лучший вариант.",
	},
};

export default async function BanksPage() {
	const supabase = await createClient();
	const { data: banks, error } = await supabase.from("banks").select("*");

	if (error) {
		console.error("Error fetching banks:", error);
		return (
			<div>Ошибка загрузки данных о банках. Пожалуйста, попробуйте позже.</div>
		);
	}

	return <BanksPageClient initialBanks={banks as Bank[]} />;
}
