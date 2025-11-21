"use client";

import { productService } from "@/services/product.service";
import { IProductInput } from "@/shared/types/product.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useUpdateProduct = () => {
  const params = useParams<{ storeId: string; productId: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: updateProduct, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ["update product"],
    mutationFn: (data: IProductInput) => {
      if (!params?.productId) {
        throw new Error("Product ID is missing");
      }
      return productService.update(params.productId, data);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get products for store dashboard"],
      });

      toast.success("Product updated successfully");

      if (params?.storeId) {
        setTimeout(() => {
          router.push(`/store/${params.storeId}/products`);
        }, 1500);
      }
    },
    onError() {
      toast.error("Failed to update product. Please try again.");
    },
  });

  return {
    updateProduct,
    isLoadingUpdate,
  };
};
