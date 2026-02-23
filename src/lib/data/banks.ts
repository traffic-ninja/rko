import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Bank } from "@/lib/supabase/types";

/**
 * Получение топ-6 банков для главной страницы
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getTopBanks = cache(async (): Promise<Bank[]> => {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("banks")
		.select("*")
		.order("rating", { ascending: false })
		.limit(6);

	if (error) {
		console.error("Ошибка при загрузке топ банков:", error);
		return [];
	}

	return data || [];
});

/**
 * Получение всех банков для каталога
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getAllBanks = cache(async (): Promise<Bank[]> => {
	const supabase = await createClient();
	const { data, error } = await supabase.from("banks").select("*");

	if (error) {
		console.error("Ошибка при загрузке всех банков:", error);
		return [];
	}

	return data || [];
});

/**
 * Получение банка по ID
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getBankById = cache(
	async (bankId: string): Promise<Bank | null> => {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from("banks")
			.select("*")
			.eq("id", bankId)
			.single();

		if (error) {
			console.error(`Ошибка при загрузке банка ${bankId}:`, error);
			return null;
		}

		return data;
	}
);

/**
 * Получение банков по ID (для нескольких банков)
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getBanksByIds = cache(
	async (bankIds: string[]): Promise<Bank[]> => {
		if (bankIds.length === 0) return [];

		const supabase = await createClient();
		const { data, error } = await supabase
			.from("banks")
			.select("*")
			.in("id", bankIds);

		if (error) {
			console.error("Ошибка при загрузке банков по ID:", error);
			return [];
		}

		return data || [];
	}
);
