import Link from "next/link";
import { ICatalog } from "./catalog.interface";
import styles from "./Catalog.module.scss";
import { ProductCard } from "./product-card/ProductCard";

export function Catalog({
  title,
  description,
  linkTitle,
  link,
  products,
}: ICatalog) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h1>{title.slice(0, 1).toUpperCase() + title.slice(1)}</h1>
          {description && <p>{description}</p>}
        </div>
        {linkTitle && link && <Link href={link}>{linkTitle}</Link>}
      </div>
      <div className={styles.catalog}>
        <div className={styles.products}>
          {products.length ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyTitle}>No products available</h3>
              <p className={styles.emptyText}>
                There are currently no products to display in this catalog.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
