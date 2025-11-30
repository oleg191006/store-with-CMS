import { Button } from "@/components/ui/button";
import { IProduct } from "@/shared/types/product.interface";

interface IAddToCartButtonProps {
  product: IProduct;
}

export function AddToCartButton({ product }: IAddToCartButtonProps) {
  return (
    <Button variant="primary" size="lg" className="w-full">
      Add to Cart
    </Button>
  );
}
