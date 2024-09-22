"use client"

import { useState, ChangeEvent } from "react"
import { ImageUp, CircleXIcon } from 'lucide-react';

// Tipado para el archivo de imagen
interface ImageFile {
  file: File;
  url: string;
}

export default function SubirImagen() {
  const [images, setImages] = useState<ImageFile[]>([])

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }))
      setImages((prevImages) => [...prevImages, ...newImages])
    }
    event.target.value = ""
    console.log(files)
    console.log(event)
    console.log(images)
  }

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages]
      URL.revokeObjectURL(newImages[index].url)
      newImages.splice(index, 1)
      return newImages
    })
    console.log(images)
    console.log(index)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative w-20 h-20 bg-muted rounded-md overflow-hidden">
              <img
                src={image.url}
                alt={`Image ${index}`}
                className="w-full h-full object-cover"
                width={80}
                height={80}
              />
              <button
                className="absolute top-1 right-1 p-1 bg-background/80 rounded-full hover:bg-background"
                onClick={() => handleImageRemove(index)}
              >
                <CircleXIcon className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ))}
          <label
            htmlFor="image-upload"
            // text-white bg-primary
            className="inline-flex bg-background items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2"
          >
            <ImageUp className="w-5 h-5 mr-2" />
            Subir mágen
          </label>
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </div>
  )
}