import type { Metadata } from "next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";
import { ComparisonClientPage } from "./comparison-client-page";

export const metadata: Metadata = {
	title: "Сравнение тарифов РКО — Сравните условия банков",
	description:
		"Сравните тарифы РКО разных банков в одной таблице. Ключевые условия, комиссии, лимиты. Выберите лучший вариант для вашего бизнеса.",
	keywords:
		"сравнение РКО, сравнение тарифов банков, таблица РКО, сравнить условия банков, РКО сравнить тарифы",
	openGraph: {
		title: "Сравнение тарифов РКО",
		description: "Сравните тарифы РКО разных банков в одной таблице.",
		locale: "ru_RU",
		type: "website",
		siteName: "РКО Сравни",
	},
	twitter: {
		card: "summary_large_image",
		title: "Сравнение тарифов РКО",
		description: "Сравните тарифы РКО разных банков в одной таблице.",
	},
};

export default async function ComparisonPage() {
	const supabase = await createClient();

	const { data: tariffs, error: tariffsError } = await supabase
		.from("tariffs")
		.select("*");

	if (tariffsError) {
		console.error("Ошибка при загрузке тарифов для сравнения:", tariffsError);
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

	if (!tariffs || tariffs.length === 0) {
		return (
			<div className="container-custom py-12">
				<div className="text-center text-foreground-secondary">
					<p>Тарифы для сравнения временно недоступны</p>
				</div>
			</div>
		);
	}

	return (
		<ComparisonClientPage
			initialTariffs={(tariffs as Tables<"tariffs">[]) || []}
		/>
	);
}
