import { STORE_URL } from "@/config/url.config";
import { colorService } from "@/services/color.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export const useDeleteColor = () => {
  const params = useParams<{ storeId: string; colorId: string }>();
  const routes = useRouter();

  const queryClient = useQueryClient();

  const { mutate: deleteColor, isPending: isLoadingDelete } = useMutation({
    mutationKey: ["delete color"],
    mutationFn: () => colorService.delete(params.colorId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get colors for store dashboard"],
      });
      toast.success("Color deleted successfully");
      routes.push(STORE_URL.colors(params.storeId));
    },
    onError() {
      toast.error("Failed to delete color. Please try again.");
    },
  });

  return useMemo(
    () => ({
      deleteColor,
      isLoadingDelete,
    }),
    [deleteColor, isLoadingDelete]
  );
};
