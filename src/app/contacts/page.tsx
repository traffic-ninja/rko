import type { Metadata } from "next";
import ContactsPage from "./contacts-page";

export const metadata: Metadata = {
	title: "Контакты — Сравни РКО",
	description:
		"Свяжитесь с нами по любым вопросам. Поддержка пользователей, партнёрство для банков, предложения по улучшению сервиса.",
	keywords:
		"контакты Сравни РКО, поддержка, обратная связь, сотрудничество, партнёрство",
	openGraph: {
		title: "Контакты — Сравни РКО",
		description: "Свяжитесь с нами по любым вопросам.",
		locale: "ru_RU",
		type: "website",
		siteName: "Сравни РКО",
	},
	twitter: {
		card: "summary_large_image",
		title: "Контакты — Сравни РКО",
		description: "Свяжитесь с нами по любым вопросам.",
	},
};

export default function ContactsPageWrapper() {
	return <ContactsPage />;
}
