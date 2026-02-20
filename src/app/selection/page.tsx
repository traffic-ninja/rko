import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";
import { SelectionClientPage } from "./selection-client-page";

export const metadata: Metadata = {
	title: "Подбор РКО — Умный поиск тарифов для бизнеса",
	description:
		"Подберите оптимальное расчётно-кассовое обслуживание для вашего бизнеса за 2 минуты. Умный алгоритм учтёт оборот, количество операций и регион.",
	keywords:
		"подбор РКО, найти тариф РКО, сравнение тарифов, калькулятор РКО, выбрать банк для ИП, выбрать банк для ООО",
	openGraph: {
		title: "Подбор РКО — Умный поиск тарифов",
		description: "Подберите оптимальное РКО для вашего бизнеса за 2 минуты.",
		locale: "ru_RU",
		type: "website",
		siteName: "РКО Сравни",
	},
	twitter: {
		card: "summary_large_image",
		title: "Подбор РКО — Умный поиск тарифов",
		description: "Подберите оптимальное РКО для вашего бизнеса за 2 минуты.",
	},
};

export default async function SelectionPage() {
	const supabase = await createClient();

	const [
		{ data: tariffsData, error: tariffsError },
		{ data: banksData, error: banksError },
	] = await Promise.all([
		supabase.from("tariffs").select("*"),
		supabase.from("banks").select("regions"),
	]);

	if (tariffsError) {
		console.error("Ошибка при загрузке тарифов:", tariffsError);
		return <div>Ошибка загрузки тарифов.</div>;
	}

	if (banksError) {
		console.error("Ошибка при загрузке банков:", banksError);
		return <div>Ошибка загрузки банков.</div>;
	}

	const allRegions = banksData.flatMap((bank) => bank.regions || []);
	const uniqueRegions = Array.from(new Set(allRegions));

	return (
		<SelectionClientPage
			initialTariffs={(tariffsData as Tables<"tariffs">[]) || []}
			initialRegions={uniqueRegions}
		/>
	);
}
