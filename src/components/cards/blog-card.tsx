import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Tables } from "@/lib/supabase/types";

interface BlogCardProps {
	post: Tables<"blog_posts">;
}

const categoryLabels = {
	news: "Новости",
	guides: "Гайды",
	reviews: "Обзоры",
	comparisons: "Сравнения",
};

export function BlogCard({ post }: BlogCardProps) {
	return (
		<Card className="group hover:shadow-lg transition-all duration-250 overflow-hidden">
			<Link href={`/blog/${post.slug}`}>
				<div className="aspect-video overflow-hidden">
					<Image
						src={post.image || "/placeholder.svg"}
						alt={post.title}
						width={500}
						height={300}
						sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 500px"
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					/>{" "}
				</div>
				<CardContent className="p-5">
					<Badge variant="secondary" className="mb-3">
						{categoryLabels[post.category as keyof typeof categoryLabels] ||
							post.category}
					</Badge>
					<h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
						{post.title}
					</h3>
					<p className="text-sm text-foreground-secondary line-clamp-2 mb-4">
						{post.excerpt}
					</p>
					<div className="flex items-center gap-4 text-xs text-foreground-muted">
						<span className="flex items-center gap-1">
							<Calendar className="h-3 w-3" />
							{new Date(post.published_at).toLocaleDateString("ru-RU", {
								day: "numeric",
								month: "short",
							})}
						</span>
						<span className="flex items-center gap-1">
							<Clock className="h-3 w-3" />
							{post.read_time} мин
						</span>
					</div>
				</CardContent>
			</Link>
		</Card>
	);
}
