import { FileText } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export default function BlogPostNotFound() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 flex items-center justify-center bg-background-secondary">
				<div className="text-center px-4">
					<FileText className="h-16 w-16 text-foreground-muted mx-auto mb-6" />
					<h1 className="text-2xl font-bold text-foreground mb-2">
						Статья не найдена
					</h1>
					<p className="text-foreground-secondary mb-8">
						Возможно, статья была удалена или вы перешли по неверной ссылке
					</p>
					<Button asChild>
						<Link href="/blog">Вернуться в блог</Link>
					</Button>
				</div>
			</main>
			<Footer />
		</div>
	);
}
