"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Calendar, Heart, Info, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'

// Tipos basados en el modelo proporcionado
type TipoMascota = "PERRO" | "GATO" | "AVE" | "REPTIL" | "OTRO"
type Sexo = "MACHO" | "HEMBRA"

interface Mascota {
  id: number
  nombre: string
  especie: TipoMascota
  raza?: string
  fechaNacimiento?: Date
  sexo: Sexo
  detalles?: string
  imagen?: string
  esterilizado?: boolean
  alergias?: string
  observaciones?: string
}

// Colores dinámicos según el tipo de mascota
const colorSchemes = {
  PERRO: { from: "from-blue-500", to: "to-cyan-500" },
  GATO: { from: "from-purple-500", to: "to-pink-500" },
  AVE: { from: "from-yellow-500", to: "to-orange-500" },
  REPTIL: { from: "from-green-500", to: "to-teal-500" },
  OTRO: { from: "from-gray-500", to: "to-slate-500" },
}

// Datos de ejemplo con imágenes de referencia
const mascotas: Mascota[] = [
  {
    id: 1,
    nombre: "Luna",
    especie: "GATO",
    raza: "Siamés",
    fechaNacimiento: new Date("2020-03-15"),
    sexo: "HEMBRA",
    imagen: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500&h=500&fit=crop",
    esterilizado: true,
    alergias: "Ninguna",
    observaciones: "Muy juguetona"
  },
  {
    id: 2,
    nombre: "Max",
    especie: "PERRO",
    raza: "Labrador",
    fechaNacimiento: new Date("2019-07-22"),
    sexo: "MACHO",
    imagen: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=500&fit=crop",
    esterilizado: false,
    alergias: "Polen",
    observaciones: "Le encanta nadar"
  },
  {
    id: 3,
    nombre: "Coco",
    especie: "AVE",
    raza: "Loro gris africano",
    fechaNacimiento: new Date("2018-11-10"),
    sexo: "MACHO",
    imagen: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=500&h=500&fit=crop",
    esterilizado: false,
    alergias: "Ninguna",
    observaciones: "Habla mucho"
  },
  {
    id: 4,
    nombre: "Nala",
    especie: "PERRO",
    raza: "Golden Retriever",
    fechaNacimiento: new Date("2021-01-05"),
    sexo: "HEMBRA",
    imagen: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=500&h=500&fit=crop",
    esterilizado: true,
    alergias: "Pollo",
    observaciones: "Muy cariñosa"
  }
]

export default function VisorMascotas() {
  const [selectedPet, setSelectedPet] = useState<Mascota | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi) {
      // Opcional: Iniciar autoplay
      const autoplay = setInterval(() => {
        emblaApi.scrollNext()
      }, 3000)

      return () => clearInterval(autoplay)
    }
  }, [emblaApi])

  return (
    <div className="container mx-auto p-4 space-y-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-amber-600 to-red-600 text-transparent bg-clip-text">
        Mis Mascotas
      </h1>

      {/* Carrusel de mascotas */}
      <div className="w-full max-w-md mx-auto overflow-hidden relative" ref={emblaRef}>
        <div className="flex">
          {mascotas.map((mascota) => (
            <div key={mascota.id} className="flex-[0_0_100%] min-w-0">
              <Card className="overflow-hidden">
                <CardContent className="p-0 relative aspect-square">
                  <Image
                    src={mascota.imagen || "/placeholder.svg?height=500&width=500"}
                    alt={mascota.nombre}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-lg font-semibold text-white">{mascota.nombre}</h3>
                    <p className="text-sm text-white opacity-80">{mascota.especie}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Lista de mascotas en estilo bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mascotas.map((mascota) => (
          <motion.div
            key={mascota.id}
            layoutId={`pet-${mascota.id}`}
            onClick={() => setSelectedPet(mascota)}
            className="cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src={mascota.imagen || "/placeholder.svg?height=500&width=500"}
                    alt={mascota.nombre}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-white text-black">
                      {mascota.especie}
                    </Badge>
                  </div>
                </div>
                <div className={`p-4 bg-gradient-to-br ${colorSchemes[mascota.especie].from} ${colorSchemes[mascota.especie].to}`}>
                  <h3 className="text-xl font-bold text-white mb-2">{mascota.nombre}</h3>
                  <div className="flex items-center text-white text-sm mb-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    {mascota.fechaNacimiento?.toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-white text-sm mb-1">
                    <Heart className="w-4 h-4 mr-2" />
                    {mascota.sexo}
                  </div>
                  <div className="flex items-center text-white text-sm">
                    <Info className="w-4 h-4 mr-2" />
                    {mascota.raza || "No especificada"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal para mostrar detalles de la mascota seleccionada */}
      <AnimatePresence>
        {selectedPet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setSelectedPet(null)}
          >
            <motion.div
              layoutId={`pet-${selectedPet.id}`}
              className="bg-white rounded-lg overflow-hidden max-w-md w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 flex-shrink-0">
                <Image
                  src={selectedPet.imagen || "/placeholder.svg?height=500&width=500"}
                  alt={selectedPet.nombre}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={`p-6 bg-gradient-to-br ${colorSchemes[selectedPet.especie].from} ${colorSchemes[selectedPet.especie].to} text-white overflow-y-auto flex-grow`}>
                <h3 className="text-2xl font-bold mb-4">{selectedPet.nombre}</h3>
                <p className="mb-2"><strong>Especie:</strong> {selectedPet.especie}</p>
                <p className="mb-2"><strong>Raza:</strong> {selectedPet.raza || "No especificada"}</p>
                <p className="mb-2"><strong>Fecha de nacimiento:</strong> {selectedPet.fechaNacimiento?.toLocaleDateString()}</p>
                <p className="mb-2"><strong>Sexo:</strong> {selectedPet.sexo}</p>
                <p className="mb-2"><strong>Esterilizado:</strong> {selectedPet.esterilizado ? "Sí" : "No"}</p>
                <p className="mb-2"><strong>Alergias:</strong> {selectedPet.alergias || "Ninguna conocida"}</p>
                <p className="mb-2"><strong>Observaciones:</strong> {selectedPet.observaciones || "Ninguna"}</p>
              </div>
              <Button
                variant="secondary"
                className="m-4"
                onClick={() => setSelectedPet(null)}
              >
                Cerrar
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}