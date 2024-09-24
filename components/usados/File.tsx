"use client";
import React, { useState, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

type FormSubirImagenProps = {
  id: number;
  imagenPrevia: string | null; // Puede ser null
  componente: string;
  defaultImage?: string;
  objeto?: any;
  setabrirModal?: Dispatch<SetStateAction<boolean>>;
};

const FormSubirImagen: React.FC<FormSubirImagenProps> = ({
  id,
  imagenPrevia,
  componente,
  defaultImage,
  objeto,
  setabrirModal,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    imagenPrevia || defaultImage || null
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('file', selectedFile);

    // Enviar el formData al servidor
    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    // Resetea los estados después de la subida
    setSelectedFile(null);
    setPreviewUrl(imagenPrevia || defaultImage || null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div
        className="border-dashed border-2 border-gray-400 p-4 w-60 h-60 flex flex-col items-center justify-center cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
          }
        }}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Preview"
            width={150}
            height={150}
            className="mb-2"
          />
        ) : (
          <p>Seleccione o arrastre la imagen aquí</p>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        {!previewUrl && (
          <button
            type="button"
            className="mt-2 bg-blue-500 text-white p-2 rounded"
            onClick={() => setPreviewUrl(imagenPrevia || defaultImage || null)}
          >
            Cambiar Imagen
          </button>
        )}
      </div>
      <button
        type="button"
        className="mt-2"
        onClick={() => document.getElementById('file-input')?.click()}
      >
        Escoger otra imagen
      </button>
      <button
        type="submit"
        className="mt-4 bg-green-500 text-white p-2 rounded"
        disabled={!selectedFile}
      >
        Subir Imagen
      </button>
    </form>
  );
};

export default FormSubirImagen;
