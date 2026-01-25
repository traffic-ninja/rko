import { ArrowRight, BarChart3, Shield, Target, Users } from "lucide-react";
import Link from "next/link";
import { ComparisonPanel } from "@/components/layout/comparison-panel";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const values = [
	{
		icon: Shield,
		title: "Честность",
		description:
			"Мы не продвигаем отдельные банки. Наши рекомендации основаны только на объективных данных.",
	},
	{
		icon: Target,
		title: "Точность",
		description:
			"Регулярно проверяем и обновляем информацию о тарифах, чтобы вы всегда видели актуальные условия.",
	},
	{
		icon: Users,
		title: "Для людей",
		description:
			"Создаём сервис, которым удобно пользоваться. Сложные банковские условия объясняем простым языком.",
	},
	{
		icon: BarChart3,
		title: "Прозрачность",
		description:
			"Открыто рассказываем, как работает наш сервис и на чём мы зарабатываем.",
	},
];

export default function AboutPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<main className="flex-1">
				{/* Hero */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
					<div className="container-custom text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
							О проекте РКО Сравни
						</h1>
						<p className="text-lg text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
							Помогаем предпринимателям выбрать оптимальное расчётно-кассовое
							обслуживание без изучения десятков сайтов банков
						</p>
					</div>
				</section>

				{/* Mission */}
				<section className="py-16 bg-background">
					<div className="container-custom">
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div>
								<h2 className="text-3xl font-bold text-foreground mb-6">
									Наша цель
								</h2>
								<p className="text-foreground-secondary leading-relaxed mb-4">
									Мы создали РКО Сравни, потому что сами столкнулись с проблемой
									выбора банка для бизнеса. Информация о тарифах разбросана по
									десяткам сайтов, условия написаны мелким шрифтом, а сравнить
									предложения вручную — задача на несколько часов.
								</p>
								<p className="text-foreground-secondary leading-relaxed mb-4">
									Наш сервис собирает все тарифы РКО в одном месте и помогает
									найти оптимальный вариант под конкретные потребности бизнеса.
									Умный подбор учитывает ваш оборот, количество операций и
									другие параметры, чтобы предложить действительно подходящие
									варианты.
								</p>
								<p className="text-foreground-secondary leading-relaxed">
									Мы не берём деньги с пользователей — сервис полностью
									бесплатный. Наш доход — комиссия от банков-партнёров за
									привлечение клиентов.
								</p>
							</div>
							<div className="bg-primary/5 rounded-2xl p-8">
								<div className="grid grid-cols-2 gap-8 text-center">
									<div>
										<p className="text-4xl font-bold text-primary mb-2">8+</p>
										<p className="text-sm text-foreground-secondary">
											банков в каталоге
										</p>
									</div>
									<div>
										<p className="text-4xl font-bold text-primary mb-2">20+</p>
										<p className="text-sm text-foreground-secondary">
											тарифов РКО
										</p>
									</div>
									<div>
										<p className="text-4xl font-bold text-primary mb-2">100%</p>
										<p className="text-sm text-foreground-secondary">
											бесплатно
										</p>
									</div>
									<div>
										<p className="text-4xl font-bold text-primary mb-2">24/7</p>
										<p className="text-sm text-foreground-secondary">
											доступность
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* How We Work */}
				<section className="py-16 bg-background-secondary">
					<div className="container-custom">
						<h2 className="text-3xl font-bold text-foreground text-center mb-12">
							Как мы работаем
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							<Card>
								<CardContent className="pt-6">
									<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<span className="text-xl font-bold text-primary">1</span>
									</div>
									<h3 className="text-lg font-semibold text-foreground mb-2">
										Собираем данные
									</h3>
									<p className="text-foreground-secondary text-sm">
										Регулярно мониторим официальные сайты банков и обновляем
										информацию о тарифах, комиссиях и условиях обслуживания.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<span className="text-xl font-bold text-primary">2</span>
									</div>
									<h3 className="text-lg font-semibold text-foreground mb-2">
										Структурируем
									</h3>
									<p className="text-foreground-secondary text-sm">
										Приводим данные к единому формату, чтобы вы могли легко
										сравнивать тарифы разных банков по одинаковым параметрам.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<span className="text-xl font-bold text-primary">3</span>
									</div>
									<h3 className="text-lg font-semibold text-foreground mb-2">
										Рекомендуем
									</h3>
									<p className="text-foreground-secondary text-sm">
										Алгоритм умного подбора анализирует ваши параметры и
										предлагает тарифы, которые лучше всего подходят именно вам.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Values */}
				<section className="py-16 bg-background">
					<div className="container-custom">
						<h2 className="text-3xl font-bold text-foreground text-center mb-12">
							Наши принципы
						</h2>
						<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{values.map((value) => (
								<Card key={value.title} className="text-center">
									<CardContent className="pt-6">
										<div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
											<value.icon className="h-6 w-6" />
										</div>
										<h3 className="text-lg font-semibold text-foreground mb-2">
											{value.title}
										</h3>
										<p className="text-sm text-foreground-secondary">
											{value.description}
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* For Whom */}
				<section className="py-16 bg-background-secondary">
					<div className="container-custom">
						<h2 className="text-3xl font-bold text-foreground text-center mb-12">
							Для кого мы
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							<Card>
								<CardContent className="pt-6">
									<h3 className="text-lg font-semibold text-foreground mb-3">
										Начинающие предприниматели
									</h3>
									<p className="text-foreground-secondary text-sm mb-4">
										Только открываете бизнес и не знаете, какой банк выбрать?
										Поможем разобраться в условиях и найти оптимальный тариф для
										старта.
									</p>
									<Button
										asChild
										variant="outline"
										size="sm"
										className="bg-transparent"
									>
										<Link href="/selection">
											Подобрать РКО
											<ArrowRight className="h-4 w-4 ml-2" />
										</Link>
									</Button>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<h3 className="text-lg font-semibold text-foreground mb-3">
										Действующий бизнес
									</h3>
									<p className="text-foreground-secondary text-sm mb-4">
										Хотите оптимизировать расходы на банковское обслуживание?
										Сравните текущие условия с предложениями других банков.
									</p>
									<Button
										asChild
										variant="outline"
										size="sm"
										className="bg-transparent"
									>
										<Link href="/comparison">
											Сравнить тарифы
											<ArrowRight className="h-4 w-4 ml-2" />
										</Link>
									</Button>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<h3 className="text-lg font-semibold text-foreground mb-3">
										Самозанятые
									</h3>
									<p className="text-foreground-secondary text-sm mb-4">
										Работаете на себя и ищете простой и недорогой способ
										принимать платежи? У нас есть специальные предложения для
										самозанятых.
									</p>
									<Button
										asChild
										variant="outline"
										size="sm"
										className="bg-transparent"
									>
										<Link href="/banks">
											Смотреть банки
											<ArrowRight className="h-4 w-4 ml-2" />
										</Link>
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* CTA */}
				<section className="py-16 bg-primary text-primary-foreground">
					<div className="container-custom text-center">
						<h2 className="text-3xl font-bold mb-4">
							Готовы найти идеальный тариф?
						</h2>
						<p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
							Воспользуйтесь умным подбором и получите персональные рекомендации
							за пару минут
						</p>
						<Button asChild variant="secondary" size="lg">
							<Link href="/selection">
								Подобрать РКО бесплатно
								<ArrowRight className="h-5 w-5 ml-2" />
							</Link>
						</Button>
					</div>
				</section>
			</main>

			<Footer />
			<ComparisonPanel />
		</div>
	);
}
