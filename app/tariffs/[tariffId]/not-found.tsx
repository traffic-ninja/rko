import { FileText } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export default function TariffNotFound() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 flex items-center justify-center bg-background-secondary">
				<div className="text-center px-4">
					<FileText className="h-16 w-16 text-foreground-muted mx-auto mb-6" />
					<h1 className="text-2xl font-bold text-foreground mb-2">
						Тариф не найден
					</h1>
					<p className="text-foreground-secondary mb-8">
						Возможно, тариф был изменён или вы перешли по неверной ссылке
					</p>
					<Button asChild>
						<Link href="/banks">Вернуться к банкам</Link>
					</Button>
				</div>
			</main>
			<Footer />
		</div>
	);
}
