import type { Metadata, Viewport } from "next";
import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ComparisonProvider } from "@/components/comparison-context";

// Подключаем шрифт Inter с поддержкой кириллицы
const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "РКО Сравни — Сравнение тарифов банков для бизнеса",
  description:
    "Сравните тарифы РКО всех банков России. Умный подбор расчётно-кассового обслуживания для ИП, ООО и самозанятых. Актуальные условия и честное сравнение.",
  keywords:
    "РКО, расчётно-кассовое обслуживание, тарифы банков, открыть счёт ИП, счёт для бизнеса",
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ComparisonProvider>{children}</ComparisonProvider>
      </body>
    </html>
  );
}
