import type { MetadataRoute } from "next";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://rko-sravni.ru";

	// Статические страницы
	const staticPages = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/banks`,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/tariffs`,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/selection`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/comparison`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/promotions`,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.5,
		},
		{
			url: `${baseUrl}/contacts`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.5,
		},
	];

	// Динамические страницы банков и тарифов можно добавить позже
	// при подключении к реальной базе данных

	return staticPages;
}
