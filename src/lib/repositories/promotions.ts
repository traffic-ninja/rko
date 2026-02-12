import "server-only";

import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase-client";
import type { Promotion } from "@/lib/types";

const mapPromotionRowToPromotion = (
	row: {
		id: string;
		bank_id: string | null;
		title: string;
		description: string | null;
		type: "cashback" | "free_service" | "bonus";
		expires_at: string | null;
		link: string;
		banks?: {
			name: string;
			logo_url: string | null;
		} | null;
	} | null
): Promotion | null => {
	if (!row || !row.bank_id || !row.banks) {
		return null;
	}

	return {
		id: row.id,
		bankId: row.bank_id,
		bankName: row.banks.name,
		bankLogo: row.banks.logo_url ?? "",
		title: row.title,
		description: row.description ?? "",
		type: row.type,
		expiresAt: row.expires_at ?? undefined,
		link: row.link,
	};
};

export const getPromotions = cache(async (): Promise<Promotion[]> => {
	const supabase = createSupabaseServerClient();

	const { data, error } = await supabase
		.from("promotions")
		.select("*, banks ( name, logo_url )")
		.order("expires_at", { ascending: true, nullsFirst: false });

	if (error) {
		throw error;
	}

	return (data ?? [])
		.map((row) => mapPromotionRowToPromotion(row))
		.filter(Boolean) as Promotion[];
});
