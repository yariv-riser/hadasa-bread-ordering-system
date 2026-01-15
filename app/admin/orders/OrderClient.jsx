'use client';
import { useState } from 'react';

export default function OrderClient({ initialOrders }) {
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredOrders = initialOrders.filter(order => {
    const term = search.toLowerCase();
    const orderDate = new Date(order.timestamp).toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const matchesSearch = (
      order.customer_info.name.toLowerCase().includes(term) ||
      order.customer_info.email.toLowerCase().includes(term) ||
      order.customer_info.phone.includes(term) ||
      order.customer_info.address.toLowerCase().includes(term)
    );

    const matchesDate =
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate);

    return matchesSearch && matchesDate;
  });

  return (
    <div style={{ direction: 'rtl', fontFamily: 'sans-serif' }}>
      {/* --- FILTER BAR --- */}
      <div style={{
        marginBottom: '20px',
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        background: '#f9f9f9',
        padding: '15px',
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '12px' }}>חיפוש חופשי</label>
          <input
            placeholder="שם, טלפון, כתובת..."
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '8px', width: '200px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '12px' }}>מתאריך</label>
          <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            style={{ padding: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '12px' }}>עד תאריך</label>
          <input
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            style={{ padding: '8px' }}
          />
        </div>

      </div>

      {/* --- RESULTS TABLE --- */}
      <div style={{ marginTop: '20px' }}>
        <p>מציג <strong>{filteredOrders.length}</strong> הזמנות</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#7a5a3a', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'right' }}>תאריך ושעה</th>
              <th style={{ textAlign: 'right' }}>לקוח</th>
              <th style={{ textAlign: 'right' }}>כתובת</th>
              <th style={{ textAlign: 'right' }}>פרטי הזמנה</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px' }}>
                  {new Date(order.timestamp).toLocaleString('he-IL', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  })}
                </td>
                <td>
                  <strong>{order.name}</strong><br />
                  {order.phone}
                </td>
                <td>{order.address}</td>
                <td style={{ padding: '10px 0' }}>
                  <div
                    style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee' }}
                    dangerouslySetInnerHTML={{ __html: order.itemsTableHtml }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <p style={{ textAlign: 'center', padding: '20px' }}>לא נמצאו הזמנות לטווח שנבחר.</p>
        )}
      </div>
    </div>
  );
}