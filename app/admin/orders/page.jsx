import fs from 'fs/promises';
import path from 'path';
import OrderClient from './OrderClient';

export default async function AdminOrdersPage() {
  const ordersPath = path.join(process.cwd(), 'orders.json');
  let orders = [];

  try {
    const data = await fs.readFile(ordersPath, 'utf8');
    orders = JSON.parse(data).reverse(); // Newest first
  } catch (e) {
    orders = [];
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>ניהול הזמנות</h1>
      <OrderClient initialOrders={orders} />
    </div>
  );
}