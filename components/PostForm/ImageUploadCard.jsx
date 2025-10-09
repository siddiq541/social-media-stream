"use client";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ImageUploadCard({ onSelect }) {
  const [image, setImage] = useState(null);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImage(preview);
    onSelect?.(file);
  };

  const clearImage = () => {
    setImage(null);
    inputRef.current.value = "";
  };

  return (
    <Card className="flex flex-col items-center justify-center w-full max-w-md p-4 text-center border-2 border-gray-300 border-dashed bg-gray-50">
      <CardContent className="flex flex-col items-center justify-center gap-3">
        {!image ? (
          <>
            <div
              className="flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
              onClick={() => inputRef.current.click()}
            >
              <Image
                src="/img/upload.png"
                alt="upload"
                width={40}
                height={40}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Drag & Drop image here or
            </p>
            <Button
              onClick={() => inputRef.current.click()}
              variant="default"
              className="mt-1 bg-blue-500 border-none hover:bg-blue-600"
            >
              Browse
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </>
        ) : (
          <div className="relative">
            <Image
              src={image}
              alt="preview"
              width={300}
              height={200}
              className="object-cover rounded-lg"
            />
            <button
              onClick={clearImage}
              className="absolute px-2 py-1 text-xs text-white bg-gray-800 rounded-full top-2 right-2"
            >
              ✕
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
