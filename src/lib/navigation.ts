import type { LucideIcon } from "lucide-react";
import { BarChart3, BookOpen, Building2, Calculator, Gift } from "lucide-react";

export interface NavigationItem {
	name: string;
	href: string;
	icon: LucideIcon;
}

export const navigation: NavigationItem[] = [
	{ name: "Банки", href: "/banks", icon: Building2 },
	{ name: "Подбор РКО", href: "/selection", icon: Calculator },
	{ name: "Сравнение", href: "/comparison", icon: BarChart3 },
	{ name: "Спецпредложения", href: "/promotions", icon: Gift },
	{ name: "Блог", href: "/blog", icon: BookOpen },
];
