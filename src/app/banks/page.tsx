import type { Metadata } from "next";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

	if (!banks || banks.length === 0) {
		return (
			<div className="container-custom py-12">
				<div className="text-center text-foreground-secondary">
					<p>Данные о банках временно недоступны</p>
				</div>
			</div>
		);
	}

	return <BanksPageClient initialBanks={banks as Bank[]} />;
}
