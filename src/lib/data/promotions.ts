import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Promotion } from "@/lib/supabase/types";

/**
 * Получение последних 4 акций для главной страницы
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getLatestPromotions = cache(async (): Promise<Promotion[]> => {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("promotions")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(4);

	if (error) {
		console.error("Ошибка при загрузке последних акций:", error);
		return [];
	}

	return data || [];
});

/**
 * Получение всех активных акций
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getAllPromotions = cache(async (): Promise<Promotion[]> => {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("promotions")
		.select("*")
		.eq("is_active", true)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Ошибка при загрузке всех акций:", error);
		return [];
	}

	return data || [];
});

/**
 * Получение акции по ID
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getPromotionById = cache(
	async (promotionId: string): Promise<Promotion | null> => {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from("promotions")
			.select("*")
			.eq("id", promotionId)
			.single();

		if (error) {
			console.error(`Ошибка при загрузке акции ${promotionId}:`, error);
			return null;
		}

		return data;
	}
);

/**
 * Получение акций конкретного банка
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getPromotionsByBankId = cache(
	async (bankId: string): Promise<Promotion[]> => {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from("promotions")
			.select("*")
			.eq("bank_id", bankId)
			.eq("is_active", true)
			.order("created_at", { ascending: false });

		if (error) {
			console.error(`Ошибка при загрузке акций банка ${bankId}:`, error);
			return [];
		}

		return data || [];
	}
);
