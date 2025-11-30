import { cn } from "@/lib/utils";
import { IProduct } from "@/shared/types/product.interface";
import styles from "./ProductGallery.module.scss";
import { useState } from "react";

interface ProductGalleryProps {
  product: IProduct;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <img
        src={product.images[currentIndex]}
        alt={product.title}
        width={500}
        height={500}
        className={styles.image}
      />
      <div className={styles.gallery}>
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              styles.item,
              index === currentIndex ? "border-black" : "border-transparent"
            )}
          >
            <img
              src={image}
              alt={`${product.title} thumbnail ${index + 1}`}
              width={100}
              height={100}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
