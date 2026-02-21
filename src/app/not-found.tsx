import { SearchX } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 flex items-center justify-center bg-background-secondary">
				<div className="text-center px-4">
					<SearchX className="h-16 w-16 text-foreground-muted mx-auto mb-6" />
					<h1 className="text-4xl font-bold text-foreground mb-2">
						404
					</h1>
					<p className="text-xl text-foreground-secondary mb-2">
						Страница не найдена
					</p>
					<p className="text-foreground-muted mb-8">
						Возможно, страница была удалена или вы перешли по неверной ссылке
					</p>
					<div className="flex gap-4 justify-center">
						<Button asChild>
							<Link href="/">На главную</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/banks">Каталог банков</Link>
						</Button>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
