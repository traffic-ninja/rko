"use client";

import { FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { BlogCard } from "@/components/cards/blog-card";
import { ComparisonPanel } from "@/components/layout/comparison-panel";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/supabase/types";

interface BlogClientPageProps {
	initialBlogPosts: BlogPost[];
}

const categories = [
	{ value: "all", label: "Все" },
	{ value: "news", label: "Новости" },
	{ value: "guides", label: "Гайды" },
	{ value: "reviews", label: "Обзоры" },
	{ value: "comparisons", label: "Сравнения" },
];

export function BlogClientPage({ initialBlogPosts }: BlogClientPageProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 9;

	const filteredPosts = useMemo(() => {
		if (selectedCategory === "all") return initialBlogPosts;
		return initialBlogPosts.filter(
			(post) => post.category === selectedCategory
		);
	}, [selectedCategory, initialBlogPosts]);

	const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
	const currentPosts = filteredPosts.slice(
		(currentPage - 1) * postsPerPage,
		currentPage * postsPerPage
	);

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		setCurrentPage(1);
	};

	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<main className="flex-1 bg-background-secondary">
				<div className="container-custom py-8 md:py-12">
					{/* Page Header */}
					<div className="mb-8">
						<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
							Блог о РКО
						</h1>
						<p className="text-foreground-secondary">
							Полезные материалы о расчётно-кассовом обслуживании для бизнеса
						</p>
					</div>

					{/* Categories */}
					<div className="flex flex-wrap gap-2 mb-8">
						{categories.map((cat) => (
							<Button
								key={cat.value}
								variant={selectedCategory === cat.value ? "default" : "outline"}
								size="sm"
								onClick={() => handleCategoryChange(cat.value)}
								className={
									selectedCategory !== cat.value ? "bg-transparent" : ""
								}
							>
								{cat.label}
							</Button>
						))}
					</div>

					{/* Posts Grid */}
					{currentPosts.length > 0 ? (
						<>
							<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
								{currentPosts.map((post: BlogPost) => (
									<BlogCard key={post.id} post={post} />
								))}
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="flex items-center justify-center gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
										disabled={currentPage === 1}
										className="bg-transparent"
									>
										Назад
									</Button>
									{Array.from({ length: totalPages }, (_, i) => i + 1).map(
										(page) => (
											<Button
												key={page}
												variant={currentPage === page ? "default" : "outline"}
												size="sm"
												onClick={() => setCurrentPage(page)}
												className={currentPage !== page ? "bg-transparent" : ""}
											>
												{page}
											</Button>
										)
									)}
									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											setCurrentPage((p) => Math.min(totalPages, p + 1))
										}
										disabled={currentPage === totalPages}
										className="bg-transparent"
									>
										Вперёд
									</Button>
								</div>
							)}
						</>
					) : (
						<div className="text-center py-16">
							<FileText className="h-12 w-12 text-foreground-muted mx-auto mb-4" />
							<p className="text-lg text-foreground-secondary">
								Статей пока нет
							</p>
							<p className="text-sm text-foreground-muted">Скоро появятся</p>
						</div>
					)}
				</div>
			</main>

			<Footer />
			<ComparisonPanel />
		</div>
	);
}
