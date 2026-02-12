import "server-only";

import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase-client";

export const getRegions = cache(async (): Promise<string[]> => {
	const supabase = createSupabaseServerClient();

	const { data, error } = await supabase
		.from("regions")
		.select("name")
		.order("name", { ascending: true });

	if (error) {
		throw error;
	}

	return (data ?? []).map((row) => row.name);
});
