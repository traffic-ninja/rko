import type { Metadata } from "next";
import ContactsPage from "./contacts-page";

export const metadata: Metadata = {
  title: "Контакты — РКО Сравни",
  description: "Свяжитесь с нами по любым вопросам. Поддержка пользователей, партнёрство для банков, предложения по улучшению сервиса.",
  keywords: "контакты РКО Сравни, поддержка, обратная связь, сотрудничество, партнёрство",
  openGraph: {
    title: "Контакты — РКО Сравни",
    description: "Свяжитесь с нами по любым вопросам.",
    locale: "ru_RU",
    type: "website",
    siteName: "РКО Сравни",
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакты — РКО Сравни",
    description: "Свяжитесь с нами по любым вопросам.",
  },
};

export default function ContactsPageWrapper() {
  return <ContactsPage />;
}
