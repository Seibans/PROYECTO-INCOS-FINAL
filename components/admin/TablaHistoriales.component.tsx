'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Calendar, Syringe, ChevronLeft, ChevronRight, Plus, ArrowRight } from 'lucide-react'
import { HistorialMedicoVistaT } from "@/types"
import { formatearFechaYHora } from '@/lib/formatearFecha'
import { formatearPrecio } from '@/lib/formatearPrecio'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TablaHistorialesProps {
  data: HistorialMedicoVistaT[]
}

export function TablaHistoriales({ data }: TablaHistorialesProps) {
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(Math.ceil(data.length / 12))
  const [cargando, setCargando] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState<HistorialMedicoVistaT | null>(null)

  const filteredData = data.filter((historial) =>
    historial.nombreMascota.toLowerCase().includes(busqueda.toLowerCase())
  )

  const mascotasPorPagina = 12
  const inicio = (pagina - 1) * mascotasPorPagina
  const fin = Math.min(inicio + mascotasPorPagina, filteredData.length)
  const mascotas = filteredData.slice(inicio, fin)

  const handleBusqueda = () => {
    setPagina(1)
  }

  const cambiarPagina = (nuevaPagina: number) => {
    setPagina(nuevaPagina)
    window.scrollTo(0, 0)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Historial Médico de Mascotas</h1>
      <div className="flex items-center space-x-2 mb-6">
        <Input
          type="text"
          placeholder="Buscar mascota..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleBusqueda}>
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mascotas.map((historial) => (
          <Card key={historial.historialMascotaId} className="flex flex-col justify-between hover:shadow-lg transition-shadow relative">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={historial.imagenMascota || '/placeholder.svg'} alt={historial.nombreMascota} />
                  <AvatarFallback>{historial.nombreMascota[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{historial.nombreMascota}</h2>
                  <p className="text-sm text-muted-foreground">{historial.especieMascota} - {historial.razaMascota}</p>
                </div>
              </div>
              <Badge variant="secondary" className="mb-2">
                {historial.tratamientos.length} tratamiento(s)
              </Badge>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button onClick={() => setMascotaSeleccionada(historial)}>
                Ver detalles
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`/admin/historiales/${historial.historialMascotaId}`} passHref>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Agregar tratamiento</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        ))}
      </div>
      {cargando && <p className="text-center mt-4">Cargando historiales...</p>}
      <div className="flex justify-center items-center space-x-2 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => cambiarPagina(Math.max(1, pagina - 1))}
          disabled={pagina === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>
          Página {pagina} de {totalPaginas}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => cambiarPagina(Math.min(totalPaginas, pagina + 1))}
          disabled={pagina === totalPaginas}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <Dialog open={!!mascotaSeleccionada} onOpenChange={() => setMascotaSeleccionada(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{mascotaSeleccionada?.nombreMascota}</DialogTitle>
            <DialogDescription>
              {mascotaSeleccionada?.especieMascota} - {mascotaSeleccionada?.razaMascota}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] w-full rounded-md border px-4">
            <Accordion type="single" collapsible className="w-full">
              {mascotaSeleccionada?.tratamientos.map((tratamiento) => (
                <AccordionItem key={tratamiento.id} value={tratamiento.id.toString()}>
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatearFechaYHora(tratamiento.creadoEn)}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">{tratamiento.descripcion}</p>
                    {/* <Badge variant="outline" className="mb-2">{`Precio: ${formatearPrecio(tratamiento.precio)} `}</Badge> */}
                    <div className="flex justify-end">
                      <Link href={`/admin/historiales/${mascotaSeleccionada.historialMascotaId}?tratamientoId=${tratamiento.id}`} passHref>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Ir al tratamiento
                        </Button>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}