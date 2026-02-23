import type { Metadata } from "next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getAllTariffs } from "@/lib/data";
import type { Tariff } from "@/lib/supabase/types";
import { ComparisonClientPage } from "./comparison-client-page";

// ISR: обновление раз в 1 час (данные для сравнения)
export const revalidate = 3600;

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
	const tariffs = await getAllTariffs();

	if (!tariffs || tariffs.length === 0) {
		return (
			<div className="container-custom py-12">
				<div className="text-center text-foreground-secondary">
					<p>Тарифы для сравнения временно недоступны</p>
				</div>
			</div>
		);
	}

	return <ComparisonClientPage initialTariffs={tariffs} />;
}
