import { Skeleton } from "@/components/ui/skeleton";

export default function PromotionsLoading() {
	return (
		<div className="container-custom py-8 md:py-12">
			<div className="space-y-6">
				<Skeleton width="200px" height="32px" className="mb-2" />
				<Skeleton width="400px" height="16px" className="mb-8" />
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{Array.from({ length: 8 }).map((_, i) => (
						<Skeleton key={i} width="100%" height="220px" />
					))}
				</div>
			</div>
		</div>
	);
}
