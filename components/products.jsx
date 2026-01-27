import ProductItem from './product-item';

import classes from './products.module.css';

export default function Products({ onProductSelection, quantities, products }) {

  const sortedDescending = [...products].sort((a, b) => {
    return b.created_at.localeCompare(a.created_at);
  });

  return (
    <ul className={classes['product-list']}>
      {sortedDescending.map(({ name, price }) => (
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