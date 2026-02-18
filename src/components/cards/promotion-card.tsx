import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Tables } from "@/lib/supabase/types";

interface PromotionCardProps {
	promotion: Tables<"promotions">;
}

const typeLabels: Record<string, string> = {
	cashback: "Кэшбэк",
	free_service: "Бесплатно",
	bonus: "Бонус",
};

export function PromotionCard({ promotion }: PromotionCardProps) {
	const isExpiringSoon = promotion.expires_at
		? new Date(promotion.expires_at).getTime() - Date.now() <
			7 * 24 * 60 * 60 * 1000
		: false;

	return (
		<Card className="group hover:shadow-lg transition-all duration-250 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
			<CardContent className="p-6">
				<div className="flex items-start gap-4 mb-4">
					<Image
						src={promotion.bank_logo || "/placeholder.svg"}
						alt={promotion.bank_name}
						width={64}
						height={64}
						sizes="(max-width: 640px) 48px, 64px"
						className="h-12 w-12 rounded-lg object-cover shrink-0"
					/>{" "}
					<div className="flex-1">
						<Badge variant="accent" className="mb-2">
							{typeLabels[promotion.type]}
						</Badge>
						<h3 className="text-lg font-semibold text-foreground">
							{promotion.title}
						</h3>
						<p className="text-sm text-foreground-secondary">
							{promotion.bank_name}
						</p>
					</div>
				</div>

				<p className="text-sm text-foreground-secondary mb-4">
					{promotion.description}
				</p>

				{promotion.expires_at && (
					<div
						className={`flex items-center gap-2 text-sm mb-4 ${isExpiringSoon ? "text-destructive" : "text-foreground-muted"}`}
					>
						<Clock className="h-4 w-4" />
						<span>
							До{" "}
							{new Date(promotion.expires_at).toLocaleDateString("ru-RU", {
								day: "numeric",
								month: "long",
							})}
						</span>
					</div>
				)}

				<Button
					asChild
					variant="outline"
					className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors bg-transparent"
				>
					<Link href={promotion.link}>
						Узнать больше
						<ArrowRight className="h-4 w-4 ml-2" />
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
