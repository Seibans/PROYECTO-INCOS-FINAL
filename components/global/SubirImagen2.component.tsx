"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { FileX } from 'lucide-react';


// Define una interfaz para describir la estructura de los archivos
interface FileWithPreview extends File {
  preview: string;
}

export default function SubirImagen2() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  // Maneja la subida de archivos
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []).map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    console.log({files, newFiles, event})
  };

  // Maneja la eliminación de archivos
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    console.log({files, updatedFiles, index})
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="relative">
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center h-32 w-32 border-2 border-dashed border-primary rounded-lg cursor-pointer"
        >
          <span className="text-primary">Subir imagen</span>
          <input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      {files.map((file, index) => (
        <div
          key={index}
          className="relative bg-card rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src={file.preview}
            alt={file.name}
            className="w-full h-32 object-cover"
          />
          <div className="absolute top-2 right-2">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleRemoveFile(index)}
            >
              <FileX className="w-4 h-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}