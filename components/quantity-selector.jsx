
import { Plus, Minus } from 'lucide-react';

import classes from './quantity-selector.module.css';

export default function QuantitySelector({
  min = 0,
  max = 10,
  productName,
  onProductSelection,
  quantities
}) {

  const currentProduct = quantities.find(product => product.name === productName) || {};

  const increment = () => {
    onProductSelection(productName, (currentProduct?.quantity ?? 0) + 1);
  };

  const decrement = () => {
    onProductSelection(productName, (currentProduct?.quantity ?? 0) - 1);
  };

  return (
    <div className={classes["quantity-selector"]} role="group" aria-label="Product quantity">
      <button
        type="button"
        onClick={increment}
        disabled={currentProduct?.quantity === max}
      >
        <Plus size={25} strokeWidth={3} />
      </button>

      <input
        type="number"
        value={currentProduct?.quantity ?? 0}
        readOnly
        aria-live="polite"
      />

      <button
        type="button"
        onClick={decrement}
        disabled={currentProduct.quantity === min || !currentProduct.quantity}
      >
        <Minus size={25} strokeWidth={3} />
      </button>
    </div >
  );
}