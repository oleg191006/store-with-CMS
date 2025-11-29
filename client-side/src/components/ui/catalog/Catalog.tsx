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
              <svg
                className={styles.emptyIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3 className={styles.emptyTitle}>Продукти не знайдено</h3>
              <p className={styles.emptyText}>
                Спробуйте змінити фільтри або повернутися пізніше
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
