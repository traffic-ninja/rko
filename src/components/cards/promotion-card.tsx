import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Promotion } from "@/lib/types";

interface PromotionCardProps {
	promotion: Promotion;
}

const typeLabels = {
	cashback: "Кэшбэк",
	free_service: "Бесплатно",
	bonus: "Бонус",
};

export function PromotionCard({ promotion }: PromotionCardProps) {
	const isExpiringSoon = promotion.expiresAt
		? new Date(promotion.expiresAt).getTime() - Date.now() <
			7 * 24 * 60 * 60 * 1000
		: false;

	return (
		<Card className="group hover:shadow-lg transition-all duration-250 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
			<CardContent className="p-6">
				<div className="flex items-start gap-4 mb-4">
					<Image
						src={promotion.bankLogo || "/placeholder.svg"}
						alt={promotion.bankName}
						width={48}
						height={48}
						className="h-12 w-12 rounded-lg object-cover shrink-0"
					/>
					<div className="flex-1">
						<Badge variant="accent" className="mb-2">
							{typeLabels[promotion.type]}
						</Badge>
						<h3 className="text-lg font-semibold text-foreground">
							{promotion.title}
						</h3>
						<p className="text-sm text-foreground-secondary">
							{promotion.bankName}
						</p>
					</div>
				</div>

				<p className="text-sm text-foreground-secondary mb-4">
					{promotion.description}
				</p>

				{promotion.expiresAt && (
					<div
						className={`flex items-center gap-2 text-sm mb-4 ${isExpiringSoon ? "text-destructive" : "text-foreground-muted"}`}
					>
						<Clock className="h-4 w-4" />
						<span>
							До{" "}
							{new Date(promotion.expiresAt).toLocaleDateString("ru-RU", {
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
