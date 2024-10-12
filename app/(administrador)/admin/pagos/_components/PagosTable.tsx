import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PagoResumen } from "@/types/pagos"
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  File,
  ListFilter,
} from "lucide-react"

interface PagosTableProps {
  pagos: PagoResumen[]
  onPagoClick: (tratamientoId: number) => void
}

export function PagosTable({ pagos, onPagoClick }: PagosTableProps) {
  const getEstadoBadge = (estado: number) => {
    switch (estado) {
      case 1:
        return <Badge variant="secondary">Pendiente</Badge>
      case 2:
        return <Badge variant="default">Pagado</Badge>
      case 0:
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  return (
    <Tabs defaultValue="semana">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="semana">Semana</TabsTrigger>
          <TabsTrigger value="mes">Mes</TabsTrigger>
          <TabsTrigger value="anio">Año</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1 text-sm"
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filtro</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Todos
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Pendiente
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                En Proceso
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Completado
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-sm"
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Exportar</span>
          </Button>
        </div>
      </div>
      <TabsContent value="semana">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Pagos</CardTitle>
            <CardDescription>
              Pagos Recientes en el Sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Mascota</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagos.map((pago) => (
                  <TableRow key={pago.id} onClick={() => onPagoClick(pago.tratamientoId)} className="cursor-pointer">
                    <TableCell>{pago.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{pago.usuarioNombreCompleto || 'N/A'}</div>
                      <div className="text-sm text-muted-foreground md:inline">{pago.usuarioEmail || 'N/A'}</div>
                    </TableCell>
                    <TableCell>{pago.mascotaNombre || 'N/A'}</TableCell>
                    <TableCell>{getEstadoBadge(pago.estado)}</TableCell>
                    <TableCell>{pago.fechaPago?.toLocaleDateString() || 'N/A'}</TableCell>
                    <TableCell className="text-right">Bs. {pago.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}