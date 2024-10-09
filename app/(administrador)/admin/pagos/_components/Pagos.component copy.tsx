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

import { obtenerPagos, obtenerTratamientoCompleto } from '@/actions/pagos'

export function PaymentDashboard() {
  const [payments, setPayments] = useState([])
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [treatmentDetails, setTreatmentDetails] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    const result = await obtenerPagos()
    if (result.success) {
      setPayments(result.pagos)
    } else {
      console.error(result.error)
    }
  }

  const handlePaymentClick = async (paymentId) => {
    const result = await obtenerTratamientoCompleto(paymentId)
    if (result.success) {
      setSelectedPayment(result.pago)
      setTreatmentDetails(result.tratamiento)
    } else {
      console.error(result.error)
    }
  }

  const filteredPayments = payments.filter(payment => {
    if (filter !== 'all' && payment.estado !== filter) return false
    if (searchTerm && !payment.id.toString().includes(searchTerm) && 
        !payment.mascota.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const calculateTotalAmount = (period) => {
    const now = new Date()
    const filteredPayments = payments.filter(payment => {
      const paymentDate = new Date(payment.fechaPago)
      if (period === 'week') {
        return paymentDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
      } else if (period === 'month') {
        return paymentDate >= new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
      }
      return true
    })
    return filteredPayments.reduce((total, payment) => total + parseFloat(payment.total), 0).toFixed(2)
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
                        <div className="text-2xl font-bold">Bs. {calculateTotalAmount('week')}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Mensual</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">Bs. {calculateTotalAmount('month')}</div>
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
                          checked={filter === 1}
                          onCheckedChange={() => setFilter(1)}
                        >
                          Pagado
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filter === 2}
                          onCheckedChange={() => setFilter(2)}
                        >
                          Pendiente
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
                          onClick={() => handlePaymentClick(payment.id)}
                          className="cursor-pointer hover:bg-muted"
                        >
                          <TableCell>{payment.id}</TableCell>
                          <TableCell>{payment.mascota}</TableCell>
                          <TableCell>{format(new Date(payment.fechaPago), 'dd/MM/yyyy')}</TableCell>
                          <TableCell>{payment.estado === 1 ? 'Pagado' : 'Pendiente'}</TableCell>
                          <TableCell className="text-right">Bs. {payment.total}</TableCell>
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
                  {selectedPayment && treatmentDetails ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Información del Pago</h3>
                        <p>ID: {selectedPayment.id}</p>
                        <p>Total: Bs. {selectedPayment.total}</p>
                        <p>Fecha: {format(new Date(selectedPayment.fechaPago), 'dd/MM/yyyy HH:mm')}</p>
                        <p>Estado: {selectedPayment.estado === 1 ? 'Pagado' : 'Pendiente'}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Información de la Mascota</h3>
                        <p>Nombre: {treatmentDetails.mascota.nombre}</p>
                        <p>Especie: {treatmentDetails.mascota.especie}</p>
                        <p>Raza: {treatmentDetails.mascota.raza}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Propietario</h3>
                        <p>{treatmentDetails.propietario.nombre} {treatmentDetails.propietario.apellidoPat}</p>
                        <p>Email: {treatmentDetails.propietario.email}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Servicios</h3>
                        <ul>
                          {treatmentDetails.servicios.map((servicio) => (
                            <li key={servicio.id}>{servicio.nombre} - Bs. {servicio.precioServicio}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold">Medicamentos</h3>
                        <ul>
                          {treatmentDetails.medicamentos.map((medicamento) => (
                            <li key={medicamento.id}>
                              {medicamento.nombre} - {medicamento.cantidad} unidades - Bs. {medicamento.costoUnitario} c/u
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