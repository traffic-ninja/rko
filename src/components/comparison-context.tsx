"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import type { Tariff } from "@/lib/supabase/types";

interface ComparisonContextType {
	comparedTariffs: Tariff[];
	addToComparison: (tariff: Tariff) => void;
	removeFromComparison: (tariffId: string) => void;
	clearComparison: () => void;
	isInComparison: (tariffId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(
	undefined
);

export function ComparisonProvider({ children }: { children: ReactNode }) {
	const [comparedTariffs, setComparedTariffs] = useState<Tariff[]>([]);

	const addToComparison = useCallback((tariff: Tariff) => {
		setComparedTariffs((prev) => {
			if (prev.length >= 3) return prev;
			if (prev.find((t) => t.id === tariff.id)) return prev;
			return [...prev, tariff];
		});
	}, []);

	const removeFromComparison = useCallback((tariffId: string) => {
		setComparedTariffs((prev) => prev.filter((t) => t.id !== tariffId));
	}, []);

	const clearComparison = useCallback(() => {
		setComparedTariffs([]);
	}, []);

	const isInComparison = useCallback(
		(tariffId: string) => comparedTariffs.some((t) => t.id === tariffId),
		[comparedTariffs]
	);

	return (
		<ComparisonContext.Provider
			value={{
				comparedTariffs,
				addToComparison,
				removeFromComparison,
				clearComparison,
				isInComparison,
			}}
		>
			{children}
		</ComparisonContext.Provider>
	);
}

export function useComparison() {
	const context = useContext(ComparisonContext);
	if (!context) {
		throw new Error("useComparison must be used within a ComparisonProvider");
	}
	return context;
}
