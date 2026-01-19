import { supabase } from '@/lib/supabase';
import { saveItem, deleteItem } from './actions';
import { SubmitButton } from './SubmitButton';
import { UpdateButton } from './UpdateButton';
import { DeleteButton } from './DeleteButton';

import classes from './page.module.css';

export default async function AdminPage() {

  const { data: items } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className={classes['page-content']}>
      <h1>ניהול מוצרים</h1>

      <section className={classes['add-item-section']}>
        <h3>הוספת מוצר חדש</h3>
        <form action={saveItem}>
          <input name="name" placeholder="שם המוצר" required />
          <input name="price" type="number" placeholder="מחיר" required />
          <SubmitButton />
        </form>
      </section>

      <table className={classes['product-items-table']}>
        <caption>מוצרים</caption>
        <tbody>
          {items.length ? items.map((item) => (
            <tr key={item.id}>

              <td>
                <form
                  action={saveItem}
                  className={classes['product-edit-form']}
                >
                  <input type="hidden" name="id" value={item.id} />
                  <input required name="name" placeholder='שם המוצר' defaultValue={item.name} />
                  <input required name="price" placeholder='מחיר' type="number" defaultValue={item.price} />
                  <UpdateButton />
                  <DeleteButton handleOnClick={deleteItem.bind(null, item.id)} />
                </form>
              </td>

            </tr>
          )) : <p className={classes['empty-msg']}>- אין מוצרים -</p>}
        </tbody>
      </table>
    </main >
  );
}