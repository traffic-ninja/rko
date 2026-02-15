"use client";

import { Filter, Gift, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PromotionCard } from "@/components/cards/promotion-card";
import { ComparisonPanel } from "@/components/layout/comparison-panel";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { banks, promotions } from "@/lib/mock-data";

export default function PromotionsPage() {
	const [selectedType, setSelectedType] = useState<string>("all");
	const [selectedBank, setSelectedBank] = useState<string>("all");
	const [showFilters, setShowFilters] = useState(false);

	const filteredPromotions = useMemo(() => {
		let result = [...promotions];

		if (selectedType !== "all") {
			result = result.filter((p) => p.type === selectedType);
		}

		if (selectedBank !== "all") {
			result = result.filter((p) => p.bankId === selectedBank);
		}

		return result;
	}, [selectedType, selectedBank]);

	const clearFilters = () => {
		setSelectedType("all");
		setSelectedBank("all");
	};

	const hasActiveFilters = selectedType !== "all" || selectedBank !== "all";

	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<main className="flex-1 bg-background-secondary">
				<div className="container-custom py-8 md:py-12">
					{/* Page Header */}
					<div className="mb-8">
						<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
							Спецпредложения от банков
						</h1>
						<p className="text-foreground-secondary">
							Эксклюзивные условия и акции для пользователей нашего сервиса
						</p>
					</div>

					{/* Filters */}
					<div className="bg-background rounded-xl border border-border p-4 md:p-6 mb-8">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
							<Button
								variant="outline"
								className="md:hidden bg-transparent"
								onClick={() => setShowFilters(!showFilters)}
							>
								<Filter className="h-4 w-4 mr-2" />
								Фильтры
							</Button>

							<div
								className={`${showFilters ? "block" : "hidden"} md:flex md:items-center md:gap-6 space-y-4 md:space-y-0`}
							>
								<div className="flex items-center gap-2">
									<Label htmlFor="type" className="text-sm whitespace-nowrap">
										Тип акции:
									</Label>
									<Select value={selectedType} onValueChange={setSelectedType}>
										<SelectTrigger id="type" className="w-[180px]">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Все типы</SelectItem>
											<SelectItem value="cashback">Кэшбэк</SelectItem>
											<SelectItem value="free_service">
												Бесплатное обслуживание
											</SelectItem>
											<SelectItem value="bonus">Бонус</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="flex items-center gap-2">
									<Label htmlFor="bank" className="text-sm whitespace-nowrap">
										Банк:
									</Label>
									<Select value={selectedBank} onValueChange={setSelectedBank}>
										<SelectTrigger id="bank" className="w-[180px]">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Все банки</SelectItem>
											{banks.map((bank) => (
												<SelectItem key={bank.id} value={bank.id}>
													{bank.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
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
						</div>
					</div>

					{/* Results */}
					{filteredPromotions.length > 0 ? (
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{filteredPromotions.map((promotion) => (
								<PromotionCard key={promotion.id} promotion={promotion} />
							))}
						</div>
					) : (
						<div className="text-center py-16">
							<Gift className="h-12 w-12 text-foreground-muted mx-auto mb-4" />
							<p className="text-lg text-foreground-secondary mb-2">
								{hasActiveFilters
									? "Акций с такими условиями не найдено"
									: "Пока нет активных спецпредложений"}
							</p>
							<p className="text-sm text-foreground-muted mb-4">
								{hasActiveFilters
									? "Попробуйте изменить фильтры"
									: "Следите за обновлениями"}
							</p>
							{hasActiveFilters && (
								<Button onClick={clearFilters}>Сбросить фильтры</Button>
							)}
						</div>
					)}
				</div>
			</main>

			<Footer />
			<ComparisonPanel />
		</div>
	);
}
