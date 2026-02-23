import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/supabase/types";

/**
 * Получение последних 3 постов для главной страницы
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getLatestPosts = cache(async (): Promise<BlogPost[]> => {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("blog_posts")
		.select("*")
		.order("published_at", { ascending: false })
		.limit(3);

	if (error) {
		console.error("Ошибка при загрузке последних постов:", error);
		return [];
	}

	return data || [];
});

/**
 * Получение всех постов для страницы блога
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("blog_posts")
		.select("*")
		.order("published_at", { ascending: false });

	if (error) {
		console.error("Ошибка при загрузке всех постов:", error);
		return [];
	}

	return data || [];
});

/**
 * Получение поста по slug
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getPostBySlug = cache(
	async (slug: string): Promise<BlogPost | null> => {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from("blog_posts")
			.select("*")
			.eq("slug", slug)
			.single();

		if (error) {
			console.error(`Ошибка при загрузке поста ${slug}:`, error);
			return null;
		}

		return data;
	}
);

/**
 * Получение поста по ID
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getPostById = cache(
	async (postId: string): Promise<BlogPost | null> => {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from("blog_posts")
			.select("*")
			.eq("id", postId)
			.single();

		if (error) {
			console.error(`Ошибка при загрузке поста ${postId}:`, error);
			return null;
		}

		return data;
	}
);

/**
 * Получение постов по категории
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getPostsByCategory = cache(
	async (category: string): Promise<BlogPost[]> => {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from("blog_posts")
			.select("*")
			.eq("category", category)
			.order("published_at", { ascending: false });

		if (error) {
			console.error(`Ошибка при загрузке постов категории ${category}:`, error);
			return [];
		}

		return data || [];
	}
);
