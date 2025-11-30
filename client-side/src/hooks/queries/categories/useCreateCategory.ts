"use client";

import { STORE_URL } from "@/config/url.config";
import { categoryService } from "@/services/category.service";
import { ICategoryInput } from "@/shared/types/category.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export const useCreateCategory = () => {
  const params = useParams<{ storeId: string }>();
  const routes = useRouter();

  const queryClient = useQueryClient();

  const { mutate: createCategory, isPending: isLoadingCreate } = useMutation({
    mutationKey: ["create category"],
    mutationFn: (data: ICategoryInput) =>
      categoryService.create(data, params.storeId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get categories for store dashboard"],
      });
      toast.success("Category created successfully");
      routes.push(STORE_URL.categories(params.storeId));
    },
    onError() {
      toast.error("Failed to create category. Please try again.");
    },
  });

  return useMemo(
    () => ({
      createCategory,
      isLoadingCreate,
    }),
    [createCategory, isLoadingCreate]
  );
};
