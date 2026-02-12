import { SelectionPageClient } from "@/components/selection/selection-page-client";
import { getRegions } from "@/lib/repositories/regions";
import { getTariffs } from "@/lib/repositories/tariffs";

export const revalidate = 86400;

export default async function SelectionPage() {
	const [tariffs, regions] = await Promise.all([getTariffs(), getRegions()]);

	return <SelectionPageClient tariffs={tariffs} regions={regions} />;
}
