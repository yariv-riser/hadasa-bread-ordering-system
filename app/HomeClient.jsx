'use client';

import { useState } from 'react';

import Products from '@/components/products';
import OrderSummary from '@/components/order-summary';
import classes from './page.module.css';

export default function HomeClient({ products }) {

  const [quantities, setQuantities] = useState([]);

  function handleProductSelection(productName, updatedQuantity) {
    setQuantities(prev => {
      let updatedQuantities = [...prev];
      const productIndex = updatedQuantities.findIndex(product => product.name === productName);

      if (productIndex > -1) {
        updatedQuantities[productIndex].quantity = updatedQuantity;
      } else {
        updatedQuantities = updatedQuantities.concat([{ name: productName, quantity: updatedQuantity }]);
      }

      return updatedQuantities.filter(product => product.quantity > 0);
    });
  }

  return (
    <main className={classes.main}>
      <section className={classes.intro}>
        <p className={classes['welcome-msg']}>
          שלום!<br />מזמינה אותך לבחור את הלחמים האהובים עליך.
          כולם על בסיס מחמצת שיפון ונעשים בעבודת יד.
        </p>

        <p className={classes['pickup-instructions']}>
          איסוף הלחמים יתבצע בימי שני וחמישי במאפייה שלי<br /><strong><a href="https://maps.google.com/?q=32.564827,35.023335">ברחוב הכלנית, מושב עמיקם</a></strong>
        </p>
      </section>

      <Products onProductSelection={handleProductSelection} quantities={quantities} products={products} />
      <OrderSummary selectedQuantities={quantities} products={products} />
    </main>
  );
}