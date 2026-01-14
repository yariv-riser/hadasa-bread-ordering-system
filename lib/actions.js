'use server';
import fs from 'fs/promises';
import path from 'path';
import products from '@/data.json';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

function getItemTableHTML(selectedQuantities) {
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

  return `<table style="width:100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
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
  `;
}

export async function sendOrderConfirmations(prevState, formData, { selectedQuantities }) {

  const order = {
    id: Date.now().toString(),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    items: selectedQuantities,
    itemsTableHtml: getItemTableHTML(selectedQuantities),
    timestamp: new Date().toISOString()
  };

  if (
    isInvalidText(order.name) ||
    isInvalidText(order.email) ||
    !order.email.includes('@') ||
    isInvalidText(order.phone) ||
    isInvalidText(order.address) ||
    !selectedQuantities.length
  ) {
    return {
      success: false,
      message: 'Invalid Input.'
    }
  }

  try {

    const ordersPath = path.join(process.cwd(), 'orders.json');
    let orders = [];
    try {
      const existingData = await fs.readFile(ordersPath, 'utf8');
      orders = JSON.parse(existingData);
    } catch (e) { /* file might not exist yet */ }

    orders.push(order);
    await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbw1mXc73xdAoggijtBuf3ZAJ5yyN96ieW10cMZ7eEdxw3GgNliRCI_z5qyYCQnRh9dv/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText} `);
    }

    const data = await response.json();
    console.log("Success:", data);
    return {
      success: true
    }
  } catch (error) {
    console.error("Failed to save/send order:", error);
  }
}