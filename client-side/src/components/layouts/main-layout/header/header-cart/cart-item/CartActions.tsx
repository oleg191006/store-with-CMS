import { useActions } from "@/hooks/useActions";
import { useCart } from "@/hooks/useCart";
import { ICartItem } from "@/shared/types/cart.interface";
import styles from "../HeaderCart.module.scss";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface ICartActionsProps {
  item: ICartItem;
}

export function CartActions({ item }: ICartActionsProps) {
  const { changeQuantity } = useActions();
  const { items } = useCart();

  const quantity = items.find(
    (cartItem) => cartItem.product.id === item.product.id
  )?.quantity;

  return (
    <div className={styles.actions}>
      <Button
        onClick={() => changeQuantity({ id: item.id, type: "minus" })}
        variant="ghost"
        size="icon"
        disabled={quantity === 1}
      >
        <Minus />
      </Button>
      <input disabled readOnly value={quantity} />

      <Button
        onClick={() => changeQuantity({ id: item.id, type: "plus" })}
        variant="ghost"
        size="icon"
      >
        <Plus />
      </Button>
    </div>
  );
}
