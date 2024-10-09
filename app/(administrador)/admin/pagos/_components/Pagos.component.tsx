'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, File, ListFilter, Search } from "lucide-react"
import { format } from 'date-fns'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"

import { obtenerPagos, obtenerTratamientoCompleto, obtenerResumenIngresos } from '@/actions/pagos'
import { PagoResumen, TratamientoDetallado, ResumenIngresos } from '@/types/pagos'

export function PaymentDashboard() {
  const [payments, setPayments] = useState<PagoResumen[]>([])
  const [selectedTreatment, setSelectedTreatment] = useState<TratamientoDetallado | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [resumenIngresos, setResumenIngresos] = useState<ResumenIngresos | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchPayments()
    fetchResumenIngresos()
  }, [])

  const fetchPayments = async () => {
    const result = await obtenerPagos()
    if (result.success && result.pagos) {
      setPayments(result.pagos)
    } else {
      console.error(result.error)
    }
  }

  const fetchResumenIngresos = async () => {
    const result = await obtenerResumenIngresos()
    if (result.success && result.resumen) {
      setResumenIngresos(result.resumen)
    } else {
      console.error(result.error)
    }
  }

  const handlePaymentClick = async (tratamientoId: number) => {
    const result = await obtenerTratamientoCompleto(tratamientoId)
    if (result.success && result.tratamiento) {
      setSelectedTreatment(result.tratamiento)
    } else {
      console.error(result.error)
    }
  }

  const filteredPayments = payments.filter(payment => {
    if (filter !== 'all' && payment.estado !== parseInt(filter)) return false
    if (searchTerm && !payment.id.toString().includes(searchTerm) && 
        !payment.mascotaNombre.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const getEstadoText = (estado: number) => {
    switch (estado) {
      case 1: return 'Pendiente'
      case 2: return 'En Proceso'
      case 3: return 'Completado'
      default: return 'Desconocido'
    }
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:h-auto sm:px-6">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por ID o mascota..."
                className="w-full rounded-lg bg-background pl-8 md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </header>
          <main className="grid flex-1 gap-4 p-4 md:gap-8 lg:grid-cols-7 lg:p-10">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-4 lg:grid-cols-2 xl:col-span-5 xl:grid-cols-5">
              <Card className="xl:col-span-3">
                <CardHeader>
                  <CardTitle>Resumen de Pagos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Semanal</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">Bs. {resumenIngresos?.totalSemanal.toString() || '0.00'}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Mensual</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">Bs. {resumenIngresos?.totalMensual.toString() || '0.00'}</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              <Card className="xl:col-span-5">
                <CardHeader>
                  
                  <CardTitle>Pagos Recientes</CardTitle>
                  <CardDescription>Lista de pagos recientes realizados en la veterinaria.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 pb-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="ml-auto">
                          <ListFilter className="mr-2 h-4 w-4" />
                          Filtrar
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filtrar por estado</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={filter === 'all'}
                          onCheckedChange={() => setFilter('all')}
                        >
                          Todos
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filter === '1'}
                          onCheckedChange={() => setFilter('1')}
                        >
                          Pendiente
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filter === '2'}
                          onCheckedChange={() => setFilter('2')}
                        >
                          En Proceso
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filter === '3'}
                          onCheckedChange={() => setFilter('3')}
                        >
                          Completado
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" onClick={() => {/* Implementar lógica de exportación */}}>
                      <File className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Mascota</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow
                          key={payment.id}
                          onClick={() => handlePaymentClick(payment.tratamientoId)}
                          className="cursor-pointer hover:bg-muted"
                        >
                          <TableCell>{payment.id}</TableCell>
                          <TableCell>{payment.mascotaNombre}</TableCell>
                          <TableCell>{payment.fechaPago ? format(new Date(payment.fechaPago), 'dd/MM/yyyy') : 'N/A'}</TableCell>
                          <TableCell>{getEstadoText(payment.estado)}</TableCell>
                          <TableCell className="text-right">Bs. {payment.total.toString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-3 xl:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Detalles del Tratamiento</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedTreatment ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Información del Pago</h3>
                        <p>ID: {selectedTreatment.pago.id}</p>
                        <p>Total: Bs. {selectedTreatment.pago.total.toString()}</p>
                        <p>Fecha: {selectedTreatment.pago.fechaPago ? format(new Date(selectedTreatment.pago.fechaPago), 'dd/MM/yyyy HH:mm') : 'N/A'}</p>
                        <p>Estado: {getEstadoText(selectedTreatment.pago.estado)}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Información de la Mascota</h3>
                        <p>Nombre: {selectedTreatment.mascota.nombre}</p>
                        <p>Especie: {selectedTreatment.mascota.especie}</p>
                        <p>Raza: {selectedTreatment.mascota.raza || 'N/A'}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Propietario</h3>
                        {selectedTreatment.propietario ? (
                          <>
                            <p>{selectedTreatment.propietario.name} {selectedTreatment.propietario.apellidoPat}</p>
                            <p>Email: {selectedTreatment.propietario.email || 'N/A'}</p>
                          </>
                        ) : (
                          <p>No se ha asignado un propietario</p>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">Servicios</h3>
                        <ul>
                          {selectedTreatment.servicios.map((servicio) => (
                            <li key={servicio.id}>{servicio.nombre} - Bs. {servicio.precioServicio.toString()}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold">Medicamentos</h3>
                        <ul>
                          {selectedTreatment.medicamentos.map((medicamento) => (
                            <li key={medicamento.id}>
                              {medicamento.nombre} - {medicamento.cantidad} unidades - Bs. {medicamento.costoUnitario.toString()} c/u
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p>Seleccione un pago para ver los detalles del tratamiento.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}