'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Calendar, Syringe, ChevronLeft, ChevronRight, Plus, ArrowRight, Filter } from 'lucide-react'
import { HistorialMedicoVistaT } from "@/types"
import { formatearFechaYHora } from '@/lib/formatearFecha'
import { formatearPrecio } from '@/lib/formatearPrecio'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TablaHistorialesProps {
  data: HistorialMedicoVistaT[]
}

export function TablaHistoriales({ data }: TablaHistorialesProps) {
  const [pagina, setPagina] = useState(1)
  const [busqueda, setBusqueda] = useState('')
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState<HistorialMedicoVistaT | null>(null)
  const [filtroEspecie, setFiltroEspecie] = useState<string | null>(null)
  const [filtroSexo, setFiltroSexo] = useState<string | null>(null)
  const [filtroEstado, setFiltroEstado] = useState<number | null>(null)

  const mascotasPorPagina = 12

  const filteredData = useMemo(() => {
    return data.filter((historial) => {
      const matchBusqueda = 
        historial.nombreMascota.toLowerCase().includes(busqueda.toLowerCase()) ||
        historial.nombrePropietario?.toLowerCase().includes(busqueda.toLowerCase()) ||
        historial.emailPropietario?.toLowerCase().includes(busqueda.toLowerCase()) ||
        historial.celularPropietario?.includes(busqueda) ||
        historial.direccionPropietario?.toLowerCase().includes(busqueda.toLowerCase());

      const matchEspecie = !filtroEspecie || historial.especieMascota === filtroEspecie;
      const matchSexo = !filtroSexo || historial.sexoMascota === filtroSexo;
      const matchEstado = filtroEstado === null || historial.estadoMascota === filtroEstado;

      return matchBusqueda && matchEspecie && matchSexo && matchEstado;
    });
  }, [data, busqueda, filtroEspecie, filtroSexo, filtroEstado]);

  const totalPaginas = Math.ceil(filteredData.length / mascotasPorPagina)
  const inicio = (pagina - 1) * mascotasPorPagina
  const fin = Math.min(inicio + mascotasPorPagina, filteredData.length)
  const mascotas = filteredData.slice(inicio, fin)

  const cambiarPagina = (nuevaPagina: number) => {
    setPagina(nuevaPagina)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Historial Médico de Mascotas</h1>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mb-6">
        <Input
          type="text"
          placeholder="Buscar mascota, propietario, email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-grow"
        />
        <Select onValueChange={(value) => setFiltroEspecie(value === 'Todos' ? null : value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por especie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            <SelectItem value="Perro">Perro</SelectItem>
            <SelectItem value="Gato">Gato</SelectItem>
            <SelectItem value="Otro">Otro</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setFiltroSexo(value === 'Todos' ? null : value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por sexo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            <SelectItem value="Macho">Macho</SelectItem>
            <SelectItem value="Hembra">Hembra</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setFiltroEstado(value === 'Todos' ? null : Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            <SelectItem value="1">Activo</SelectItem>
            <SelectItem value="0">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mascotas.map((historial) => (
          <Card key={historial.historialMascotaId} className="flex flex-col justify-between hover:shadow-lg transition-shadow relative">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={historial.imagenMascota || '/placeholder.svg'} alt={historial.nombreMascota} />
                  <AvatarFallback>{historial.nombreMascota[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{historial.nombreMascota}</h2>
                  <p className="text-sm text-muted-foreground">{historial.especieMascota} - {historial.razaMascota}</p>
                  <p className="text-sm text-muted-foreground">{historial.sexoMascota}</p>
                  <Badge variant={historial.estadoMascota === 1 ? "success" : "destructive"}>
                    {historial.estadoMascota === 1 ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm"><strong>Propietario:</strong> {historial.nombrePropietario}</p>
                <p className="text-sm"><strong>Email:</strong> {historial.emailPropietario}</p>
                <p className="text-sm"><strong>Celular:</strong> {historial.celularPropietario}</p>
                <p className="text-sm"><strong>Dirección:</strong> {historial.direccionPropietario}</p>
              </div>
              <Badge variant="secondary" className="mt-2">
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
