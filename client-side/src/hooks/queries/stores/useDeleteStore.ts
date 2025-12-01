"use client";
import { PUBLIC_URL } from "@/config/url.config";
import { storeService } from "@/services/store.service";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useDeleteStore() {
  const params = useParams<{ storeId: string }>();
  const router = useRouter();

  const { mutate: deleteStore, isPending: isLoadingDelete } = useMutation({
    mutationKey: ["delete store"],
    mutationFn: () => storeService.delete(params.storeId),
    onSuccess() {
      toast.success("Store deleted successfully");
      // Використовуємо window.location для надійного редіректу на production
      setTimeout(() => {
        window.location.href = PUBLIC_URL.home();
      }, 100);
    },
    onError() {
      toast.error("Failed to delete store. Please try again.");
    },
  });

  return { deleteStore, isLoadingDelete };
}
