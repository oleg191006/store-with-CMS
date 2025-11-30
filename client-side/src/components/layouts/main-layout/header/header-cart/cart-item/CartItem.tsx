import { ICartItem } from "@/shared/types/cart.interface";
import styles from "../HeaderCart.module.scss";
import Link from "next/link";
import { PUBLIC_URL } from "@/config/url.config";
import { formatPrice } from "@/utils/string/format-price";
import { CartActions } from "./CartActions";

interface ICartItemProps {
  item: ICartItem;
}

export default function CartItem({ item }: ICartItemProps) {
  return (
    <div className={styles.item}>
      <Link href={PUBLIC_URL.product(item.product.id)} className={styles.image}>
        <img src={item.product.images[0]} alt={item.product.title} />
      </Link>
      <div className={styles.right}>
        <h2>{item.product.title}</h2>
        <p>{formatPrice(item.product.price)}</p>
        <CartActions item={item} />
      </div>
    </div>
  );
}
