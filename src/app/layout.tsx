import type { Metadata, Viewport } from "next";
import type React from "react";
import "./globals.css";
import { ComparisonProvider } from "@/components/comparison-context";

export const metadata: Metadata = {
	title: "РКО Сравни — Сравнение тарифов банков для бизнеса",
	description:
		"Сравните тарифы РКО всех банков России. Умный подбор расчётно-кассового обслуживания для ИП, ООО и самозанятых. Актуальные условия и честное сравнение.",
	keywords:
		"РКО, расчётно-кассовое обслуживание, тарифы банков, открыть счёт ИП, счёт для бизнеса",
	generator: "v0.app",
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
		<html lang="ru">
			<body className={`font-sans antialiased`}>
				<ComparisonProvider>{children}</ComparisonProvider>
			</body>
		</html>
	);
}
