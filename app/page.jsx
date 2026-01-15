import { supabase } from '@/lib/supabase';
import HomeClient from './HomeClient';

export default async function Page() {
  const { data: products } = await supabase.from('products').select()

  return <HomeClient products={products || []} />;
}