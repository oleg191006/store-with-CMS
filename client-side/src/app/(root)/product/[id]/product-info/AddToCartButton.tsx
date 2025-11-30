import { Button } from "@/components/ui/button";
import { useActions } from "@/hooks/useActions";
import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/shared/types/product.interface";

interface IAddToCartButtonProps {
  product: IProduct;
}

export function AddToCartButton({ product }: IAddToCartButtonProps) {
  const { addToCart, removeFromCart } = useActions();
  const { items } = useCart();

  const currentElement = items.find(
    (cartItem) => cartItem.product.id === product.id
  );

  return (
    <Button
      variant="primary"
      size="lg"
      className="w-full"
      onClick={() =>
        currentElement
          ? removeFromCart({ id: currentElement.id })
          : addToCart({
              product,
              quantity: 1,
              price: product.price,
            })
      }
    >
      {currentElement ? "Remove from Cart" : "Add to Cart"}
    </Button>
  );
}
