"use client";

import { X } from "lucide-react";
import { BankCard } from "@/components/cards/bank-card";
import { ComparisonPanel } from "@/components/layout/comparison-panel";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useBankFilters } from "@/hooks/use-bank-filters";
import type { Bank } from "@/lib/supabase/types";

type SortOption = "popularity" | "alphabet" | "price";

export default function BanksPageClient({
	initialBanks,
}: {
	initialBanks: Bank[];
}) {
	const {
		filteredBanks,
		filters,
		setHasFreeTariff,
		setHasOnlineOpening,
		setSortBy,
		clearFilters,
		hasActiveFilters,
	} = useBankFilters({ initialBanks });

	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<main className="flex-1 bg-background-secondary">
				<div className="container-custom py-8 md:py-12">
					{/* Page Header */}
					<div className="mb-8">
						<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
							Все банки с РКО
						</h1>
						<p className="text-foreground-secondary">
							Полный каталог банков с расчётно-кассовым обслуживанием для
							бизнеса
						</p>
					</div>

					{/* Filters and Sort */}
					<div className="bg-background rounded-xl border border-border p-4 md:p-6 mb-8">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
							{/* Filters */}
							<div className="flex items-center gap-6">
								<div className="flex items-center gap-2">
									<Checkbox
										id="freeTariff"
										checked={filters.hasFreeTariff}
										onCheckedChange={(checked) =>
											setHasFreeTariff(checked === true)
										}
									/>
									<Label
										htmlFor="freeTariff"
										className="text-sm cursor-pointer"
									>
										Есть бесплатный тариф
									</Label>
								</div>

								<div className="flex items-center gap-2">
									<Checkbox
										id="onlineOpening"
										checked={filters.hasOnlineOpening}
										onCheckedChange={(checked) =>
											setHasOnlineOpening(checked === true)
										}
									/>
									<Label
										htmlFor="onlineOpening"
										className="text-sm cursor-pointer"
									>
										Онлайн-открытие
									</Label>
								</div>

								{hasActiveFilters && (
									<Button
										variant="ghost"
										size="sm"
										onClick={clearFilters}
										className="text-foreground-secondary"
									>
										<X className="h-4 w-4 mr-1" />
										Сбросить
									</Button>
								)}
							</div>

							{/* Sort */}
							<div className="flex items-center gap-2">
								<Label
									htmlFor="sort"
									className="text-sm text-foreground-secondary whitespace-nowrap"
								>
									Сортировка:
								</Label>
								<Select
									value={filters.sortBy}
									onValueChange={(value: SortOption) => setSortBy(value)}
								>
									<SelectTrigger id="sort" className="w-[180px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="popularity">По популярности</SelectItem>
										<SelectItem value="alphabet">По алфавиту</SelectItem>
										<SelectItem value="price">По цене</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					{/* Results */}
					{filteredBanks.length > 0 ? (
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredBanks.map((bank) => (
								<BankCard key={bank.id} bank={bank} />
							))}
						</div>
					) : (
						<div className="text-center py-16">
							<p className="text-lg text-foreground-secondary mb-4">
								Банков с такими условиями не найдено
							</p>
							<Button onClick={clearFilters}>Сбросить фильтры</Button>
						</div>
					)}
				</div>
			</main>

			<Footer />
			<ComparisonPanel />
		</div>
	);
}
