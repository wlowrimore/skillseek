"use client";

import { CldUploadButton, type CldUploadButtonProps } from "next-cloudinary";

interface CloudinaryUploaderProps extends CldUploadButtonProps {
  onImageUrlChange?: (url: string) => void;
  className?: string;
}

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

const CloudinaryUploader = ({
  onImageUrlChange,
  className,
  ...props
}: CloudinaryUploaderProps) => {
  const handleUpload = (result: any) => {
    if (result?.info?.secure_url) {
      onImageUrlChange?.(result.info.secure_url);
    }
  };

  return (
    <CldUploadButton
      uploadPreset={cloudPresetName}
      options={{
        multiple: true,
        sources: ["local", "url", "unsplash", "camera"],
      }}
      onSuccess={handleUpload}
      className={className}
      {...props}
    />
  );
};

export default CloudinaryUploader;
