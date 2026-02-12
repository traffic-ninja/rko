import { notFound } from "next/navigation";
import { BankPageClient } from "@/components/banks/bank-page-client";
import { getBankById, getBanks } from "@/lib/repositories/banks";
import { getTariffsByBankId } from "@/lib/repositories/tariffs";

interface BankPageProps {
	params: Promise<{ bankId: string }>;
}

export const revalidate = 86400;

export async function generateStaticParams() {
	const banks = await getBanks();
	return banks.map((bank) => ({
		bankId: bank.id,
	}));
}

export default async function BankPage({ params }: BankPageProps) {
	const { bankId } = await params;

	const [bank, tariffs] = await Promise.all([
		getBankById(bankId),
		getTariffsByBankId(bankId),
	]);

	if (!bank) {
		notFound();
	}

	return <BankPageClient bank={bank} tariffs={tariffs} />;
}
