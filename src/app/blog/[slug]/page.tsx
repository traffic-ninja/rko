import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/structured-data";
import { getPostBySlug } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/supabase/types";
import { BlogPostClientPage } from "./blog-client-page";

interface BlogPostPageProps {
	params: Promise<{ slug: string }>;
}

// ISR: обновление раз в 24 часа (опубликованные статьи не меняются)
export const revalidate = 86400;

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		return {
			title: "Статья не найдена",
		};
	}

	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rko-sravni.ru";

	return {
		title: `${post.title} | РКО Сравни`,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: [
				{
					url: post.image || `${siteUrl}/og/blog/${post.slug}.png`,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
			locale: "ru_RU",
			type: "article",
			siteName: "РКО Сравни",
			publishedTime: post.published_at,
			authors: [post.author_name],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.excerpt,
			images: [post.image || `${siteUrl}/og/blog/${post.slug}.png`],
		},
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		console.error("Статья не найдена:", slug);
		notFound();
	}

	// Получаем похожие статьи через createClient напрямую, т.к. это не критичные данные
	const supabase = await createClient();
	const { data: relatedPostsData, error: relatedPostsError } = await supabase
		.from("blog_posts")
		.select("*")
		.neq("id", post.id)
		.eq("category", post.category)
		.limit(3);

	if (relatedPostsError) {
		console.error("Ошибка при загрузке похожих статей:", relatedPostsError);
	}

	return (
		<>
			<ArticleJsonLd post={post as BlogPost} />
			<BreadcrumbJsonLd
				items={[
					{ name: "Главная", url: "/" },
					{ name: "Блог", url: "/blog" },
					{ name: post.title, url: `/blog/${post.slug}` },
				]}
			/>
			<BlogPostClientPage
				post={post as BlogPost}
				relatedPosts={(relatedPostsData || []) as BlogPost[]}
			/>
		</>
	);
}
