import { useUpload } from "./useUpload";
import styles from "./ImageUpload.module.scss";
import Image from "next/image";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import { ImagePlus } from "lucide-react";

interface ImageUploadProps {
  isDisabled: boolean;
  onChange: (value: string[]) => void;
  value: string[];
}

export function ImageUpload({ isDisabled, onChange, value }: ImageUploadProps) {
  const { handleButtonClick, fileInputRef, isUploading, handleFileChange } =
    useUpload(onChange);
  return (
    <div>
      <div className={styles.image_container}>
        {value.map((url) => (
          <div key={url} className={styles.image_wrapper}>
            <Image
              src={url ? url : "https://via.placeholder.com/250"}
              alt="Image"
              className={styles.image}
              width={250}
              height={250}
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        disabled={isDisabled || isUploading}
        variant="primary"
        onClick={handleButtonClick}
        className={cn(styles.upload, {
          "mt-4": value.length,
        })}
      >
        <ImagePlus />
        Upload Image
      </Button>
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isDisabled || isUploading}
      />
    </div>
  );
}
