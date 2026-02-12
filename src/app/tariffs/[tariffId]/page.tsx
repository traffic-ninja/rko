import { notFound } from "next/navigation";
import { TariffPageClient } from "@/components/tariffs/tariff-page-client";
import { getBankById } from "@/lib/repositories/banks";
import { getTariffById, getTariffs } from "@/lib/repositories/tariffs";

interface TariffPageProps {
	params: Promise<{ tariffId: string }>;
}

export const revalidate = 86400;

export async function generateStaticParams() {
	const tariffs = await getTariffs();
	return tariffs.map((tariff) => ({
		tariffId: tariff.id,
	}));
}

export default async function TariffPage({ params }: TariffPageProps) {
	const { tariffId } = await params;

	const [tariff, allTariffs] = await Promise.all([
		getTariffById(tariffId),
		getTariffs(),
	]);

	if (!tariff) {
		notFound();
	}

	const bank = await getBankById(tariff.bankId);

	if (!bank) {
		notFound();
	}
	const similarTariffs = allTariffs
		.filter(
			(t) =>
				t.id !== tariff.id &&
				(Math.abs(t.price - tariff.price) < 1000 || t.bankId === tariff.bankId)
		)
		.slice(0, 4);

	return (
		<TariffPageClient
			tariff={tariff}
			bank={bank}
			similarTariffs={similarTariffs}
		/>
	);
}
