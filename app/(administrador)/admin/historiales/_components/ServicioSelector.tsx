// "use client"
// import React, { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { Search, ArrowUpDown, ArrowRight, Plus, X, ArrowBigLeftDash } from 'lucide-react'
// import { ServicioT } from '@/types'
// import { toast } from 'sonner'
// import { useTratamientoStore } from '@/store/tratamientoStore'
// import {
//   ContextMenu,
//   ContextMenuContent,
//   ContextMenuItem,
//   ContextMenuTrigger,
// } from "@/components/ui/context-menu"

// interface ServicioSelectorProps {
//   servicios: ServicioT[]
//   onSelectServicio: (servicio: ServicioT) => void
// }

// export default function ServicioSelector({ servicios, onSelectServicio }: ServicioSelectorProps) {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
//   const [sortBy, setSortBy] = useState<'nombre' | 'precio'>('nombre')
//   const [selectedServicio, setSelectedServicio] = useState<number | null>(null)

//   const { tratamiento, agregarServicio, eliminarServicio, servicioYaAgregado } = useTratamientoStore()

//   const filteredServicios = servicios.filter(servicio =>
//     servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     servicio.precio.includes(searchTerm)
//   )

//   const sortedServicios = [...filteredServicios].sort((a, b) => {
//     if (sortBy === 'nombre') {
//       return sortOrder === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)
//     } else {
//       return sortOrder === 'asc' ? parseFloat(a.precio) - parseFloat(b.precio) : parseFloat(b.precio) - parseFloat(a.precio)
//     }
//   })

//   const handleSort = (value: string) => {
//     if (value.includes('nombre')) {
//       setSortBy('nombre')
//     } else {
//       setSortBy('precio')
//     }
//     setSortOrder(value.includes('asc') ? 'asc' : 'desc')
//   }

//   const handleSelectServicio = (servicio: ServicioT) => {
//     if (selectedServicio === servicio.id) {
//       setSelectedServicio(null)
//     } else {
//       setSelectedServicio(servicio.id)
//     }
//   }

//   const handleAddServicio = (servicio: ServicioT) => {
//     const isAlreadyAdded = tratamiento.servicios.some(s => s.servicioId === servicio.id)
//     if (isAlreadyAdded) {
//       toast.warning(`El servicio "${servicio.nombre}" ya está agregado al tratamiento`)
//     } else {
//       agregarServicio({
//         precioServicio: servicio.precio,
//         servicioId: servicio.id,
//         servicio: servicio,
//       })
//       toast.success(`Servicio "${servicio.nombre}" agregado al tratamiento`)
//     }
//     setSelectedServicio(null)
//   }

//   return (
//     <Card className="mx-auto">
//       <CardHeader>
//         <CardTitle className="flex items-center justify-between flex-col">
//           <span className="text-2xl font-bold mb-2">Seleccionar Servicio</span>

//           <div className="flex items-center space-x-2 w-full">
//             <Input
//               type="text"
//               placeholder="Buscar servicio..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-4/6"
//             />
//             <Select onValueChange={handleSort}>
//               <SelectTrigger className="w-2/6">
//                 <SelectValue placeholder="Filtro" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="nombre_asc">Nombre (A-Z)</SelectItem>
//                 <SelectItem value="nombre_desc">Nombre (Z-A)</SelectItem>
//                 <SelectItem value="precio_asc">Precio (Menor a Mayor)</SelectItem>
//                 <SelectItem value="precio_desc">Precio (Mayor a Menor)</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[calc(100vh-200px)]">
//           <div className="grid grid-cols-1 gap-2">
//             {sortedServicios.map((servicio, index) => (
//               <ContextMenu key={servicio.id}>
//                 <ContextMenuTrigger>
//                   <Card
//                     className={`relative transition-all m-1 cursor-pointer ${
//                       selectedServicio === servicio.id ? 'ring-2 ring-primary' : ''
//                     }`}
//                     onClick={() => handleSelectServicio(servicio)}
//                   >
//                     <CardContent className="p-4">
//                       <p className="text-md font-semibold truncate mb-1">
//                         {index + 1}. {servicio.nombre}
//                       </p>
//                       <Textarea
//                         readOnly
//                         value={servicio.descripcion}
//                         className="resize-none text-sm bg-transparent border-0 focus:outline-none scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-transparent"
//                       />
//                       {selectedServicio === servicio.id && (
//                         <div
//                           className={`absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-gray-700 to-transparent transition-all duration-300 flex items-center justify-start pl-4 ${
//                             selectedServicio === servicio.id ? 'translate-x-0' : '-translate-x-full'
//                           }`}
//                         >
//                           <TooltipProvider>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   className="text-primary"
//                                   onClick={(e) => {
//                                     e.stopPropagation()
//                                     handleAddServicio(servicio)
//                                   }}
//                                 >
//                                   <ArrowBigLeftDash className="h-4 w-4 mr-2" />
//                                   Agregar
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>Agregar al tratamiento</p>
//                               </TooltipContent>
//                             </Tooltip>
//                           </TooltipProvider>
//                         </div>
//                       )}
//                       <p className="text-green-600 bg-gray-100 rounded-md text-end font-bold text-muted-foreground mt-1">Bs. {servicio.precio}</p>
//                     </CardContent>
//                   </Card>
//                 </ContextMenuTrigger>
//                 <ContextMenuContent>
//                   <ContextMenuItem onSelect={() => handleAddServicio(servicio)}>
//                     Agregar al tratamiento
//                   </ContextMenuItem>
//                   <ContextMenuItem>Ver detalles</ContextMenuItem>
//                   <ContextMenuItem>Editar servicio</ContextMenuItem>
//                 </ContextMenuContent>
//               </ContextMenu>
//             ))}
//           </div>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }



"use client"
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, ArrowUpDown, ArrowRight, Plus, X, ArrowBigLeftDash } from 'lucide-react'
import { ServicioT } from '@/types'
import { toast } from 'sonner'
import { useTratamientoStore } from '@/store/tratamientoStore'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { formatearFechaYHora } from '@/lib/formatearFecha'

interface ServicioSelectorProps {
  servicios: ServicioT[]
  onSelectServicio: (servicio: ServicioT) => void
}

export default function ServicioSelector({ servicios, onSelectServicio }: ServicioSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortBy, setSortBy] = useState<'nombre' | 'precio'>('nombre')
  const [selectedServicio, setSelectedServicio] = useState<number | null>(null)

  const { tratamiento, agregarServicio, eliminarServicio, servicioYaAgregado } = useTratamientoStore()

  const filteredServicios = servicios.filter(servicio =>
    servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.precio.includes(searchTerm)
  )

  const sortedServicios = [...filteredServicios].sort((a, b) => {
    if (sortBy === 'nombre') {
      return sortOrder === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)
    } else {
      return sortOrder === 'asc' ? parseFloat(a.precio) - parseFloat(b.precio) : parseFloat(b.precio) - parseFloat(a.precio)
    }
  })

  const handleSort = (value: string) => {
    if (value.includes('nombre')) {
      setSortBy('nombre')
    } else {
      setSortBy('precio')
    }
    setSortOrder(value.includes('asc') ? 'asc' : 'desc')
  }

  const handleSelectServicio = (servicio: ServicioT) => {
    if (selectedServicio === servicio.id) {
      setSelectedServicio(null)
    } else {
      setSelectedServicio(servicio.id)
    }
  }

  const handleAddServicio = (servicio: ServicioT) => {
    const isAlreadyAdded = tratamiento.servicios.some(s => s.servicioId === servicio.id)
    if (isAlreadyAdded) {
      toast.warning(`El servicio "${servicio.nombre}" ya está agregado al tratamiento`)
    } else {
      agregarServicio({
        precioServicio: servicio.precio,
        servicioId: servicio.id,
        servicio: servicio,
      })
      toast.success(`Servicio "${servicio.nombre}" agregado al tratamiento`)
    }
    setSelectedServicio(null)
  }

  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between flex-col">
          <span className="text-2xl font-bold mb-2">Seleccionar Servicio</span>

          <div className="flex items-center space-x-2 w-full">
            <Input
              type="text"
              placeholder="Buscar servicio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-4/6"
            />
            <Select onValueChange={handleSort}>
              <SelectTrigger className="w-2/6">
                <SelectValue placeholder="Filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nombre_asc">Nombre (A-Z)</SelectItem>
                <SelectItem value="nombre_desc">Nombre (Z-A)</SelectItem>
                <SelectItem value="precio_asc">Precio (Menor a Mayor)</SelectItem>
                <SelectItem value="precio_desc">Precio (Mayor a Menor)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 gap-1">
            {sortedServicios.map((servicio, index) => (
              <ContextMenu key={servicio.id}>
                <ContextMenuTrigger>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Card
                        className={`relative transition-all m-1 cursor-pointer ${
                          selectedServicio === servicio.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => handleSelectServicio(servicio)}
                      >
                        <CardContent className="p-4">
                          <p className="text-md font-semibold mb-1">
                            {index + 1}. {servicio.nombre}
                          </p>
                          <Textarea
                            readOnly
                            value={servicio.descripcion}
                            className="resize-none text-sm bg-transparent border-0 focus:outline-none scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-transparent"
                          />
                          {selectedServicio === servicio.id && (
                            <div
                              className={`absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-gray-700 to-transparent transition-all duration-300 flex items-center justify-start pl-4 ${
                                selectedServicio === servicio.id ? 'translate-x-0' : '-translate-x-full'
                              }`}
                            >
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-primary"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleAddServicio(servicio)
                                      }}
                                    >
                                      <ArrowBigLeftDash className="h-4 w-4 mr-2" />
                                      Agregar
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Agregar al tratamiento</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          )}
                          <div className='flex justify-end'>
                            <p className="text-green-600 text-lg bg-gray-100 rounded-md font-bold text-muted-foreground mt-1 w-fit px-2">Bs. {servicio.precio}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80" side="left">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">{servicio.nombre}</h4>
                          <p className="text-sm">{servicio.descripcion}</p>
                          <div className="flex items-center pt-2">
                            <span className="text-xs text-muted-foreground">
                              Creado el: {formatearFechaYHora(servicio.creadoEn)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onSelect={() => handleAddServicio(servicio)}>
                    Agregar al tratamiento
                  </ContextMenuItem>
                  <ContextMenuItem>Ver detalles</ContextMenuItem>
                  <ContextMenuItem>Editar servicio</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}