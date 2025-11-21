import { fileService } from "@/services/file.service";
import { useMutation } from "@tanstack/react-query";
import { type ChangeEvent, useCallback, useMemo, useRef } from "react";
import toast from "react-hot-toast";

export function useUpload(onChange: (value: string[]) => void) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: uploadFiles, isPending: isUploading } = useMutation({
    mutationKey: ["upload files"],
    mutationFn: (formData: FormData) => fileService.upload(formData),
    onSuccess: (data) => {
      onChange(data.map((file) => file.url));
    },
    onError: () => {
      toast.error("File upload failed. Please try again.");
    },
  });

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      if (selectedFiles) {
        const fileArray = Array.from(selectedFiles);
        const formData = new FormData();
        fileArray.forEach((file) => {
          formData.append("files", file);
        });
        uploadFiles(formData);
      }
    },
    [uploadFiles]
  );

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return useMemo(
    () => ({
      fileInputRef,
      handleFileChange,
      handleButtonClick,
      isUploading,
    }),
    [isUploading, handleButtonClick, handleFileChange, fileInputRef]
  );
}
