import QuantitySelector from '@/components/quantity-selector';

import classes from './product-item.module.css';

export default function ProductItem({ name, price, onProductSelection, quantities }) {
  return (
    <article className={classes['product-item']} itemScope itemType="https://schema.org/Product">

      <header className={classes.header}>
        <h3 itemProp="name">{name}</h3>
      </header>

      <section className={classes["product-pricing"]}>
        <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <span itemProp="priceCurrency" content="ILS">₪</span>
          <span itemProp="price" content={price}>{price}</span>
        </span>
      </section>

      <img
        className={classes.image}
        src="https://pub-a541fcb4769b4b0782b51f2b72d105e9.r2.dev/images/product-image-placeholder-0.png"
        alt="Black wireless over-ear headphones"
        itemProp="image"
      />

      <footer className={classes.footer}>
        <QuantitySelector onProductSelection={onProductSelection} productName={name} quantities={quantities} />
      </footer>

    </article>
  )
}