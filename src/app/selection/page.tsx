import type { Metadata } from "next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createClient } from "@/lib/supabase/server";
import type { Tariff } from "@/lib/supabase/types";
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
		return (
			<div className="container-custom py-12">
				<Alert variant="destructive">
					<svg
						className="h-5 w-5 shrink-0"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					<AlertDescription>
						Ошибка загрузки тарифов. Пожалуйста, попробуйте позже.
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	if (banksError) {
		console.error("Ошибка при загрузке банков:", banksError);
		return (
			<div className="container-custom py-12">
				<Alert variant="destructive">
					<svg
						className="h-5 w-5 shrink-0"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					<AlertDescription>
						Ошибка загрузки данных о банках. Пожалуйста, попробуйте позже.
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	const allRegions = banksData?.flatMap((bank) => bank.regions || []) ?? [];
	const uniqueRegions = Array.from(new Set(allRegions));

	const tariffs = tariffsData || [];
	if (tariffs.length === 0) {
		return (
			<div className="container-custom py-12">
				<div className="text-center text-foreground-secondary">
					<p>Тарифы временно недоступны</p>
				</div>
			</div>
		);
	}

	return (
		<SelectionClientPage
			initialTariffs={tariffs}
			initialRegions={uniqueRegions}
		/>
	);
}
