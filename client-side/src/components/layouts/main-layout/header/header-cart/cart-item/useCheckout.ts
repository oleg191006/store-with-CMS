import { useActions } from "@/hooks/useActions";
import { useCart } from "@/hooks/useCart";
import { orderService } from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export const useCheckout = () => {
  const { items } = useCart();
  const { reset } = useActions();
  const router = useRouter();

  const { mutate: createPayment, isPending: isLoadingCreate } = useMutation({
    mutationKey: ["create order and payment"],
    mutationFn: () =>
      orderService.place({
        items: items.map((item) => ({
          price: item.price,
          quantity: item.quantity,
          productId: item.product.id,
          storeId: item.product.storeId,
        })),
      }),
    onSuccess: (response) => {
      console.log("Full response:", response); // DEBUG
      console.log("Data:", response?.data); // DEBUG

      const confirmationUrl = response?.data?.confirmation?.confirmation_url;

      console.log("Confirmation URL:", confirmationUrl); // DEBUG

      if (!confirmationUrl) {
        toast.error("Payment URL is missing");
        return;
      }

      // Спочатку перенаправляємо
      window.location.href = confirmationUrl; // Краще ніж router.push для зовнішніх URL

      // Потім очищаємо кошик
      reset();
    },
    onError: (error) => {
      console.error("Payment error:", error); // DEBUG
      toast.error("Failed to create order and payment");
    },
  });

  return useMemo(
    () => ({
      createPayment,
      isLoadingCreate,
    }),
    [createPayment, isLoadingCreate]
  );
};
