import { Skeleton } from "@/components/ui/skeleton";

export default function TariffDetailLoading() {
	return (
		<div className="container-custom py-8 md:py-12">
			<div className="space-y-6">
				<div className="flex gap-4 items-start">
					<Skeleton width="64px" height="64px" />
					<div className="flex-1 space-y-2">
						<Skeleton width="60%" height="32px" />
						<Skeleton width="40%" height="20px" />
					</div>
				</div>
				<Skeleton width="100%" height="200px" />
				<div className="space-y-4">
					<Skeleton width="100%" height="150px" />
					<Skeleton width="100%" height="150px" />
				</div>
			</div>
		</div>
	);
}
