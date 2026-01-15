'use client';

import { useState } from 'react';

import Products from '@/components/products';
import OrderSummary from '@/components/order-summary';
import classes from './page.module.css';

// Accept products as a prop here
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
          שלום!<br />מזמינה אותך לבחור את הלחמ/ים האהובים עליך.
          כולם על בסיס מחמצת שיפון ונעשים בעבודת יד.
        </p>

        <p className={classes['pickup-instructions']}>
          איסוף הלחמים יתבצע ביום שני הקרוב במאפייה שלי <strong>ברחוב הכלנית, מושב עמיקם</strong>
        </p>
      </section>

      {/* Use the products passed from the server */}
      <Products onProductSelection={handleProductSelection} quantities={quantities} products={products} />
      <OrderSummary selectedQuantities={quantities} products={products} />
    </main>
  );
}