import { supabase } from '@/lib/supabase';
import OrderClient from './OrderClient';

// This is the magic line that ensures the page is never cached
export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    // In production, you might want to show this to the user
    return <div style={{ padding: '2rem' }}>שגיאה בטעינת הזמנות: {error.message}</div>;
  }

  const formattedOrders = (orders || []).map(order => ({
    ...order,
    itemsTableHtml: order.items_html || order.itemsTableHtml,
    timestamp: order.created_at
  }));

  return (
    <div style={{ padding: '2rem' }}>
      <h1>ניהול הזמנות</h1>
      <OrderClient initialOrders={formattedOrders} />
    </div>
  );
}