"use client";

import { BarChart3, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useComparison } from "@/components/comparison-context";
import { Button } from "@/components/ui/button";

export function ComparisonPanel() {
	const { comparedTariffs, removeFromComparison, clearComparison } =
		useComparison();

	if (comparedTariffs.length === 0) return null;

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-xl">
			<div className="container-custom py-4">
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-4 flex-1 min-w-0">
						<span className="text-sm font-medium text-foreground-secondary whitespace-nowrap">
							Выбрано: {comparedTariffs.length} из 3
						</span>
						<div className="flex items-center gap-2 overflow-x-auto">
							{comparedTariffs.map((tariff) => (
								<div
									key={tariff.id}
									className="flex items-center gap-2 bg-muted rounded-md px-3 py-1.5 shrink-0"
								>
									<Image
										src={tariff.bank_logo || "/placeholder.svg"}
										alt={tariff.bank_name}
										width={20}
										height={20}
										className="h-5 w-5 rounded"
									/>{" "}
									<span className="text-sm font-medium text-foreground truncate max-w-[120px]">
										{tariff.name}
									</span>
									<button
										type="button"
										onClick={() => removeFromComparison(tariff.id)}
										className="text-foreground-muted hover:text-foreground transition-colors"
										aria-label={`Удалить ${tariff.name} из сравнения`}
									>
										{" "}
										<X className="h-4 w-4" />
									</button>
								</div>
							))}
						</div>
					</div>
					<div className="flex items-center gap-2 shrink-0">
						<Button variant="outline" size="sm" onClick={clearComparison}>
							Очистить
						</Button>
						<Button asChild size="sm">
							<Link href="/comparison">
								<BarChart3 className="h-4 w-4 mr-2" />
								Сравнить
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
