'use client'

import { useState, useRef, useEffect } from 'react'
import { Trash2Icon, EyeIcon, XIcon } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Asume que tienes un Server Action definido en otro archivo
// import { submitForm } from './actions'

interface ComponentProps {
  initialData?: {
    texto: string;
    imagen: string;
  }
}

export default function FormInputFile({ initialData }: ComponentProps) {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(initialData?.imagen || null)
  const [text, setText] = useState(initialData?.texto || '')
  const [showLightbox, setShowLightbox] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { pending } = useFormStatus()

  useEffect(() => {
    if (initialData) {
      setText(initialData.texto)
      setPreview(initialData.imagen)
    }
  }, [initialData])

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
    if (image) {
      formData.append('image', image)
    }
    formData.set('text', text)
    // Aquí puedes ver el contenido del FormData en la consola
    for (let [key, value] of Array.from(formData.entries())) {
      console.log(key, value);
    }
    console.log(formData);
    // await submitForm(formData)
  }

  return (
    <TooltipProvider>
      <form action={handleSubmit} className="max-w-md mx-auto p-6 space-y-6">
        <div>
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-1">
            Texto
          </label>
          <Input
            id="text-input"
            name="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
              <div className="relative w-full h-full group">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-contain cursor-pointer" 
                  onClick={() => setShowLightbox(true)}
                />
                <div 
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => setShowLightbox(true)}
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
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 rounded-full p-2 shadow-md z-10"
                  >
                    <Trash2Icon className="h-4 w-4 text-white" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quitar imagen</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>

      {showLightbox && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
          onClick={() => setShowLightbox(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img 
              src={preview || ''} 
              alt="Lightbox" 
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
              onClick={() => setShowLightbox(false)}
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </TooltipProvider>
  )
}