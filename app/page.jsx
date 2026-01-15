import { supabase } from '@/lib/supabase';
import HomeClient from './HomeClient';

export default async function Page() {
  // Fetch products from Supabase
  // const { data: products } = await supabase
  //   .from('products')
  //   .select('*')
  //   .order('name', { ascending: true });

  const { data: products } = await supabase.from('products').select()
  console.log('products', products);


  // Pass the database data into your interactive Client Component
  return <HomeClient products={products || []} />;
}