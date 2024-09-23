'use client'

import { useState, useRef } from 'react'
import { XIcon } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CustomImageUpload() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { pending } = useFormStatus()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    handleFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFile = (file: File | undefined) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (formData: FormData) => {
    // if (image) {
    //   formData.append('image', image)
    // }
    // // Aquí puedes ver el contenido del FormData en la consola
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value)
    // }
    // await submitForm(formData)
  }

  return (
    <form action={handleSubmit} className="max-w-md mx-auto p-6 space-y-6">
      <div>
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-1">
          Texto
        </label>
        <Input
          id="text-input"
          name="text"
          type="text"
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="file-input" className="block text-sm font-medium text-gray-700 mb-1">
          Imagen
        </label>
        <div
          className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            id="file-input"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
          {preview ? (
            <>
              <img src={preview} alt="Preview" className="w-full h-full object-contain" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              >
                <XIcon className="h-5 w-5 text-gray-600" />
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Seleccione o arrastre una imagen</p>
            </div>
          )}
        </div>
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  )
}