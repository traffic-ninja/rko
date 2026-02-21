import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<main className="flex-1">
				{/* Hero Section Skeleton */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
					<div className="container-custom">
						<div className="grid lg:grid-cols-2 gap-12 items-center">
							<div>
								<Skeleton className="h-12 w-3/4 mb-4" />
								<Skeleton className="h-12 w-full mb-4" />
								<Skeleton className="h-12 w-2/3 mb-6" />
								<Skeleton className="h-4 w-full mb-2" />
								<Skeleton className="h-4 w-full mb-2" />
								<Skeleton className="h-4 w-2/3 mb-8" />
								<div className="flex gap-4">
									<Skeleton className="h-10 w-32" />
									<Skeleton className="h-10 w-28" />
								</div>
							</div>
							<div>
								<Skeleton className="h-96 w-full rounded-lg" />
							</div>
						</div>
					</div>
				</section>

				{/* Advantages Section Skeleton */}
				<section className="py-16 bg-background">
					<div className="container-custom">
						<Skeleton className="h-9 w-48 mx-auto mb-12" />
						<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{Array.from({ length: 4 }).map((_, i) => (
								<div key={i} className="text-center">
									<Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
									<Skeleton className="h-5 w-32 mx-auto mb-2" />
									<Skeleton className="h-4 w-24 mx-auto" />
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Top Banks Section Skeleton */}
				<section className="py-16 bg-background-secondary">
					<div className="container-custom">
						<div className="flex items-center justify-between mb-8">
							<Skeleton className="h-9 w-48" />
							<Skeleton className="h-9 w-24" />
						</div>
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className="rounded-lg border p-4">
									<div className="flex items-center gap-4 mb-4">
										<Skeleton className="h-12 w-12 rounded-lg" />
										<div>
											<Skeleton className="h-5 w-32 mb-1" />
											<Skeleton className="h-4 w-24" />
										</div>
									</div>
									<Skeleton className="h-4 w-full mb-2" />
									<Skeleton className="h-4 w-2/3" />
								</div>
							))}
						</div>
					</div>
				</section>

				{/* How It Works Section Skeleton */}
				<section className="py-16 bg-background">
					<div className="container-custom">
						<Skeleton className="h-9 w-48 mx-auto mb-12" />
						<div className="grid md:grid-cols-3 gap-8">
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="text-center">
									<Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
									<Skeleton className="h-6 w-40 mx-auto mb-2" />
									<Skeleton className="h-4 w-32 mx-auto" />
								</div>
							))}
						</div>
						<div className="text-center mt-12">
							<Skeleton className="h-10 w-40 mx-auto" />
						</div>
					</div>
				</section>

				{/* Promotions Section Skeleton */}
				<section className="py-16 bg-background-secondary">
					<div className="container-custom">
						<div className="flex items-center justify-between mb-8">
							<Skeleton className="h-9 w-40" />
							<Skeleton className="h-9 w-24" />
						</div>
						<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{Array.from({ length: 4 }).map((_, i) => (
								<div key={i} className="rounded-lg border p-4">
									<Skeleton className="h-4 w-24 mb-2" />
									<Skeleton className="h-5 w-full mb-2" />
									<Skeleton className="h-4 w-3/4" />
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Blog Section Skeleton */}
				<section className="py-16 bg-background">
					<div className="container-custom">
						<div className="flex items-center justify-between mb-8">
							<Skeleton className="h-9 w-40" />
							<Skeleton className="h-9 w-24" />
						</div>
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="rounded-lg border overflow-hidden">
									<Skeleton className="h-40 w-full" />
									<div className="p-4">
										<Skeleton className="h-5 w-full mb-2" />
										<Skeleton className="h-4 w-2/3" />
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
