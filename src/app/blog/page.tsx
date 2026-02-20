import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/supabase/types";
import { BlogClientPage } from "./blog-client-page";

// ISR: пересборка раз в час
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
	const supabase = await createClient();

	const { data: blogPosts, error: blogPostsError } = await supabase
		.from("blog_posts")
		.select("*")
		.order("published_at", { ascending: false });

	if (blogPostsError) {
		console.error("Ошибка при загрузке статей блога:", blogPostsError);
		return <div>Ошибка загрузки статей.</div>;
	}

	return <BlogClientPage initialBlogPosts={(blogPosts || []) as BlogPost[]} />;
}
