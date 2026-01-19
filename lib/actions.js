'use server';

import { supabase } from '@/lib/supabase';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

function getItemTableHTML(selectedQuantities, products) {
  const priceMap = Object.fromEntries(
    products.map(p => [p.name, p.price])
  );

  const itemsWithPrices = selectedQuantities.map(item => {
    const price = priceMap[item.name] || 0;
    const total = price * item.quantity;

    return {
      ...item,
      price,
      total
    };
  });

  const orderTotal = itemsWithPrices.reduce(
    (sum, item) => sum + item.total,
    0
  );

  return {
    total: orderTotal,
    html: `<table style="width:100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
    <thead>
      <tr style="background-color: #f3ede4;">
        <th style="padding: 10px; border-bottom: 1px solid #e6d8c7; text-align: right;">מוצר</th>
        <th style="padding: 10px; border-bottom: 1px solid #e6d8c7;">כמות</th>
        <th style="padding: 10px; border-bottom: 1px solid #e6d8c7;">מחיר</th>
        <th style="padding: 10px; border-bottom: 1px solid #e6d8c7;">סה״כ</th>
      </tr>
    </thead>
    <tbody>
      ${itemsWithPrices
        .map(
          item => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">₪${item.price}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">₪${item.total}</td>
        </tr>
      `
        )
        .join('')}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" style="padding: 12px; text-align: left; font-weight: bold;">
          סה״כ לתשלום
        </td>
        <td style="padding: 12px; text-align: center; font-weight: bold; color: #7a5a3a;">
          ₪${orderTotal}
        </td>
      </tr>
    </tfoot>
  </table>
  `};
}

export async function sendOrderConfirmations(prevState, formData, { selectedQuantities }) {
  const { data: products, error: fetchError } = await supabase
    .from('products')
    .select('name, price');

  if (fetchError || !products) {
    return { success: false, message: 'Could not verify product prices.' };
  }

  const { html, total } = getItemTableHTML(selectedQuantities, products);

  const order = {
    id: Date.now().toString(),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    items: selectedQuantities,
    itemsTableHtml: html,
    orderTotal: total,
    timestamp: new Date().toISOString()
  };

  // Validation
  if (
    isInvalidText(order.name) ||
    isInvalidText(order.email) ||
    !order.email.includes('@') ||
    isInvalidText(order.phone) ||
    isInvalidText(order.address) ||
    !selectedQuantities.length
  ) {
    return { success: false, message: 'Invalid Input.' };
  }

  try {
    await supabase.from('orders').insert([{
      customer_info: {
        name: order.name,
        email: order.email,
        phone: order.phone,
        address: order.address
      },
      items_html: order.itemsTableHtml,
      created_at: order.timestamp
    }]);

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycby6j5uczjzmMXAn-mZpj65IzicUDeiKByKNfTKUbpz4ONsNl3OmUaki0PTf2YR-dPej/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      }
    );

    if (!response.ok) throw new Error('Google Script failed');

    return { success: true };
  } catch (error) {
    console.error("Order processing error:", error);
    return { success: false, message: 'Failed to process order.' };
  }
}