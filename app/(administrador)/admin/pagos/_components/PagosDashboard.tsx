"use client"
import { useState, useEffect } from 'react'
import { obtenerPagos, obtenerResumenIngresos } from '@/actions/pagos'
import { PagoResumen, ResumenIngresos } from '@/types/pagos'
import { ResumenIngresosCard } from './ResumenIngresosCard'
import { PagosTable } from './PagosTable'
import { TratamientoDetalle } from './TratamientoDetalle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import {
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
  Truck,
  Users2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"


export function PagosDashboard() {
  const [pagos, setPagos] = useState<PagoResumen[]>([])
  const [resumenIngresos, setResumenIngresos] = useState<ResumenIngresos | null>(null)
  const [selectedTratamientoId, setSelectedTratamientoId] = useState<number | null>(null)

  useEffect(() => {
    fetchPayments()
    fetchResumenIngresos()
  }, [])

  const fetchPayments = async () => {
    const result = await obtenerPagos()
    setPagos(result)
  }

  const fetchResumenIngresos = async () => {
    const result = await obtenerResumenIngresos()
    setResumenIngresos(result)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Datos Generales</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Pagos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Pagos Recientes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Pagos Recientes</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Lista de Pagos Recientes en el Sistema.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Registrar Nuevo Pago</Button>
                </CardFooter>
              </Card>
              {resumenIngresos && (
                <>
                  <ResumenIngresosCard
                    title="Esta Semana"
                    amount={resumenIngresos.ingresoSemanal}
                    percentage={resumenIngresos.porcentajeCambioSemanal}
                  />
                  <ResumenIngresosCard
                    title="Este Mes"
                    amount={resumenIngresos.ingresoMensual}
                    percentage={resumenIngresos.porcentajeCambioMensual}
                  />
                </>
              )}
            </div>
            <PagosTable pagos={pagos} onPagoClick={setSelectedTratamientoId} />
          </div>
          <div>
            {selectedTratamientoId && (
              <TratamientoDetalle tratamientoId={selectedTratamientoId} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}