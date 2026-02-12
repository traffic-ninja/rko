import {
	ArrowRight,
	Calendar,
	ChevronRight,
	Clock,
	Share2,
	User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/cards/blog-card";
import { ComparisonPanel } from "@/components/layout/comparison-panel";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/repositories/blog";

interface BlogPostPageProps {
	params: Promise<{ slug: string }>;
}

const categoryLabels = {
	news: "Новости",
	guides: "Гайды",
	reviews: "Обзоры",
	comparisons: "Сравнения",
};

export const revalidate = 86400;

export async function generateStaticParams() {
	const posts = await getBlogPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;

	const [post, allPosts] = await Promise.all([
		getBlogPostBySlug(slug),
		getBlogPosts(),
	]);

	if (!post) {
		notFound();
	}
	const relatedPosts = allPosts
		.filter((p) => p.id !== post.id && p.category === post.category)
		.slice(0, 3);

	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<main className="flex-1 bg-background-secondary">
				<article className="container-custom py-8 md:py-12">
					{/* Breadcrumbs */}
					<nav className="flex items-center gap-2 text-sm text-foreground-secondary mb-6 flex-wrap">
						<Link href="/" className="hover:text-primary transition-colors">
							Главная
						</Link>
						<ChevronRight className="h-4 w-4" />
						<Link href="/blog" className="hover:text-primary transition-colors">
							Блог
						</Link>
						<ChevronRight className="h-4 w-4" />
						<span className="text-foreground truncate max-w-[200px]">
							{post.title}
						</span>
					</nav>

					<div className="grid lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2">
							{/* Article Header */}
							<header className="mb-8">
								<Badge variant="secondary" className="mb-4">
									{categoryLabels[post.category]}
								</Badge>
								<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
									{post.title}
								</h1>
								<div className="flex flex-wrap items-center gap-4 text-sm text-foreground-secondary">
									<span className="flex items-center gap-1">
										<Calendar className="h-4 w-4" />
										{new Date(post.publishedAt).toLocaleDateString("ru-RU", {
											day: "numeric",
											month: "long",
											year: "numeric",
										})}
									</span>
									<span className="flex items-center gap-1">
										<Clock className="h-4 w-4" />
										{post.readTime} мин чтения
									</span>
								</div>
							</header>

							{/* Featured Image */}
							<div className="aspect-video rounded-xl overflow-hidden mb-8 relative">
								<Image
									src={post.image || "/placeholder.svg"}
									alt={post.title}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
								/>
							</div>

							{/* Article Content */}
							<div
								className="prose prose-lg max-w-none mb-8
                  [&>p]:text-foreground-secondary [&>p]:leading-relaxed [&>p]:mb-6
                  [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-4
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ul>li]:text-foreground-secondary
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2 [&>ol>li]:text-foreground-secondary
                  [&_strong]:font-semibold [&_strong]:text-foreground"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted CMS content
								dangerouslySetInnerHTML={{ __html: post.content }}
							/>

							{/* CTA Block */}
							<Card className="bg-primary/5 border-primary/20 mb-8">
								<CardContent className="py-6">
									<h3 className="text-xl font-semibold text-foreground mb-3">
										Хотите подобрать РКО под ваш бизнес?
									</h3>
									<p className="text-foreground-secondary mb-4">
										Воспользуйтесь нашим калькулятором и получите персональные
										рекомендации за пару минут
									</p>
									<Button asChild>
										<Link href="/selection">
											Подобрать тариф
											<ArrowRight className="h-4 w-4 ml-2" />
										</Link>
									</Button>
								</CardContent>
							</Card>

							{/* Author */}
							<Card className="mb-8">
								<CardContent className="py-6">
									<div className="flex items-center gap-4">
										<div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
											<User className="h-6 w-6 text-foreground-muted" />
										</div>
										<div>
											<p className="font-medium text-foreground">
												{post.author.name}
											</p>
											<p className="text-sm text-foreground-secondary">
												Автор статьи
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Share */}
							<div className="flex items-center gap-4">
								<span className="text-sm text-foreground-secondary">
									Поделиться:
								</span>
								<Button variant="outline" size="sm" className="bg-transparent">
									<Share2 className="h-4 w-4 mr-2" />
									Telegram
								</Button>
								<Button variant="outline" size="sm" className="bg-transparent">
									<Share2 className="h-4 w-4 mr-2" />
									ВКонтакте
								</Button>
							</div>
						</div>

						{/* Sidebar */}
						<aside className="space-y-6">
							<Card>
								<CardContent className="py-6">
									<h3 className="font-semibold text-foreground mb-4">
										Быстрый подбор РКО
									</h3>
									<p className="text-sm text-foreground-secondary mb-4">
										Введите параметры бизнеса и получите персональные
										рекомендации
									</p>
									<Button asChild className="w-full">
										<Link href="/selection">Подобрать тариф</Link>
									</Button>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="py-6">
									<h3 className="font-semibold text-foreground mb-4">
										Популярные банки
									</h3>
									<ul className="space-y-3">
										<li>
											<Link
												href="/banks/tinkoff"
												className="text-sm text-foreground-secondary hover:text-primary transition-colors"
											>
												Тинькофф Банк
											</Link>
										</li>
										<li>
											<Link
												href="/banks/sber"
												className="text-sm text-foreground-secondary hover:text-primary transition-colors"
											>
												Сбербанк
											</Link>
										</li>
										<li>
											<Link
												href="/banks/alfa"
												className="text-sm text-foreground-secondary hover:text-primary transition-colors"
											>
												Альфа-Банк
											</Link>
										</li>
										<li>
											<Link
												href="/banks/modul"
												className="text-sm text-foreground-secondary hover:text-primary transition-colors"
											>
												Модульбанк
											</Link>
										</li>
									</ul>
								</CardContent>
							</Card>
						</aside>
					</div>

					{/* Related Posts */}
					{relatedPosts.length > 0 && (
						<section className="mt-12">
							<h2 className="text-2xl font-bold text-foreground mb-6">
								Похожие статьи
							</h2>
							<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{relatedPosts.map((p) => (
									<BlogCard key={p.id} post={p} />
								))}
							</div>
						</section>
					)}
				</article>
			</main>

			<Footer />
			<ComparisonPanel />
		</div>
	);
}
