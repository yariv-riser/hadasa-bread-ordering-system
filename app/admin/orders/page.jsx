import { supabase } from '@/lib/supabase';
import OrderClient from './OrderClient';

import classes from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className='error'>שגיאה בטעינת הזמנות</div>;
  }

  const formattedOrders = (orders || []).map(order => ({
    ...order,
    itemsTableHtml: order.items_html || order.itemsTableHtml,
    timestamp: order.created_at
  }));

  return (
    <main className={classes['page-content']}>
      <OrderClient initialOrders={formattedOrders} />
    </main>
  )
}