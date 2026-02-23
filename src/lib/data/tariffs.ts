import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Tariff } from "@/lib/supabase/types";

/**
 * Получение всех тарифов для сравнения
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getAllTariffs = cache(async (): Promise<Tariff[]> => {
	const supabase = await createClient();
	const { data, error } = await supabase.from("tariffs").select("*");

	if (error) {
		console.error("Ошибка при загрузке всех тарифов:", error);
		return [];
	}

	return data || [];
});

/**
 * Получение тарифа по ID
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getTariffById = cache(
	async (tariffId: string): Promise<Tariff | null> => {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from("tariffs")
			.select("*")
			.eq("id", tariffId)
			.single();

		if (error) {
			console.error(`Ошибка при загрузке тарифа ${tariffId}:`, error);
			return null;
		}

		return data;
	}
);

/**
 * Получение тарифа с данными банка
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getTariffWithBank = cache(async (tariffId: string) => {
	const supabase = await createClient();
	const { data: tariff, error: tariffError } = await supabase
		.from("tariffs")
		.select("*, banks(name, logo_url)")
		.eq("id", tariffId)
		.single();

	if (tariffError) {
		console.error(`Ошибка при загрузке тарифа ${tariffId}:`, tariffError);
		return null;
	}

	return tariff;
});

/**
 * Получение похожих тарифов по цене и банку
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getSimilarTariffs = cache(
	async (
		tariffId: string,
		price: number,
		bankId: string
	): Promise<Tariff[]> => {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from("tariffs")
			.select("*")
			.neq("id", tariffId)
			.or(
				`price.gte.${price - 1000},price.lte.${price + 1000},bank_id.eq.${bankId}`
			)
			.limit(4);

		if (error) {
			console.error("Ошибка при загрузке похожих тарифов:", error);
			return [];
		}

		return data || [];
	}
);

/**
 * Получение тарифов конкретного банка
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getTariffsByBankId = cache(
	async (bankId: string): Promise<Tariff[]> => {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from("tariffs")
			.select("*")
			.eq("bank_id", bankId);

		if (error) {
			console.error(`Ошибка при загрузке тарифов банка ${bankId}:`, error);
			return [];
		}

		return data || [];
	}
);

/**
 * Получение тарифов с фильтрацией по цене
 * Кэшируется в пределах одного запроса через React.cache
 */
export const getTariffsByPriceRange = cache(
	async (minPrice: number, maxPrice: number): Promise<Tariff[]> => {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from("tariffs")
			.select("*")
			.gte("price", minPrice)
			.lte("price", maxPrice);

		if (error) {
			console.error("Ошибка при загрузке тарифов по диапазону цен:", error);
			return [];
		}

		return data || [];
	}
);
