import { supabase } from '@/lib/supabase';
import OrderClient from './OrderClient';

export default async function AdminOrdersPage() {
  // 1. Fetch all orders from the 'orders' table
  // We sort by 'created_at' descending to keep "Newest first"
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error.message);
  }

  // 2. Map data for compatibility
  // Supabase uses 'created_at', but your OrderClient looks for 'timestamp'
  // and 'itemsTableHtml'. We ensure those fields match here.
  const formattedOrders = (orders || []).map(order => ({
    ...order,
    // If you named your column 'items_html' in Supabase, 
    // we map it back to 'itemsTableHtml' for the UI
    itemsTableHtml: order.items_html || order.itemsTableHtml,
    timestamp: order.created_at
  }));

  return (
    <div style={{ padding: '2rem' }}>
      <h1>ניהול הזמנות</h1>
      {/* Pass the live database data to your existing client component */}
      <OrderClient initialOrders={formattedOrders} />
    </div>
  );
}