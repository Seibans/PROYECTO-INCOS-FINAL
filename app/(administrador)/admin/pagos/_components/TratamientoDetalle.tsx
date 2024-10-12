"use client"
import { useState, useEffect } from 'react'
import { obtenerTratamientoCompleto } from '@/actions/pagos'
import { TratamientoCompleto } from '@/types/pagos'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { generarPDFTratamiento } from '@/actions/pagoPdf'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Stamp,
  Truck,
  Users2,
} from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { FaMoneyBill } from 'react-icons/fa'

interface TratamientoDetalleProps {
  tratamientoId: number
}

export function TratamientoDetalle({ tratamientoId }: TratamientoDetalleProps) {
  const [tratamiento, setTratamiento] = useState<TratamientoCompleto | null>(null)

  useEffect(() => {
    fetchTratamiento()
  }, [tratamientoId])

  const fetchTratamiento = async () => {
    const result = await obtenerTratamientoCompleto(tratamientoId)
    setTratamiento(result)
  }

  const handleExportPDF = async () => {
    if (tratamiento) {
      const pdfUrl = await generarPDFTratamiento(tratamiento.id)
      window.open(pdfUrl, '_blank')
    }
  }

  if (!tratamiento) return null

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="text-lg">Tratamiento {tratamiento.id}</CardTitle>
          <CardDescription>Fecha: {tratamiento.fechaCreacion.toLocaleDateString()}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Completar Pago
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>
                <Button onClick={handleExportPDF} size="sm" variant="outline">Exportar PDF</Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Borrar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Detalles del Tratamiento</div>
          <div>{tratamiento.descripcion}</div>
          <div>Diagnóstico: {tratamiento.diagnostico}</div>
          <Separator className="my-2" />
          <div className="font-semibold">Servicios</div>
          <ul className="grid gap-3">
            {tratamiento.servicios.map(servicio => (
              <li key={servicio.id} className="flex items-center justify-between">
                <span>{servicio.nombre}</span>
                <span>Bs. {servicio.precio.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <div className="font-semibold">Medicamentos</div>
          <ul className="grid gap-3">
            {tratamiento.medicamentos.map(medicamento => (
              <li key={medicamento.id} className="flex items-center justify-between">
                <span>{medicamento.nombre} x {medicamento.cantidad}</span>
                <span>Bs. {medicamento.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal Servicios</span>
              <span>Bs. {tratamiento.sumaTotalServicios.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal Medicamentos</span>
              <span>Bs. {tratamiento.sumaTotalMedicamentos.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>Bs. {(tratamiento.sumaTotalServicios + tratamiento.sumaTotalMedicamentos).toFixed(2)}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Información de Mascota</div>
          <div>
            <div>{tratamiento.mascota.nombre}</div>
            <div>{tratamiento.mascota.especie} - {tratamiento.mascota.raza || 'No especificada'}</div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Información del Propietario</div>
          {tratamiento.propietario ? (
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Cliente:</dt>
                <dd>{tratamiento.propietario.nombre} {tratamiento.propietario.apellidoPat} {tratamiento.propietario.apellidoMat}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Email:</dt>
                <dd>
                  <a href="mailto:"> {tratamiento.propietario.email || 'No especificado'}</a>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Celular:</dt>
                <dd>
                  <a href="tel:">{tratamiento.propietario.celular || 'No especificado'}</a>
                </dd>
              </div>
            </dl>
          ) : (
            <div>No hay información del propietario</div>
          )}
        </div>
        {tratamiento.pago && (
          <>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Información de Pago</div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1 text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  Metodo:
                </dt>
                <dd>{tratamiento.pago.metodoPago || 'No especificado'}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Fecha:
                </dt>
                <dd>{tratamiento.pago.fechaPago?.toLocaleDateString() || 'No pagado'}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1 text-muted-foreground">
                  <Stamp className="h-4 w-4" />
                  Estado:
                </dt>
                <dd>{tratamiento.pago.estado === 2 ? 'Pagado' : 'Pendiente'}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1 text-muted-foreground">
                  <FaMoneyBill className="h-4 w-4" />
                  Total:
                </dt>
                <dd>Bs. {tratamiento.pago.total.toFixed(2)}</dd>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Actualizado En {tratamiento.fechaActualizacion?.toLocaleDateString()}
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Pago Anterior</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Siguiente Pago</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  )
}