"use client";

import { IProduct } from "@/shared/types/product.interface";
import styles from "./ProductCard.module.scss";
import Link from "next/link";
import { PUBLIC_URL } from "@/config/url.config";
import { formatPrice } from "@/utils/string/format-price";
import { useState } from "react";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = product.images?.[0] || "";

  return (
    <div className={styles.card}>
      <Link href={PUBLIC_URL.product(product.id)} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          {imageError || !imageUrl ? (
            <div className={styles.imageError}>
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>No image</span>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={product.title}
              className="w-[200px]"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </Link>

      <div className={styles.info}>
        <Link href={PUBLIC_URL.product(product.id)}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>

        {product.category && (
          <Link
            href={PUBLIC_URL.category(product.category.id)}
            className={styles.category}
          >
            {product.category.title}
          </Link>
        )}

        <p className={styles.price}>{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}
