"use client";

import { STORE_URL } from "@/config/url.config";
import { categoryService } from "@/services/category.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export const useDeleteCategory = () => {
  const params = useParams<{ storeId: string; categoryId: string }>();
  const routes = useRouter();

  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isPending: isLoadingDelete } = useMutation({
    mutationKey: ["delete category"],
    mutationFn: () => categoryService.delete(params.categoryId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get categories for store dashboard"],
      });
      toast.success("Category deleted successfully");
      routes.push(STORE_URL.categories(params.storeId));
    },
    onError() {
      toast.error("Failed to delete category. Please try again.");
    },
  });

  return useMemo(
    () => ({
      deleteCategory,
      isLoadingDelete,
    }),
    [deleteCategory, isLoadingDelete]
  );
};
