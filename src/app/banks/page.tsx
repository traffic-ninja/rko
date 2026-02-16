import { createClient } from '@/lib/supabase/server';
import { Bank } from '@/lib/supabase/types';
import BanksPageClient from './banks-page-client';

export const dynamic = 'force-dynamic'; // Ensures this page is always rendered dynamically on the server

export default async function BanksPage() {
  const supabase = await createClient();
  const { data: banks, error } = await supabase.from('banks').select('*');

  if (error) {
    console.error('Error fetching banks:', error);
    // You might want to render an error state or throw an error to trigger an error.tsx boundary
    return <div>Ошибка загрузки данных о банках. Пожалуйста, попробуйте позже.</div>;
  }

  return <BanksPageClient initialBanks={banks as Bank[]} />;
}