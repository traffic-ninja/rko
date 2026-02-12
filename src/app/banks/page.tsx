import { BanksPageClient } from "@/components/banks/banks-page-client";
import { getBanks } from "@/lib/repositories/banks";

export const revalidate = 86400;

export default async function BanksPage() {
	const banks = await getBanks();

	return <BanksPageClient banks={banks} />;
}
