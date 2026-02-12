import "server-only";

import { getBanks } from "@/lib/repositories/banks";
import { getBlogPosts } from "@/lib/repositories/blog";
import { getPromotions } from "@/lib/repositories/promotions";
import type { Bank, BlogPost, Promotion } from "@/lib/types";

export interface HomeData {
	topBanks: Bank[];
	topPromotions: Promotion[];
	latestPosts: BlogPost[];
}

export const getHomeData = async (): Promise<HomeData> => {
	const [banks, promotions, blogPosts] = await Promise.all([
		getBanks(),
		getPromotions(),
		getBlogPosts(),
	]);

	return {
		topBanks: banks.slice(0, 6),
		topPromotions: promotions.slice(0, 4),
		latestPosts: blogPosts.slice(0, 3),
	};
};
