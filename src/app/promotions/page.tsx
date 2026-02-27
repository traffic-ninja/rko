import type { Metadata } from "next";
import { getAllBanks, getAllPromotions } from "@/lib/data";
import { PromotionsClientPage } from "./promotions-client-page";

// ISR: обновление раз в 1 час (акции)
export const revalidate = 3600;

export const metadata: Metadata = {
	title: "Спецпредложения и акции банков — Сравни РКО",
	description:
		"Актуальные акции и спецпредложения банков на РКО. Кэшбэк, бесплатное обслуживание, бонусы для новых клиентов. Успейте воспользоваться выгодными предложениями.",
	keywords:
		"акции РКО, спецпредложения банков, кэшбэк РКО, бесплатное обслуживание, бонусы банк",
	openGraph: {
		title: "Спецпредложения и акции банков на РКО",
		description:
			"Актуальные акции и спецпредложения банков на РКО. Кэшбэк, бесплатное обслуживание, бонусы.",
		locale: "ru_RU",
		type: "website",
		siteName: "Сравни РКО",
	},
	twitter: {
		card: "summary_large_image",
		title: "Спецпредложения и акции банков на РКО",
		description: "Актуальные акции и спецпредложения банков на РКО.",
	},
};

export default async function PromotionsPage() {
	const [promotions, banks] = await Promise.all([
		getAllPromotions(),
		getAllBanks(),
	]);

	return (
		<PromotionsClientPage initialPromotions={promotions} initialBanks={banks} />
	);
}
