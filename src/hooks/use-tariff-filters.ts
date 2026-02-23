import { useMemo, useState } from "react";
import type { Tariff } from "@/lib/supabase/types";

interface UseTariffFiltersOptions {
	initialTariffs: Tariff[];
}

interface ScoredTariff extends Tariff {
	isRecommended?: boolean;
	recommendationReason?: string;
}

interface UseTariffFiltersReturn {
	recommendedTariffs: ScoredTariff[];
	topResults: ScoredTariff[];
	additionalResults: ScoredTariff[];
	filters: {
		businessType: string;
		monthlyTurnover: number;
		monthlyPayments: number;
		region: string;
		showResults: boolean;
	};
	setBusinessType: (value: string) => void;
	setMonthlyTurnover: (value: number) => void;
	setMonthlyPayments: (value: number) => void;
	setRegion: (value: string) => void;
	setShowResults: (value: boolean) => void;
	calculateRecommendations: () => void;
}

export function useTariffFilters({
	initialTariffs,
}: UseTariffFiltersOptions): UseTariffFiltersReturn {
	const [businessType, setBusinessType] = useState("");
	const [monthlyTurnover, setMonthlyTurnover] = useState(300000);
	const [monthlyPayments, setMonthlyPayments] = useState(20);
	const [region, setRegion] = useState("");
	const [showResults, setShowResults] = useState(false);

	const recommendedTariffs = useMemo(() => {
		if (!showResults) return [];

		const result = [...initialTariffs];

		// Score and sort tariffs based on user params
		const scoredTariffs = result.map((tariff) => {
			let score = 0;

			// Lower price is better for low turnover
			if (monthlyTurnover < 500000 && tariff.price === 0) {
				score += 30;
			} else if (monthlyTurnover < 1000000 && tariff.price < 1000) {
				score += 20;
			} else if (monthlyTurnover >= 1000000 && tariff.price >= 1000) {
				score += 15;
			}

			// More free transfers is better for more payments
			if (tariff.free_transfers >= monthlyPayments) {
				score += 25;
			} else if (tariff.free_transfers >= monthlyPayments * 0.5) {
				score += 15;
			}

			// Prefer tariffs marked as recommended
			if (tariff.is_recommended) {
				score += 10;
			}

			// Higher operations limit is better
			if (tariff.operations_limit >= monthlyPayments) {
				score += 10;
			}

			return { tariff, score };
		});

		scoredTariffs.sort((a, b) => b.score - a.score);

		return scoredTariffs.map((item, index) => ({
			...item.tariff,
			isRecommended: index < 3,
			recommendationReason:
				index === 0
					? "Лучший выбор по соотношению цены и возможностей"
					: index === 1
						? "Оптимальный вариант для вашего оборота"
						: index === 2
							? "Выгодные условия по переводам"
							: undefined,
		}));
	}, [showResults, monthlyTurnover, monthlyPayments, initialTariffs]);

	const topResults = recommendedTariffs.slice(0, 3);
	const additionalResults = recommendedTariffs.slice(3, 8);

	const calculateRecommendations = () => {
		setShowResults(true);
	};

	return {
		recommendedTariffs,
		topResults,
		additionalResults,
		filters: {
			businessType,
			monthlyTurnover,
			monthlyPayments,
			region,
			showResults,
		},
		setBusinessType,
		setMonthlyTurnover,
		setMonthlyPayments,
		setRegion,
		setShowResults,
		calculateRecommendations,
	};
}
