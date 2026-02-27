import type { Metadata } from "next";
import { AboutPage } from "./about-page";

export const metadata: Metadata = {
	title: "О проекте Сравни РКО — Честное сравнение тарифов банков",
	description:
		"Сравни РКО — независимый сервис сравнения тарифов расчётно-кассового обслуживания. Помогаем предпринимателям выбрать оптимальный банк для бизнеса.",
	keywords:
		"о проекте Сравни РКО, сравнение РКО, сервис РКО, независимое сравнение банков, команда Сравни РКО",
	openGraph: {
		title: "О проекте Сравни РКО",
		description:
			"Независимый сервис сравнения тарифов РКО. Помогаем предпринимателям выбрать оптимальный банк.",
		locale: "ru_RU",
		type: "website",
		siteName: "Сравни РКО",
	},
	twitter: {
		card: "summary_large_image",
		title: "О проекте Сравни РКО",
		description: "Независимый сервис сравнения тарифов РКО.",
	},
};

export default function AboutPageWrapper() {
	return <AboutPage />;
}
