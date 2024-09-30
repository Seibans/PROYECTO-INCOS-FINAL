'use client'

import React, { useState, useRef, ChangeEvent, DragEvent, startTransition, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Plus, Upload, LucideIcon,BriefcaseMedical, PawPrint, Contact, Aperture } from 'lucide-react'
import { editarEsquema } from "@/actions/uploads"
import { SubirImagenSquema } from '@/schemas'
import { toast } from "sonner"
import * as z from "zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from 'next/image'

interface ImageUploaderProps {
  id: number
  imagenPrevia: string | null
  componente: string
  defaultImage?: string
  objeto?: any
  setabrirModal?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CambiarImagen({
  id,
  imagenPrevia,
  componente,
  defaultImage = '/placeholder.svg?height=300&width=300',
  objeto,
  setabrirModal,
}: ImageUploaderProps) {
  const { update } = useSession()
  const [previewImage, setPreviewImage] = useState<string | null>(imagenPrevia)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof SubirImagenSquema>>({
    resolver: zodResolver(SubirImagenSquema),
    defaultValues: {
      archivo: undefined,
    },
  })

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    handleFileSelection(selectedFile)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFile = e.dataTransfer.files[0]
    handleFileSelection(droppedFile)
  }

  const handleFileSelection = (selectedFile: File | undefined) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      form.setValue('archivo', selectedFile, { shouldValidate: true })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }
  const getIconByComponent = (componente: string) => {
    switch (componente.toLowerCase()) {
      case 'medicamento':
        return BriefcaseMedical
      case 'mascota':
        return PawPrint
      case 'usuario':
        return Contact
      case 'perfil':
        return Aperture
      default:
        return Plus
    }
  }

  const Icon = getIconByComponent(componente)

  const onSubmit = (values: z.infer<typeof SubirImagenSquema>) => {
    const formData = new FormData()
    formData.append('file', values.archivo)
    startTransition(() => {
      toast.promise(
        editarEsquema(id, formData, componente),
        {
          loading: "Guardando Datos...",
          success: (data) => {
            if (data.error) {
              throw new Error(data.error)
            }
            if (data.success) {
              router.refresh()
              if (componente === 'perfil') {
                update();
              }
              return `${data.success}`
            }
            return "Operación completada"
          },
          error: (error) => error.message,
        }
      )
    })
  }

  useEffect(() => {
    form.trigger('archivo')
  }, [form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md mx-auto mb-5">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="archivo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    className={cn(
                      "border-4 border-dashed rounded-xl p-4 text-center cursor-pointer",
                      "transition-all duration-200 ease-in-out",
                      "hover:border-primary hover:bg-primary/5",
                      "flex flex-col items-center justify-center",
                      "h-52 md:h-80 w-full relative overflow-hidden"
                    )}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    {previewImage ? (
                      // <img
                      //   src={previewImage}
                      //   alt="Vista previa de la imagen"
                      //   className="max-w-full max-h-full object-contain"
                      // />
                      <Image
                        src={previewImage}
                        alt="Vista previa de la imagen"
                        width={60}
                        height={60}
                        className="max-w-full max-h-full object-contain rounded-xl"/>
                    ) : (
                      <>
                        <p className="text-muted-foreground mb-2">Arrastre o seleccione una imagen</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Seleccionar imagen
                        </Button>
                      </>
                    )}

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            size="icon"
                            className="absolute bottom-2 right-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              fileInputRef.current?.click()
                            }}
                            variant={'outline'}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="sr-only">Seleccionar imagen</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent align='end'>
                          <p>Cambiar Imagen</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
            aria-label="Seleccionar archivo de imagen"
          />
          <div className='flex justify-end -mr-3 md:-mr-7'>
            <Button
              type="submit"
              className="w-4/12 flex"
              disabled={!form.formState.isValid}
              variant="whatsapp"
            >
              <Upload className="mr-2 h-4 w-4" />
              <span className="hidden md:block">Actualizar</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}