"use client";

import { ArrowRight, ChevronDown, Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useMemo, useState, useTransition } from "react";
import { TariffCard } from "@/components/cards/tariff-card";
import { useComparison } from "@/components/comparison-context";
import { ComparisonPanel } from "@/components/layout/comparison-panel";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { Tariff } from "@/lib/types";

type SelectionPageClientProps = {
	tariffs: Tariff[];
	regions: string[];
};

export const SelectionPageClient = ({
	tariffs,
	regions,
}: SelectionPageClientProps) => {
	const router = useRouter();
	const { addToComparison, clearComparison } = useComparison();

	const [isPending, startTransition] = useTransition();
	const [businessType, setBusinessType] = useState("");
	const [monthlyTurnover, setMonthlyTurnover] = useState(300000);
	const [monthlyPayments, setMonthlyPayments] = useState(20);
	const [region, setRegion] = useState("");
	const [showResults, setShowResults] = useState(false);
	const [showMoreResults, setShowMoreResults] = useState(false);

	const recommendedTariffs = useMemo(() => {
		if (!showResults) return [];

		const result = [...tariffs];

		const scoredTariffs = result.map((tariff) => {
			let score = 0;

			if (monthlyTurnover < 500000 && tariff.price === 0) {
				score += 30;
			} else if (monthlyTurnover < 1000000 && tariff.price < 1000) {
				score += 20;
			} else if (monthlyTurnover >= 1000000 && tariff.price >= 1000) {
				score += 15;
			}

			if (tariff.freeTransfers >= monthlyPayments) {
				score += 25;
			} else if (tariff.freeTransfers >= monthlyPayments * 0.5) {
				score += 15;
			}

			if (tariff.isRecommended) {
				score += 10;
			}

			if (tariff.operationsLimit >= monthlyPayments) {
				score += 10;
			}

			return { tariff, score };
		});

		const sorted = scoredTariffs.toSorted((a, b) => b.score - a.score);

		return sorted.map((item, index) => ({
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
	}, [showResults, monthlyTurnover, monthlyPayments, tariffs]);

	const topResults = recommendedTariffs.slice(0, 3);
	const additionalResults = recommendedTariffs.slice(3, 8);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setShowResults(true);
			setShowMoreResults(false);
		});
	};

	const handleCompareTop3 = () => {
		clearComparison();
		for (const tariff of topResults) addToComparison(tariff);
		router.push("/comparison");
	};

	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<main className="flex-1 bg-background-secondary">
				<div className="container-custom py-8 md:py-12">
					<div className="text-center mb-8">
						<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
							Подбор РКО под ваш бизнес
						</h1>
						<p className="text-foreground-secondary max-w-2xl mx-auto">
							Ответьте на несколько вопросов — мы найдём лучшие варианты
							расчётно-кассового обслуживания для вас
						</p>
					</div>

					<Card className="max-w-2xl mx-auto mb-12">
						<CardHeader>
							<CardTitle className="text-xl">
								Параметры вашего бизнеса
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="space-y-2">
									<Label htmlFor="businessType">Тип бизнеса</Label>
									<Select value={businessType} onValueChange={setBusinessType}>
										<SelectTrigger id="businessType">
											<SelectValue placeholder="Выберите тип бизнеса" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="ip">
												ИП (Индивидуальный предприниматель)
											</SelectItem>
											<SelectItem value="ooo">
												ООО (Общество с ограниченной ответственностью)
											</SelectItem>
											<SelectItem value="self_employed">Самозанятый</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<Label>Средний оборот в месяц</Label>
										<span className="text-sm font-medium text-primary">
											{monthlyTurnover.toLocaleString("ru-RU")} ₽
										</span>
									</div>
									<Slider
										value={[monthlyTurnover]}
										onValueChange={([value]) => setMonthlyTurnover(value)}
										min={0}
										max={10000000}
										step={100000}
										className="w-full"
									/>
									<div className="flex justify-between text-xs text-foreground-muted">
										<span>0 ₽</span>
										<span>10 000 000 ₽</span>
									</div>
								</div>

								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<Label>Количество платежей в месяц</Label>
										<span className="text-sm font-medium text-primary">
											{monthlyPayments}
										</span>
									</div>
									<Slider
										value={[monthlyPayments]}
										onValueChange={([value]) => setMonthlyPayments(value)}
										min={1}
										max={200}
										step={1}
										className="w-full"
									/>
									<div className="flex justify-between text-xs text-foreground-muted">
										<span>1</span>
										<span>200</span>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="region">Регион</Label>
									<Select value={region} onValueChange={setRegion}>
										<SelectTrigger id="region">
											<SelectValue placeholder="Выберите регион" />
										</SelectTrigger>
										<SelectContent>
											{regions.map((r) => (
												<SelectItem key={r} value={r}>
													{r}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<Button
									type="submit"
									size="lg"
									className="w-full"
									disabled={isPending}
								>
									{isPending ? (
										<>
											<Loader2 className="h-4 w-4 mr-2 animate-spin" />
											Подбираем лучшие варианты...
										</>
									) : (
										<>
											<Search className="h-4 w-4 mr-2" />
											Подобрать тарифы
										</>
									)}
								</Button>
							</form>
						</CardContent>
					</Card>

					{showResults && (
						<div className="space-y-8">
							<div className="text-center">
								<h2 className="text-2xl font-bold text-foreground mb-2">
									Топ-3 рекомендации для вас
								</h2>
								<p className="text-foreground-secondary">
									Подобрано на основе ваших параметров
								</p>
							</div>

							{topResults.length > 0 ? (
								<>
									<div className="grid md:grid-cols-3 gap-6">
										{topResults.map((tariff: Tariff) => (
											<div key={tariff.id} className="list-item-deferred">
												<TariffCard
													tariff={tariff}
													bankInfo={{
														name: tariff.bankName,
														logo: tariff.bankLogo,
													}}
												/>
											</div>
										))}
									</div>

									{!showMoreResults && additionalResults.length > 0 && (
										<div className="text-center">
											<Button
												variant="outline"
												onClick={() => setShowMoreResults(true)}
												className="bg-transparent"
											>
												Показать ещё варианты
												<ChevronDown className="h-4 w-4 ml-2" />
											</Button>
										</div>
									)}

									{showMoreResults && additionalResults.length > 0 && (
										<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
											{additionalResults.map((tariff: Tariff) => (
												<div key={tariff.id} className="list-item-deferred">
													<TariffCard
														tariff={tariff}
														bankInfo={{
															name: tariff.bankName,
															logo: tariff.bankLogo,
														}}
													/>
												</div>
											))}
										</div>
									)}

									<Card className="bg-primary/5 border-primary/20">
										<CardContent className="py-8 text-center">
											<h3 className="text-xl font-semibold text-foreground mb-3">
												Не определились с выбором?
											</h3>
											<p className="text-foreground-secondary mb-6">
												Сравните условия в удобной таблице и примите взвешенное
												решение
											</p>
											<Button onClick={handleCompareTop3}>
												Сравнить топ-3 варианта
												<ArrowRight className="h-4 w-4 ml-2" />
											</Button>
										</CardContent>
									</Card>
								</>
							) : (
								<Card className="text-center py-12">
									<CardContent>
										<p className="text-lg text-foreground-secondary mb-4">
											К сожалению, для ваших параметров нет точных совпадений
										</p>
										<Button
											onClick={() => {
												setShowResults(false);
												setMonthlyTurnover(300000);
												setMonthlyPayments(20);
											}}
										>
											Изменить параметры
										</Button>
									</CardContent>
								</Card>
							)}
						</div>
					)}
				</div>
			</main>

			<Footer />
			<ComparisonPanel />
		</div>
	);
};
