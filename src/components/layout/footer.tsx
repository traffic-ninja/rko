import { Building2, Mail } from "lucide-react";
import Link from "next/link";

const footerLinks = {
	service: [
		{ name: "Каталог банков", href: "/banks" },
		{ name: "Умный подбор", href: "/selection" },
		{ name: "Сравнение тарифов", href: "/comparison" },
		{ name: "Спецпредложения", href: "/promotions" },
	],
	info: [
		{ name: "Блог", href: "/blog" },
		{ name: "О проекте", href: "/about" },
		{ name: "Контакты", href: "/contacts" },
	],
};

export function Footer() {
	return (
		<footer className="border-t border-border bg-background-secondary">
			<div className="container-custom py-12">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					{/* Brand */}
					<div className="md:col-span-1">
						<Link href="/" className="flex items-center gap-2">
							<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
								<Building2 className="h-5 w-5 text-primary-foreground" />
							</div>
							<span className="text-xl font-bold text-foreground">
								РКО Сравни
							</span>
						</Link>
						<p className="mt-4 text-sm text-foreground-secondary leading-relaxed">
							Сравнение тарифов РКО всех банков России. Помогаем выбрать лучшие
							условия для вашего бизнеса.
						</p>
					</div>

					{/* Service Links */}
					<div>
						<h3 className="text-sm font-semibold text-foreground mb-4">
							Сервис
						</h3>
						<ul className="space-y-3">
							{footerLinks.service.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-sm text-foreground-secondary hover:text-primary transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Info Links */}
					<div>
						<h3 className="text-sm font-semibold text-foreground mb-4">
							Информация
						</h3>
						<ul className="space-y-3">
							{footerLinks.info.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-sm text-foreground-secondary hover:text-primary transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contacts */}
					<div>
						<h3 className="text-sm font-semibold text-foreground mb-4">
							Контакты
						</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="mailto:info@rko-sravni.ru"
									className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-primary transition-colors"
								>
									<Mail className="h-4 w-4" />
									info@rko-sravni.ru
								</a>
							</li>
							<li>
								<a
									href="mailto:partners@rko-sravni.ru"
									className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-primary transition-colors"
								>
									<Mail className="h-4 w-4" />
									partners@rko-sravni.ru
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-border">
					<p className="text-center text-sm text-foreground-muted">
						© {new Date().getFullYear()} РКО Сравни. Все права защищены.
					</p>
				</div>
			</div>
		</footer>
	);
}
