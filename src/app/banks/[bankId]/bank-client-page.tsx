"use client";

import {
	ChevronRight,
	ExternalLink,
	FileText,
	Globe,
	MessageSquare,
	Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TariffCard } from "@/components/cards/tariff-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Bank, Tariff } from "@/lib/supabase/types";

interface BankClientPageProps {
	initialBank: Bank;
	initialBankTariffs: Tariff[];
}

export function BankClientPage({
	initialBank,
	initialBankTariffs,
}: BankClientPageProps) {
	const [activeTab, setActiveTab] = useState("tariffs");

	const bank = initialBank;
	const bankTariffs = initialBankTariffs;

	return (
		<>
			<main className="flex-1 bg-background-secondary">
				<div className="container-custom py-8 md:py-12">
					{/* Breadcrumbs */}
					<nav className="flex items-center gap-2 text-sm text-foreground-secondary mb-6">
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
						<span className="text-foreground">{bank.name}</span>
					</nav>

					{/* Bank Header */}
					<div className="bg-background rounded-xl border border-border p-6 md:p-8 mb-8">
						<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
							<div className="flex items-start gap-4 md:gap-6">
								<Image
									src={bank.logo || "/placeholder.svg"}
									alt={bank.name}
									width={80}
									height={80}
									sizes="(max-width: 768px) 64px, 80px"
									className="h-16 w-16 md:h-20 md:w-20 rounded-xl object-cover shrink-0"
								/>{" "}
								<div>
									<div className="flex items-center gap-3 mb-2">
										<h1 className="text-2xl md:text-3xl font-bold text-foreground">
											{bank.name}
										</h1>
										{bank.rating && (
											<div className="flex items-center gap-1 bg-accent/10 text-accent px-2 py-1 rounded-md">
												<Star className="h-4 w-4 fill-accent" />
												<span className="text-sm font-medium">
													{bank.rating}
												</span>
											</div>
										)}
									</div>
									<p className="text-foreground-secondary max-w-xl">
										{bank.description}
									</p>
								</div>
							</div>
							<Button
								size="lg"
								className="shrink-0"
								onClick={(e) => e.preventDefault()} // Placeholder, replace with actual link logic if needed
							>
								<ExternalLink className="h-4 w-4 mr-2" />
								Открыть РКО на сайте банка
							</Button>{" "}
						</div>
					</div>

					{/* Tabs */}
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<TabsList className="mb-6">
							<TabsTrigger value="tariffs" className="gap-2">
								<FileText className="h-4 w-4" />
								Тарифы ({bankTariffs.length})
							</TabsTrigger>
							<TabsTrigger value="conditions" className="gap-2">
								<Globe className="h-4 w-4" />
								Условия
							</TabsTrigger>
							<TabsTrigger value="reviews" className="gap-2">
								<MessageSquare className="h-4 w-4" />
								Отзывы
							</TabsTrigger>
						</TabsList>

						{/* Tariffs Tab */}
						<TabsContent value="tariffs">
							{bankTariffs.length > 0 ? (
								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
									{bankTariffs.map((tariff) => (
										<TariffCard key={tariff.id} tariff={tariff} />
									))}
								</div>
							) : (
								<div className="text-center py-16">
									<p className="text-lg text-foreground-secondary">
										Тарифы для этого банка пока не добавлены
									</p>
								</div>
							)}
						</TabsContent>

						{/* Conditions Tab */}
						<TabsContent value="conditions">
							<div className="grid md:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="text-lg">
											Требования к открытию
										</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="space-y-3">
											<li className="flex items-start gap-2 text-sm">
												<span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
												<span className="text-foreground-secondary">
													Паспорт гражданина РФ
												</span>
											</li>
											<li className="flex items-start gap-2 text-sm">
												<span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
												<span className="text-foreground-secondary">ИНН</span>
											</li>
											<li className="flex items-start gap-2 text-sm">
												<span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
												<span className="text-foreground-secondary">
													ОГРН / ОГРНИП
												</span>
											</li>
											{bank.id !== "tinkoff" && bank.id !== "modul" && (
												<li className="flex items-start gap-2 text-sm">
													<span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
													<span className="text-foreground-secondary">
														Устав организации (для ООО)
													</span>
												</li>
											)}
										</ul>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="text-lg">Особенности</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="space-y-3">
											<li className="flex items-start gap-2 text-sm">
												<span className="h-1.5 w-1.5 rounded-full bg-success mt-1.5 shrink-0" />
												<span className="text-foreground-secondary">
													{bank.has_online_opening
														? "Онлайн-открытие за 10-30 минут"
														: "Открытие в отделении банка"}
												</span>
											</li>
											<li className="flex items-start gap-2 text-sm">
												<span className="h-1.5 w-1.5 rounded-full bg-success mt-1.5 shrink-0" />
												<span className="text-foreground-secondary">
													{bank.has_free_tariff
														? "Есть бесплатный тариф"
														: `Тарифы от ${bank.min_price.toLocaleString("ru-RU")} ₽/мес`}
												</span>
											</li>
											<li className="flex items-start gap-2 text-sm">
												<span className="h-1.5 w-1.5 rounded-full bg-success mt-1.5 shrink-0" />
												<span className="text-foreground-secondary">
													Мобильное приложение
												</span>
											</li>
											<li className="flex items-start gap-2 text-sm">
												<span className="h-1.5 w-1.5 rounded-full bg-success mt-1.5 shrink-0" />
												<span className="text-foreground-secondary">
													Круглосуточная поддержка
												</span>
											</li>
										</ul>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="text-lg">Сроки</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="space-y-3">
											<li className="flex items-start gap-2 text-sm">
												<span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
												<span className="text-foreground-secondary">
													Рассмотрение заявки: 1-3 рабочих дня
												</span>
											</li>
											<li className="flex items-start gap-2 text-sm">
												<span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
												<span className="text-foreground-secondary">
													Открытие счёта: в день одобрения
												</span>
											</li>
											<li className="flex items-start gap-2 text-sm">
												<span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
												<span className="text-foreground-secondary">
													Выпуск карты: 3-7 рабочих дней
												</span>
											</li>
										</ul>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="text-lg">
											Регионы присутствия
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="flex flex-wrap gap-2">
											{bank.regions.map((region) => (
												<span
													key={region}
													className="bg-muted text-foreground-secondary text-sm px-3 py-1 rounded-md"
												>
													{region}
												</span>
											))}
										</div>
									</CardContent>
								</Card>
							</div>
						</TabsContent>

						{/* Reviews Tab */}
						<TabsContent value="reviews">
							<div className="text-center py-16">
								<MessageSquare className="h-12 w-12 text-foreground-muted mx-auto mb-4" />
								<p className="text-lg text-foreground-secondary mb-2">
									Отзывы пока не добавлены
								</p>
								<p className="text-sm text-foreground-muted">
									Функция отзывов находится в разработке
								</p>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</main>
		</>
	);
}
