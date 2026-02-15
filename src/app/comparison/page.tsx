"use client";

import { ExternalLink, Plus, Search, Trash2, Trophy, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useComparison } from "@/components/comparison-context";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { tariffs } from "@/lib/mock-data";
import type { Tariff } from "@/lib/types";

const comparisonRows = [
	{ key: "bankName", label: "Банк" },
	{ key: "priceLabel", label: "Стоимость обслуживания" },
	{ key: "freeTransfers", label: "Бесплатных платежей" },
	{ key: "operationsLimit", label: "Лимит операций" },
	{ key: "transferCommission", label: "Комиссия за перевод" },
	{ key: "cashWithdrawalCommission", label: "Снятие наличных" },
	{ key: "targetAudience", label: "Для кого подходит" },
] as const;

export default function ComparisonPage() {
	const {
		comparedTariffs,
		addToComparison,
		removeFromComparison,
		clearComparison,
	} = useComparison();
	const [searchQuery, setSearchQuery] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	// Find the best tariff (cheapest with most free transfers)
	const bestTariff =
		comparedTariffs.length >= 2
			? comparedTariffs.reduce((best, current) => {
					const bestScore = best.freeTransfers * 10 - best.price;
					const currentScore = current.freeTransfers * 10 - current.price;
					return currentScore > bestScore ? current : best;
				})
			: null;

	const filteredTariffs = tariffs.filter(
		(t) =>
			!comparedTariffs.find((ct) => ct.id === t.id) &&
			(t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				t.bankName.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	const handleAddTariff = (tariff: Tariff) => {
		addToComparison(tariff);
		setIsDialogOpen(false);
		setSearchQuery("");
	};

	const getValue = (tariff: Tariff, key: string) => {
		switch (key) {
			case "bankName":
				return (
					<div className="flex items-center gap-2">
						<img
							src={tariff.bankLogo || "/placeholder.svg"}
							alt=""
							className="h-6 w-6 rounded"
						/>
						<span>{tariff.bankName}</span>
					</div>
				);
			case "priceLabel":
				return <span className="font-semibold">{tariff.priceLabel}</span>;
			case "freeTransfers":
				return `${tariff.freeTransfers} шт.`;
			case "operationsLimit":
				return `${tariff.operationsLimit} платежей/мес`;
			default:
				return tariff[key as keyof Tariff] as string;
		}
	};

	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<main className="flex-1 bg-background-secondary">
				<div className="container-custom py-8 md:py-12">
					{/* Page Header */}
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
								Сравнение тарифов РКО
							</h1>
							<p className="text-foreground-secondary">
								Сравните условия выбранных тарифов для принятия решения
							</p>
						</div>
						<div className="flex items-center gap-3">
							<span className="text-sm text-foreground-secondary">
								Выбрано тарифов: <strong>{comparedTariffs.length}</strong> из 3
							</span>
							{comparedTariffs.length > 0 && (
								<Button
									variant="outline"
									size="sm"
									onClick={clearComparison}
									className="bg-transparent"
								>
									<Trash2 className="h-4 w-4 mr-2" />
									Очистить всё
								</Button>
							)}
						</div>
					</div>

					{comparedTariffs.length === 0 ? (
						/* Empty State */
						<Card className="text-center py-16">
							<CardContent>
								<div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
									<Plus className="h-8 w-8 text-foreground-muted" />
								</div>
								<h2 className="text-xl font-semibold text-foreground mb-2">
									Вы ещё не добавили тарифы для сравнения
								</h2>
								<p className="text-foreground-secondary mb-8 max-w-md mx-auto">
									Выберите тарифы на страницах банков или воспользуйтесь умным
									подбором
								</p>
								<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
									<Button asChild>
										<Link href="/selection">Подобрать тарифы</Link>
									</Button>
									<Button asChild variant="outline" className="bg-transparent">
										<Link href="/banks">Смотреть банки</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					) : (
						<>
							{/* Control Panel */}
							<div className="flex items-center gap-4 mb-6">
								{comparedTariffs.length < 3 && (
									<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
										<DialogTrigger asChild>
											<Button variant="outline" className="bg-transparent">
												<Plus className="h-4 w-4 mr-2" />
												Добавить тариф
											</Button>
										</DialogTrigger>
										<DialogContent className="sm:max-w-lg">
											<DialogHeader>
												<DialogTitle>Добавить тариф к сравнению</DialogTitle>
											</DialogHeader>
											<div className="space-y-4">
												<div className="relative">
													<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
													<Input
														placeholder="Поиск по названию или банку..."
														value={searchQuery}
														onChange={(e) => setSearchQuery(e.target.value)}
														className="pl-10"
													/>
												</div>
												<div className="max-h-80 overflow-y-auto space-y-2">
													{filteredTariffs.length > 0 ? (
														filteredTariffs.map((tariff) => (
															<button
																key={tariff.id}
																onClick={() => handleAddTariff(tariff)}
																className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors text-left"
															>
																<img
																	src={tariff.bankLogo || "/placeholder.svg"}
																	alt=""
																	className="h-10 w-10 rounded-lg object-cover shrink-0"
																/>
																<div className="flex-1 min-w-0">
																	<p className="font-medium text-foreground truncate">
																		{tariff.name}
																	</p>
																	<p className="text-sm text-foreground-secondary">
																		{tariff.bankName}
																	</p>
																</div>
																<span className="text-sm font-medium text-primary shrink-0">
																	{tariff.priceLabel}
																</span>
															</button>
														))
													) : (
														<p className="text-center text-foreground-secondary py-8">
															Тарифы не найдены
														</p>
													)}
												</div>
											</div>
										</DialogContent>
									</Dialog>
								)}
							</div>

							{comparedTariffs.length === 1 && (
								<Card className="mb-6 bg-info/10 border-info/20">
									<CardContent className="py-4">
										<p className="text-sm text-info">
											Добавьте ещё минимум 1 тариф для сравнения
										</p>
									</CardContent>
								</Card>
							)}

							{/* Comparison Table */}
							<Card className="overflow-hidden">
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead>
											<tr className="border-b border-border">
												<th className="p-4 text-left text-sm font-medium text-foreground-secondary bg-background-secondary w-48">
													Параметр
												</th>
												{comparedTariffs.map((tariff) => (
													<th
														key={tariff.id}
														className="p-4 min-w-[200px] bg-background"
													>
														<div className="relative">
															<button
																onClick={() => removeFromComparison(tariff.id)}
																className="absolute -top-1 -right-1 p-1 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground transition-colors"
																aria-label={`Убрать ${tariff.name} из сравнения`}
															>
																<X className="h-4 w-4" />
															</button>
															<div className="flex flex-col items-center">
																<img
																	src={tariff.bankLogo || "/placeholder.svg"}
																	alt=""
																	className="h-12 w-12 rounded-lg object-cover mb-2"
																/>
																<p className="font-semibold text-foreground">
																	{tariff.name}
																</p>
																{bestTariff?.id === tariff.id && (
																	<Badge variant="accent" className="mt-2">
																		<Trophy className="h-3 w-3 mr-1" />
																		Наш выбор
																	</Badge>
																)}
															</div>
														</div>
													</th>
												))}
												{comparedTariffs.length < 3 && (
													<th className="p-4 min-w-[200px] bg-background">
														<Dialog
															open={isDialogOpen}
															onOpenChange={setIsDialogOpen}
														>
															<DialogTrigger asChild>
																<button className="w-full h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-foreground-muted hover:border-primary hover:text-primary transition-colors">
																	<Plus className="h-6 w-6 mb-1" />
																	<span className="text-sm">Добавить</span>
																</button>
															</DialogTrigger>
														</Dialog>
													</th>
												)}
											</tr>
										</thead>
										<tbody>
											{comparisonRows.map((row, index) => (
												<tr
													key={row.key}
													className={`border-b border-border ${index % 2 === 0 ? "bg-background" : "bg-background-secondary"}`}
												>
													<td className="p-4 text-sm font-medium text-foreground-secondary">
														{row.label}
													</td>
													{comparedTariffs.map((tariff) => (
														<td
															key={tariff.id}
															className="p-4 text-sm text-foreground"
														>
															{getValue(tariff, row.key)}
														</td>
													))}
													{comparedTariffs.length < 3 && (
														<td className="p-4"></td>
													)}
												</tr>
											))}
											{/* Actions Row */}
											<tr className="bg-background">
												<td className="p-4"></td>
												{comparedTariffs.map((tariff) => (
													<td key={tariff.id} className="p-4">
														<div className="flex flex-col gap-2">
															<Button asChild size="sm">
																<a href="#" onClick={(e) => e.preventDefault()}>
																	<ExternalLink className="h-4 w-4 mr-2" />
																	Открыть РКО
																</a>
															</Button>
															<Button
																asChild
																variant="outline"
																size="sm"
																className="bg-transparent"
															>
																<Link href={`/tariffs/${tariff.id}`}>
																	Подробнее
																</Link>
															</Button>
														</div>
													</td>
												))}
												{comparedTariffs.length < 3 && (
													<td className="p-4"></td>
												)}
											</tr>
										</tbody>
									</table>
								</div>
							</Card>

							{/* Recommendation */}
							{bestTariff && comparedTariffs.length >= 2 && (
								<Card className="mt-8 bg-accent/5 border-accent/20">
									<CardContent className="py-6">
										<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
											<div className="flex items-start gap-4">
												<div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
													<Trophy className="h-6 w-6 text-accent" />
												</div>
												<div>
													<h3 className="text-lg font-semibold text-foreground">
														Рекомендуем: {bestTariff.name}
													</h3>
													<p className="text-foreground-secondary">
														Оптимальное соотношение цены и количества бесплатных
														операций для вашего бизнеса. При стоимости{" "}
														{bestTariff.priceLabel} вы получаете{" "}
														{bestTariff.freeTransfers} бесплатных платежей.
													</p>
												</div>
											</div>
											<Button asChild className="shrink-0">
												<a href="#" onClick={(e) => e.preventDefault()}>
													Открыть РКО в {bestTariff.bankName}
												</a>
											</Button>
										</div>
									</CardContent>
								</Card>
							)}
						</>
					)}
				</div>
			</main>

			<Footer />
		</div>
	);
}
