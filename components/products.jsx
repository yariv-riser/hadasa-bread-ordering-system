import ProductItem from './product-item';

import classes from './products.module.css';

export default function Products({ onProductSelection, quantities, products }) {
  return (
    <ul className={classes['product-list']}>
      {products.map(({ name, price }) => (
        <li key={name}>
          <ProductItem
            name={name}
            price={price}
            onProductSelection={onProductSelection}
            quantities={quantities}
          />
        </li>
      ))}
    </ul>
  )
}