import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostDetailLoading() {
	return (
		<div className="container-custom py-8 md:py-12">
			<div className="space-y-6">
				<Skeleton width="100%" height="300px" className="mb-6" />
				<div className="space-y-4 max-w-3xl">
					<Skeleton width="80%" height="32px" />
					<Skeleton width="60%" height="20px" />
					<div className="space-y-2 pt-4">
						<Skeleton width="100%" height="16px" />
						<Skeleton width="100%" height="16px" />
						<Skeleton width="90%" height="16px" />
						<Skeleton width="95%" height="16px" />
						<Skeleton width="100%" height="16px" />
					</div>
				</div>
			</div>
		</div>
	);
}
