import { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function UploadPopover({ selectedImage, onSelect }) {
  const [open, setOpen] = useState(false);
  const [draftFile, setDraftFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!selectedImage) {
      setDraftFile(null);
      setPreview(null);
    }
  }, [selectedImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setDraftFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    setDraftFile(null);
    setPreview(null);
    onSelect(null);
    setOpen(false);
  };

  const handleContinue = () => {
    if (!draftFile) return;

    onSelect(draftFile);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-blue-500">
          <Image src="/img/addImage.png" alt="" width={20} height={20} />
          Photo
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-[420px] p-4 rounded-2xl shadow-lg"
        align="center"
      >
        {!preview ? (
          <label className="flex flex-col items-center justify-center w-full h-40 p-6 text-gray-500 transition border-2 border-gray-400 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <p>Upload a project image</p>
            <span className="text-xs text-gray-400">(max 4MB)</span>
          </label>
        ) : (
          <div className="flex flex-col items-center w-full gap-3">
            <div className="flex items-center w-full gap-3">
              <Image
                src={preview}
                alt="preview"
                width={50}
                height={50}
                className="rounded-md"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{draftFile?.name}</p>
                <p className="text-xs text-gray-400">
                  {(draftFile?.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <Progress value={100} className="w-full" />

            <div className="flex w-full gap-3">
              <Button
                variant="outline"
                className="flex-1"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>

              <Button className="flex-1" type="button" onClick={handleContinue}>
                Continue
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
