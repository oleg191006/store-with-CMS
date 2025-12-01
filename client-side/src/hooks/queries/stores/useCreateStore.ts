"use client";

import { STORE_URL } from "@/config/url.config";
import { storeService } from "@/services/store.service";
import { IStoreCreate } from "@/shared/types/store.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export function useCreateStore() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: createStore, isPending: isLoadingCreate } = useMutation({
    mutationKey: ["create store"],
    mutationFn: (data: IStoreCreate) => storeService.create(data),
    onSuccess(store) {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Store created successfully");
      // Використовуємо window.location для надійного редіректу на production
      setTimeout(() => {
        window.location.href = STORE_URL.home(store.id);
      }, 100);
    },
    onError() {
      toast.error("Failed to create store. Please try again.");
    },
  });

  return useMemo(
    () => ({ createStore, isLoadingCreate }),
    [createStore, isLoadingCreate]
  );
}
