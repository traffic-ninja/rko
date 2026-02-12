import "server-only";

import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase-client";
import type { BlogPost } from "@/lib/types";

const mapBlogRowToBlogPost = (
	row: {
		id: string;
		slug: string;
		title: string;
		excerpt: string | null;
		content: string | null;
		image: string | null;
		category: "news" | "guides" | "reviews" | "comparisons";
		published_at: string | null;
		read_time: number | null;
		author_name: string | null;
		author_avatar: string | null;
		is_published: boolean;
	} | null
): BlogPost | null => {
	if (!row || !row.is_published) {
		return null;
	}

	return {
		id: row.id,
		slug: row.slug,
		title: row.title,
		excerpt: row.excerpt ?? "",
		content: row.content ?? "",
		image: row.image ?? "",
		category: row.category,
		publishedAt: row.published_at ?? new Date().toISOString(),
		readTime: row.read_time ?? 0,
		author: {
			name: row.author_name ?? "",
			avatar: row.author_avatar ?? undefined,
		},
	};
};

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
	const supabase = createSupabaseServerClient();

	const { data, error } = await supabase
		.from("blog_posts")
		.select(
			"id, slug, title, excerpt, content, image, category, published_at, read_time, author_name, author_avatar, is_published"
		)
		.eq("is_published", true)
		.order("published_at", { ascending: false });

	if (error) {
		throw error;
	}

	return (data ?? [])
		.map((row) => mapBlogRowToBlogPost(row))
		.filter(Boolean) as BlogPost[];
});

export const getBlogPostBySlug = cache(
	async (slug: string): Promise<BlogPost | null> => {
		const supabase = createSupabaseServerClient();

		const { data, error } = await supabase
			.from("blog_posts")
			.select(
				"id, slug, title, excerpt, content, image, category, published_at, read_time, author_name, author_avatar, is_published"
			)
			.eq("slug", slug)
			.eq("is_published", true)
			.maybeSingle();

		if (error) {
			throw error;
		}

		return mapBlogRowToBlogPost(data);
	}
);
