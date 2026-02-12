import { ComparisonPageClient } from "@/components/comparison/comparison-page-client";
import { getTariffs } from "@/lib/repositories/tariffs";

export const revalidate = 86400;

export default async function ComparisonPage() {
	const tariffs = await getTariffs();

	return <ComparisonPageClient tariffs={tariffs} />;
}
