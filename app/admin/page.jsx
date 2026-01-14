import fs from 'fs/promises';
import path from 'path';
import { saveItem, deleteItem } from './actions';
import { SubmitButton } from '../login/SubmitButton';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminPage() {

  const filePath = path.join(process.cwd(), 'data.json');
  const fileData = await fs.readFile(filePath, 'utf8');
  const items = JSON.parse(fileData);

  // Server Action to handle logout
  async function logout() {
    'use server';
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/login');
  }

  return (
    <main style={{ padding: '2rem', direction: 'rtl', fontFamily: 'sans-serif' }}>
      <h1>ניהול מוצרים</h1>

      {/* --- ADD NEW ITEM FORM --- */}
      <section style={{ marginBottom: '3rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h3>הוסף מוצר חדש</h3>
        <form action={saveItem} style={{ display: 'flex', gap: '10px' }}>
          <input name="name" placeholder="שם המוצר" required />
          <input name="price" type="number" placeholder="מחיר" required />
          <SubmitButton />
        </form>
      </section>

      {/* --- ITEMS LIST --- */}
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #000' }}>
            <th>שם</th>
            <th>מחיר</th>
            <th>נוסף ב-</th>
            <th>עודכן ב-</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>
                <form action={saveItem} style={{ display: 'inline' }}>
                  <input type="hidden" name="id" value={item.id} />
                  <input name="name" defaultValue={item.name} />
                  <input name="price" type="number" defaultValue={item.price} style={{ width: '60px' }} />
                  <button type="submit" style={{ marginRight: '5px' }}>עדכן</button>
                </form>
              </td>
              <td>{new Date(item.createdAt).toLocaleDateString('he-IL')}</td>
              <td>{new Date(item.updatedAt).toLocaleDateString('he-IL')}</td>
              <td>
                <form action={deleteItem.bind(null, item.id)} style={{ display: 'inline' }}>
                  <button type="submit" style={{ color: 'red' }}>מחק</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form action={logout}>
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </form>
    </main >
  );
}