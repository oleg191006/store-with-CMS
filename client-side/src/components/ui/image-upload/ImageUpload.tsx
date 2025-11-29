"use client";

import { useUpload } from "./useUpload";
import styles from "./ImageUpload.module.scss";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import { ImagePlus, X } from "lucide-react";
import { useState } from "react";

interface ImageUploadProps {
  isDisabled: boolean;
  onChange: (value: string[]) => void;
  value: string[];
}

export function ImageUpload({ isDisabled, onChange, value }: ImageUploadProps) {
  const { handleButtonClick, fileInputRef, isUploading, handleFileChange } =
    useUpload(onChange);

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (url: string) => {
    setImageErrors((prev) => ({ ...prev, [url]: true }));
  };

  const handleRemoveImage = (urlToRemove: string) => {
    const newValue = value.filter((url) => url !== urlToRemove);
    onChange(newValue);
  };

  return (
    <div>
      <div className={styles.image_container}>
        {value.map((url) => (
          <div key={url} className={styles.image_wrapper}>
            <div className={styles.image_box}>
              {imageErrors[url] ? (
                <div className={styles.image_error}>
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>Failed to load</span>
                </div>
              ) : (
                <img
                  src={url || "https://via.placeholder.com/250"}
                  alt="Uploaded image"
                  className={styles.image}
                  onError={() => handleImageError(url)}
                />
              )}

              <button
                type="button"
                onClick={() => handleRemoveImage(url)}
                className={styles.remove_button}
                disabled={isDisabled}
              >
                <X size={16} />
              </button>
            </div>
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
        {isUploading ? "Uploading..." : "Upload Image"}
      </Button>

      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isDisabled || isUploading}
      />
    </div>
  );
}
