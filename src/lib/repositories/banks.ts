import "server-only";

import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase-client";
import type { Bank } from "@/lib/types";

const mapBankRowToBank = (
	row: {
		id: string;
		name: string;
		logo_url: string | null;
		description: string | null;
		rating: number | null;
		tariff_count: number;
		min_price: number;
		has_online_opening: boolean;
		has_free_tariff: boolean;
		bank_regions?: {
			regions: {
				name: string;
			} | null;
		}[];
	} | null
): Bank | null => {
	if (!row) {
		return null;
	}

	const regions =
		row.bank_regions
			?.map((relation) => relation.regions?.name)
			.filter(Boolean) ?? [];

	return {
		id: row.id,
		name: row.name,
		logo: row.logo_url ?? "",
		description: row.description ?? "",
		rating: row.rating ?? undefined,
		tariffCount: row.tariff_count,
		minPrice: row.min_price,
		hasOnlineOpening: row.has_online_opening,
		hasFreeTariff: row.has_free_tariff,
		regions,
	};
};

export const getBanks = cache(async (): Promise<Bank[]> => {
	const supabase = createSupabaseServerClient();

	const { data, error } = await supabase
		.from("banks")
		.select("*, bank_regions ( regions ( name ) )")
		.order("rating", { ascending: false });

	if (error) {
		throw error;
	}

	return (data ?? [])
		.map((row) => mapBankRowToBank(row))
		.filter(Boolean) as Bank[];
});

export const getBankById = cache(async (id: string): Promise<Bank | null> => {
	const supabase = createSupabaseServerClient();

	const { data, error } = await supabase
		.from("banks")
		.select("*, bank_regions ( regions ( name ) )")
		.eq("id", id)
		.maybeSingle();

	if (error) {
		throw error;
	}

	return mapBankRowToBank(data);
});
