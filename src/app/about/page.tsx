import type { Metadata } from "next";
import { AboutPage } from "./about-page";

export const metadata: Metadata = {
  title: "О проекте РКО Сравни — Честное сравнение тарифов банков",
  description: "РКО Сравни — независимый сервис сравнения тарифов расчётно-кассового обслуживания. Помогаем предпринимателям выбрать оптимальный банк для бизнеса.",
  keywords: "о проекте РКО Сравни, сравнение РКО, сервис РКО, независимое сравнение банков, команда РКО Сравни",
  openGraph: {
    title: "О проекте РКО Сравни",
    description: "Независимый сервис сравнения тарифов РКО. Помогаем предпринимателям выбрать оптимальный банк.",
    locale: "ru_RU",
    type: "website",
    siteName: "РКО Сравни",
  },
  twitter: {
    card: "summary_large_image",
    title: "О проекте РКО Сравни",
    description: "Независимый сервис сравнения тарифов РКО.",
  },
};

export default function AboutPageWrapper() {
  return <AboutPage />;
}
