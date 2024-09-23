'use client'

import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Button } from "@/components/ui/button"
import { Trash2Icon, EyeIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ImageUploaderProps {
  initialPreview?: string;
  onImageChange: (file: File | null) => void;
}

export interface ImageUploaderRef {
  removeImage: () => void;
}

const ImageUploader = forwardRef<ImageUploaderRef, ImageUploaderProps>(({ initialPreview, onImageChange }, ref) => {
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    removeImage: () => {
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onImageChange(null);
    }
  }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file?: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <TooltipProvider>
      <div
        className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
        {preview ? (
          <div className="relative w-full h-full group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain cursor-pointer"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <EyeIcon className="h-10 w-10 text-white" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500 mb-4">Seleccione o arrastre una imagen</p>
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
            >
              Seleccionar imagen
            </Button>
          </div>
        )}

        {preview && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                  onImageChange(null);
                }}
                className="absolute top-2 right-2 bg-red-500 rounded-full p-2 shadow-md z-10"
              >
                <Trash2Icon className="h-4 w-4 text-white" />
              </button>
            </TooltipTrigger>
            <TooltipContent side='left'>
              <p>Quitar imagen</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
});

ImageUploader.displayName = 'ImageUploader';

export default ImageUploader;