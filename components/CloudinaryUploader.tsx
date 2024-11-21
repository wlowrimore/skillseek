"use client";

import { CldUploadButton, type CldUploadButtonProps } from "next-cloudinary";
import { useState } from "react";
import { useUpdatePath } from "@/hooks/useUpdatePath";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteCloudinaryImage } from "@/lib/cloudinary";
import { toast } from "@/hooks/use-toast";

interface CloudinaryUploaderProps
  extends Omit<CldUploadButtonProps, "onSuccess"> {
  onImageUrlChange?: (url: string, deleteToken: string) => void;
  className?: string;
  currentImageUrl?: string;
  currentDeleteToken?: string;
}

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

const CloudinaryUploader = ({
  onImageUrlChange,
  className,
  currentImageUrl,
  ...props
}: CloudinaryUploaderProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const [deleteToken, setDeleteToken] = useState<string | undefined>(
    currentImageUrl
  );

  const { isUpdatePath } = useUpdatePath();
  const buttonText = isUpdatePath ? "Replace" : "Upload";

  const handleUpload = (result: any) => {
    if (result?.info?.secure_url) {
      const newUrl = result.info.secure_url;
      const newToken = result.info.delete_token;

      setImageUrl(newUrl);
      setDeleteToken(newToken);

      onImageUrlChange?.(newUrl, newToken);

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    }
  };

  const handleRemoveImage = async () => {
    if (!imageUrl || !deleteToken) {
      toast({
        title: "Error",
        description: "No image or delete token available",
      });
      return;
    }

    try {
      await deleteCloudinaryImage(deleteToken);

      setImageUrl(undefined);
      setDeleteToken(undefined);
      onImageUrlChange?.("", "");

      toast({
        title: "Success",
        description: "Image removed successfully",
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error",
        description: "Failed to remove image",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <CldUploadButton
          uploadPreset={cloudPresetName}
          options={{
            multiple: false,
            sources: ["local", "url", "unsplash", "camera"],
          }}
          onSuccess={handleUpload}
          className={className}
          {...props}
        >
          {buttonText}
        </CldUploadButton>

        <Button
          type="button"
          onClick={handleRemoveImage}
          disabled={!imageUrl}
          className={`${
            !imageUrl
              ? "opacity-50 cursor-not-allowed bg-slate-500 border border-black !max-w-fit hover:bg-black text-white text-base font-semibold py-6 px-11 rounded-full transition:hover duration-300"
              : "bg-red-500 border border-black !max-w-fit hover:bg-black text-white text-base font-semibold py-6 px-11 rounded-full transition:hover duration-300"
          }`}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CloudinaryUploader;
