import { PromotionsPageClient } from "@/components/promotions/promotions-page-client";
import { getBanks } from "@/lib/repositories/banks";
import { getPromotions } from "@/lib/repositories/promotions";

export const revalidate = 86400;

export default async function PromotionsPage() {
	const [promotions, banks] = await Promise.all([getPromotions(), getBanks()]);

	return <PromotionsPageClient promotions={promotions} banks={banks} />;
}
