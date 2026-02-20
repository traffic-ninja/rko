import { useMemo, useState } from "react";
import type { Bank } from "@/lib/supabase/types";

type SortOption = "popularity" | "alphabet" | "price";

interface UseBankFiltersOptions {
	initialBanks: Bank[];
}

interface UseBankFiltersReturn {
	filteredBanks: Bank[];
	filters: {
		hasFreeTariff: boolean;
		hasOnlineOpening: boolean;
		businessType: string[];
		sortBy: SortOption;
	};
	setHasFreeTariff: (value: boolean) => void;
	setHasOnlineOpening: (value: boolean) => void;
	setBusinessType: (value: string[]) => void;
	setSortBy: (value: SortOption) => void;
	clearFilters: () => void;
	hasActiveFilters: boolean;
}

export function useBankFilters({
	initialBanks,
}: UseBankFiltersOptions): UseBankFiltersReturn {
	const [businessType, setBusinessType] = useState<string[]>([]);
	const [hasFreeTariff, setHasFreeTariff] = useState(false);
	const [hasOnlineOpening, setHasOnlineOpening] = useState(false);
	const [sortBy, setSortBy] = useState<SortOption>("popularity");

	const filteredBanks = useMemo(() => {
		let result = [...initialBanks];

		// Filter by free tariff
		if (hasFreeTariff) {
			result = result.filter((bank) => bank.has_free_tariff);
		}

		// Filter by online opening
		if (hasOnlineOpening) {
			result = result.filter((bank) => bank.has_online_opening);
		}

		// Sort
		switch (sortBy) {
			case "alphabet":
				result.sort((a, b) => a.name.localeCompare(b.name, "ru"));
				break;
			case "price":
				result.sort((a, b) => a.min_price - b.min_price);
				break;
			default:
				result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
				break;
		}

		return result;
	}, [initialBanks, hasFreeTariff, hasOnlineOpening, sortBy]);

	const clearFilters = () => {
		setBusinessType([]);
		setHasFreeTariff(false);
		setHasOnlineOpening(false);
		setSortBy("popularity");
	};

	const hasActiveFilters =
		hasFreeTariff || hasOnlineOpening || businessType.length > 0;

	return {
		filteredBanks,
		filters: {
			hasFreeTariff,
			hasOnlineOpening,
			businessType,
			sortBy,
		},
		setHasFreeTariff,
		setHasOnlineOpening,
		setBusinessType,
		setSortBy,
		clearFilters,
		hasActiveFilters,
	};
}
