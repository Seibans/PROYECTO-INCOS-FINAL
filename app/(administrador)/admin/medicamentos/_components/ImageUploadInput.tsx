import { useRef, useState, useEffect } from 'react';
import { Trash2Icon, XIcon, UploadIcon } from 'lucide-react';

type ImageUploadBoxProps = {
  preview: string | null;
  onFileChange: (file: File) => void;
  onRemoveImage: () => void;
  onChangeImage: () => void;
};

const ImageUploadInput = ({ preview, onFileChange, onRemoveImage, onChangeImage }: ImageUploadBoxProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div
      className="relative border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full h-auto object-cover" />

          {/* Botón de Eliminar Imagen */}
          <button
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            onClick={onRemoveImage}
            type="button"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>

          {/* Botón de Cambiar Imagen */}
          <button
            className="absolute top-2 left-2 bg-blue-500 text-white p-1 rounded-full"
            onClick={onChangeImage}
            type="button"
          >
            <UploadIcon className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <p>Arrastra una imagen o haz clic para seleccionar</p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
