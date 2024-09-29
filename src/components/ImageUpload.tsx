"use client";
import React, { useState, useEffect } from "react";
import { ImagePlus, Trash } from "lucide-react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useImageStore } from "@/hooks/useImageStore";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const { images, addImage, removeImage } = useImageStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleUpload = (result: any) => {
    const { info, error } = result;
    if (info && info.secure_url) {
      addImage(info.secure_url);
      onUpload(info.secure_url);
    } else if (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleURLInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      addImage(url);
      onUpload(url);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {images.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="p-1 rounded-full border border-gray-300 bg-gray-200"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
            <CldImage
              src={url}
              width="200"
              height="200"
              crop="fill"
              className="object-cover"
              alt="Uploaded Image"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""}
      >
        {({ open }) => (
          <div className="mb-4">
            <button
              type="button"
              onClick={() => open()}
              className="p-2 rounded-full border border-gray-300 bg-gray-200 flex items-center"
            >
              <ImagePlus className="h-6 w-6" />
              <span className="ml-2 text-sm">Upload Image</span>
            </button>
          </div>
        )}
      </CldUploadWidget>
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="text"
          onChange={handleURLInputChange}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Enter image URL here"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
