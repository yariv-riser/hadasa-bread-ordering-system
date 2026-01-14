import { useState } from 'react';
import { X } from 'lucide-react';

import OrderForm from './order-form';
import Modal from './modal';

import classes from './order-summary.module.css';

export default function OrderSummary({ selectedQuantities, products }) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className={classes['order-summary']} aria-labelledby="order-summary-title">
      <h2 id="order-summary-title">סיכום</h2>

      {selectedQuantities.length
        ? <ul className={classes['summary-list']}>
          {selectedQuantities.map(product => (
            <li className={classes['summary-item']} key={product.name}>
              <article>
                <span>{product.quantity}<X size={18} strokeWidth={2} /> {product.name}</span>
              </article>
            </li>
          ))}
        </ul>
        : <p className={classes['no-items-msg']}> - לא נבחרו לחמים - </p>}

      <hr />

      <section className={classes['total-section']} aria-labelledby="order-total-title">
        <h3 className={classes["order-total-title"]}>סך הכל</h3>
        <p>
          <output aria-live="polite">
            ₪{selectedQuantities.reduce((acc, selectedQuantity) => {
              const price = products.find(product => product.name === selectedQuantity.name).price;
              return acc + (price * selectedQuantity.quantity);
            }, 0)}
          </output>
        </p>
      </section>

      <button className={classes['finish-order-btn']} onClick={() => setIsOpen(true)} disabled={!selectedQuantities.length}>ביצוע הזמנה</button>
      <p className={classes['payment-msg']}>דרכי התשלום יפורטו בהודעה שתשלח לאחר סיום ההזמנה.</p>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <OrderForm selectedQuantities={selectedQuantities} />
        </Modal>
      )}
    </article>
  )
}