"use client";

import {
	ArrowRight,
	Check,
	ChevronRight,
	ExternalLink,
	Minus,
	Plus,
	Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { TariffCard } from "@/components/cards/tariff-card";
import { useComparison } from "@/components/comparison-context";
import { ComparisonPanel } from "@/components/layout/comparison-panel";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Bank, Tariff } from "@/lib/supabase/types";

interface TariffClientPageProps {
	tariff: Tariff;
	bank: Bank;
	similarTariffs: Tariff[];
}

export function TariffClientPage({
	tariff,
	bank,
	similarTariffs,
}: TariffClientPageProps) {
	const { addToComparison, removeFromComparison, isInComparison } =
		useComparison();

	const inComparison = isInComparison(tariff.id);

	const handleCompareClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (inComparison) {
			removeFromComparison(tariff.id);
		} else {
			addToComparison(tariff);
		}
	};

	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<main className="flex-1 bg-background-secondary">
				<div className="container-custom py-8 md:py-12">
					{/* Breadcrumbs */}
					<nav className="flex items-center gap-2 text-sm text-foreground-secondary mb-6 flex-wrap">
						<Link href="/" className="hover:text-primary transition-colors">
							Главная
						</Link>
						<ChevronRight className="h-4 w-4" />
						<Link
							href="/banks"
							className="hover:text-primary transition-colors"
						>
							Банки
						</Link>
						<ChevronRight className="h-4 w-4" />
						<Link
							href={`/banks/${bank.id}`}
							className="hover:text-primary transition-colors"
						>
							{bank.name}
						</Link>
						<ChevronRight className="h-4 w-4" />
						<span className="text-foreground">{tariff.name}</span>
					</nav>

					{/* Tariff Header */}
					<div className="bg-background rounded-xl border border-border p-6 md:p-8 mb-8">
						<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
							<div className="flex items-start gap-4 md:gap-6">
								<Image
									src={bank.logo || "/placeholder.svg"}
									alt={bank.name}
									width={64}
									height={64}
									sizes="(max-width: 768px) 48px, 64px"
									className="h-14 w-14 md:h-16 md:w-16 rounded-xl object-cover shrink-0"
								/>
								<div>
									<div className="flex items-center gap-3 mb-2 flex-wrap">
										<h1 className="text-2xl md:text-3xl font-bold text-foreground">
											{tariff.name}
										</h1>
										{tariff.is_recommended && (
											<Badge variant="accent">Рекомендуем</Badge>
										)}
									</div>
									<Link
										href={`/banks/${bank.id}`}
										className="text-foreground-secondary hover:text-primary transition-colors"
									>
										{bank.name}
									</Link>
									<div className="mt-4">
										<p className="text-sm text-foreground-muted">
											Стоимость обслуживания
										</p>
										<p className="text-3xl md:text-4xl font-bold text-foreground">
											{tariff.price_label}
										</p>
									</div>
								</div>
							</div>
							<div className="flex flex-col sm:flex-row gap-3 lg:flex-col xl:flex-row">
								<Button size="lg" onClick={(e) => e.preventDefault()}>
									<ExternalLink className="h-4 w-4 mr-2" />
									Открыть РКО
								</Button>
								<Button
									size="lg"
									variant={inComparison ? "secondary" : "outline"}
									onClick={handleCompareClick}
								>
									{inComparison ? (
										<>
											<Minus className="h-4 w-4 mr-2" />
											Убрать из сравнения
										</>
									) : (
										<>
											<Plus className="h-4 w-4 mr-2" />
											Добавить к сравнению
										</>
									)}
								</Button>
							</div>
						</div>
					</div>

					<div className="grid lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-6">
							{/* Key Conditions */}
							<Card>
								<CardHeader>
									<CardTitle>Ключевые условия</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="overflow-x-auto">
										<table className="w-full">
											<tbody className="divide-y divide-border">
												<tr>
													<td className="py-3 text-foreground-secondary">
														Стоимость обслуживания
													</td>
													<td className="py-3 font-medium text-foreground text-right">
														{tariff.price_label}
													</td>
												</tr>
												<tr>
													<td className="py-3 text-foreground-secondary">
														Лимит операций
													</td>
													<td className="py-3 font-medium text-foreground text-right">
														{tariff.operations_limit} платежей/мес
													</td>
												</tr>
												<tr>
													<td className="py-3 text-foreground-secondary">
														Бесплатных переводов
													</td>
													<td className="py-3 font-medium text-foreground text-right">
														{tariff.free_transfers}
													</td>
												</tr>
												<tr>
													<td className="py-3 text-foreground-secondary">
														Комиссия за перевод
													</td>
													<td className="py-3 font-medium text-foreground text-right">
														{tariff.transfer_commission}
													</td>
												</tr>
												<tr>
													<td className="py-3 text-foreground-secondary">
														Снятие наличных
													</td>
													<td className="py-3 font-medium text-foreground text-right">
														{tariff.cash_withdrawal_commission}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</CardContent>
							</Card>

							{/* Target Audience */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Users className="h-5 w-5" />
										Для кого подходит
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-foreground-secondary leading-relaxed">
										{tariff.target_audience}
									</p>
									<p className="text-foreground-secondary leading-relaxed mt-3">
										{tariff.description}
									</p>
								</CardContent>
							</Card>

							{/* What's Included */}
							<Card>
								<CardHeader>
									<CardTitle>Что входит в тариф</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-3">
										{tariff.features.map((feature: string, index: number) => (
											<li key={index} className="flex items-start gap-3">
												<div className="h-5 w-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
													<Check className="h-3 w-3 text-success" />
												</div>
												<span className="text-foreground-secondary">
													{feature}
												</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>

							{/* Requirements */}
							<Card>
								<CardHeader>
									<CardTitle>Требования для открытия</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-3">
										{tariff.requirements.map((req: string, index: number) => (
											<li key={index} className="flex items-start gap-3">
												<span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
												<span className="text-foreground-secondary">{req}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* CTA Card */}
							<Card className="bg-primary text-primary-foreground">
								<CardContent className="pt-6">
									<h3 className="text-xl font-semibold mb-3">
										Готовы открыть счёт?
									</h3>
									<p className="text-primary-foreground/80 mb-6">
										Перейдите на сайт банка и оформите РКО онлайн за несколько
										минут
									</p>
									<Button
										variant="secondary"
										size="lg"
										className="w-full"
										onClick={(e) => e.preventDefault()}
									>
										Открыть РКО
										<ArrowRight className="h-4 w-4 ml-2" />
									</Button>
								</CardContent>
							</Card>

							{/* Smart Selection CTA */}
							<Card>
								<CardContent className="pt-6">
									<h3 className="font-semibold mb-2">Не уверены в выборе?</h3>
									<p className="text-sm text-foreground-secondary mb-4">
										Воспользуйтесь умным подбором, чтобы найти оптимальный тариф
										под ваш бизнес
									</p>
									<Button
										asChild
										variant="outline"
										className="w-full bg-transparent"
									>
										<Link href="/selection">Подобрать тариф</Link>
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Similar Tariffs */}
					{similarTariffs.length > 0 && (
						<section className="mt-12">
							<h2 className="text-2xl font-bold text-foreground mb-6">
								Похожие тарифы
							</h2>
							<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
								{similarTariffs.map((t) => (
									<TariffCard key={t.id} tariff={t} showBankInfo />
								))}
							</div>
						</section>
					)}
				</div>
			</main>

			<Footer />
			<ComparisonPanel />
		</div>
	);
}
