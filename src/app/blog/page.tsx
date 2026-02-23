import type { Metadata } from "next";
import { getAllPosts } from "@/lib/data";
import type { BlogPost } from "@/lib/supabase/types";
import { BlogClientPage } from "./blog-client-page";

// ISR: обновление раз в 1 час (список статей)
export const revalidate = 3600;

export const metadata: Metadata = {
	title: "Блог о РКО — Статьи, гайды и обзоры банков",
	description:
		"Полезные статьи о расчётно-кассовом обслуживании: гайды по выбору банка, обзоры тарифов, сравнения условий, новости финансового рынка.",
	keywords:
		"блог РКО, статьи о банках, гайды по РКО, обзоры тарифов, сравнение банков, новости РКО",
	openGraph: {
		title: "Блог о РКО — Статьи и гайды",
		description:
			"Полезные статьи о расчётно-кассовом обслуживании: гайды, обзоры, сравнения.",
		locale: "ru_RU",
		type: "website",
		siteName: "РКО Сравни",
	},
	twitter: {
		card: "summary_large_image",
		title: "Блог о РКО — Статьи и гайды",
		description: "Полезные статьи о расчётно-кассовом обслуживании.",
	},
};

export default async function BlogPage() {
	const blogPosts = await getAllPosts();

	if (!blogPosts || blogPosts.length === 0) {
		return (
			<div className="container-custom py-12 text-center text-foreground-secondary">
				<p>Статьи временно недоступны</p>
			</div>
		);
	}

	return <BlogClientPage initialBlogPosts={(blogPosts || []) as BlogPost[]} />;
}
