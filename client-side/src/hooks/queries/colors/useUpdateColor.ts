import { colorService } from "@/services/color.service";
import { IColorInput } from "@/shared/types/color.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export const useUpdateColor = () => {
  const params = useParams<{ colorId: string }>();

  const queryClient = useQueryClient();

  const { mutate: updateColor, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ["update color"],
    mutationFn: (data: IColorInput) =>
      colorService.update(params.colorId, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get colors for store dashboard"],
      });
      toast.success("Color updated successfully");
    },
    onError() {
      toast.error("Failed to update color. Please try again.");
    },
  });

  return useMemo(
    () => ({
      updateColor,
      isLoadingUpdate,
    }),
    [updateColor, isLoadingUpdate]
  );
};
