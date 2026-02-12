import "server-only";

import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase-client";
import type { Tariff } from "@/lib/types";

const mapTariffRowToTariff = (
	row: {
		id: string;
		bank_id: string;
		name: string;
		description: string | null;
		target_audience: string | null;
		price: number;
		price_label: string;
		operations_limit: number | null;
		transfer_commission: string | null;
		cash_withdrawal_commission: string | null;
		free_transfers: number;
		features: string[];
		requirements: string[];
		is_recommended: boolean;
		recommendation_reason: string | null;
		banks?: {
			name: string;
			logo_url: string | null;
		} | null;
	} | null
): Tariff | null => {
	if (!row) {
		return null;
	}

	return {
		id: row.id,
		bankId: row.bank_id,
		bankName: row.banks?.name ?? "",
		bankLogo: row.banks?.logo_url ?? "",
		name: row.name,
		price: row.price,
		priceLabel: row.price_label,
		description: row.description ?? "",
		targetAudience: row.target_audience ?? "",
		operationsLimit: row.operations_limit ?? 0,
		transferCommission: row.transfer_commission ?? "",
		cashWithdrawalCommission: row.cash_withdrawal_commission ?? "",
		freeTransfers: row.free_transfers,
		features: row.features ?? [],
		requirements: row.requirements ?? [],
		isRecommended: row.is_recommended || undefined,
		recommendationReason: row.recommendation_reason ?? undefined,
	};
};

export const getTariffs = cache(async (): Promise<Tariff[]> => {
	const supabase = createSupabaseServerClient();

	const { data, error } = await supabase
		.from("tariffs")
		.select("*, banks ( name, logo_url )")
		.order("price", { ascending: true });

	if (error) {
		throw error;
	}

	return (data ?? [])
		.map((row) => mapTariffRowToTariff(row))
		.filter(Boolean) as Tariff[];
});

export const getTariffById = cache(
	async (id: string): Promise<Tariff | null> => {
		const supabase = createSupabaseServerClient();

		const { data, error } = await supabase
			.from("tariffs")
			.select("*, banks ( name, logo_url )")
			.eq("id", id)
			.maybeSingle();

		if (error) {
			throw error;
		}

		return mapTariffRowToTariff(data);
	}
);

export const getTariffsByBankId = cache(
	async (bankId: string): Promise<Tariff[]> => {
		const supabase = createSupabaseServerClient();

		const { data, error } = await supabase
			.from("tariffs")
			.select("*, banks ( name, logo_url )")
			.eq("bank_id", bankId)
			.order("price", { ascending: true });

		if (error) {
			throw error;
		}

		return (data ?? [])
			.map((row) => mapTariffRowToTariff(row))
			.filter(Boolean) as Tariff[];
	}
);
