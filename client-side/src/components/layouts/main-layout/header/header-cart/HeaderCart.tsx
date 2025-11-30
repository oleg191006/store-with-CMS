import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import styles from "./HeaderCart.module.scss";
import { formatPrice } from "@/utils/string/format-price";
import CartItem from "./cart-item/CartItem";
import { useRouter } from "next/navigation";
import { useCheckout } from "./cart-item/useCheckout";
import { useProfile } from "@/hooks/useProfile";
import { PUBLIC_URL } from "@/config/url.config";

export function HeaderCart() {
  const router = useRouter();

  const { createPayment, isLoadingCreate } = useCheckout();
  const { user } = useProfile();

  const { items, total } = useCart();

  const handleClick = () => {
    user ? createPayment() : router.push(PUBLIC_URL.auth());
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">Cart</Button>
      </SheetTrigger>

      <SheetContent className={styles.cart}>
        <Heading
          title="Shopping Cart"
          description="Your selected items"
          className="text-xl"
        />
        <div className={styles.items}>
          {items.length ? (
            items.map((item) => <CartItem item={item} key={item.id} />)
          ) : (
            <div className={styles.not_found}>Your cart is empty.</div>
          )}
        </div>
        {items.length && (
          <>
            <div className={styles.total}>
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Button
              onClick={handleClick}
              variant="primary"
              disabled={isLoadingCreate}
            >
              Proceed to Checkout
            </Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
