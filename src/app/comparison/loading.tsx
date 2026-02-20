import { Skeleton } from "@/components/ui/skeleton";

export default function ComparisonLoading() {
	return (
		<div className="container-custom py-8 md:py-12">
			<div className="space-y-6">
				<Skeleton width="200px" height="32px" className="mb-2" />
				<Skeleton width="400px" height="16px" className="mb-8" />
				<Skeleton width="100%" height="400px" />
			</div>
		</div>
	);
}
