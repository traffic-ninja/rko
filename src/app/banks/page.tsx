import type { Metadata } from "next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getAllBanks } from "@/lib/data";
import type { Bank } from "@/lib/supabase/types";
import BanksPageClient from "./banks-page-client";

// ISR: обновление раз в 24 часа (данные обновляются редко)
export const revalidate = 86400;

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
	const banks = await getAllBanks();

	if (!banks || banks.length === 0) {
		return (
			<div className="container-custom py-12">
				<Alert>
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
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<AlertDescription>
						Данные о банках временно недоступны
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	return <BanksPageClient initialBanks={banks as Bank[]} />;
}
