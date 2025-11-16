"use client";

import { storeService } from "@/services/store.service";
import { IStoreEdit } from "@/shared/types/store.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export function useUpdateStore() {
  const queryClient = useQueryClient();
  const params = useParams<{ storeId: string }>();

  const { data: store } = useQuery({
    queryKey: ["store", params.storeId],
    queryFn: () => storeService.getById(params.storeId),
    enabled: !!params.storeId,
  });

  const { mutate: updateStore, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ["update store"],
    mutationFn: (data: IStoreEdit) => storeService.update(params.storeId, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Store updated successfully");
    },
    onError() {
      toast.error("Failed to update store. Please try again.");
    },
  });
  return useMemo(
    () => ({ store, updateStore, isLoadingUpdate }),
    [store, updateStore, isLoadingUpdate]
  );
}
