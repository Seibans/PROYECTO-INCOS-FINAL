// "use client";
// import * as React from "react";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { ArrowUpDown, ChevronDown, Eye, MoreHorizontal, Pencil } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Link from "next/link";
// import Image from "next/image";

// import { formatearFecha, formatearFechaYHora } from "@/lib/formatearFecha"
// import { ServicioT } from "@/types";
// import { formatearPrecio } from "@/lib/formatearPrecio";
// import { LightboxComponent } from '@/components/global/CustomLightbox';
// import { Textarea } from "../ui/textarea";

// interface DataTableProps {
//   data: ServicioT[];
// }

// export function TablaServicios({ data }: DataTableProps) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
//   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

//   const [isMounted, setIsMounted] = React.useState(false);

//   const [servicioSeleccionado, setServicioSeleccionado] = React.useState<ServicioT | null>(null);

//   const [openLightbox, setOpenLightbox] = React.useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

//   React.useEffect(() => {
//     setIsMounted(true);
//   }, []);


//   const handleImageClick = (index: number) => {
//     setCurrentImageIndex(index);
//     setOpenLightbox(true);
//   };

//   const columns: ColumnDef<ServicioT>[] = [
//     {
//       id: "nro",
//       header: ({ column }) => (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Nro.
//           <ArrowUpDown className="ml-2 h-3 w-4" />
//         </Button>
//       ),
//       cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
//     },
//     {
//       accessorKey: "nombre",
//       header: ({ column }) => (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Nombre
//           <ArrowUpDown className="ml-2 h-3 w-4" />
//         </Button>
//       ),
//       cell: ({ row }) => <div>{row.getValue("nombre")}</div>,
//     },
//     {
//       accessorKey: "descripcion",
//       header: () => <div className="">Descripción</div>,
//       cell: ({ row }) => (
//         <div className="text-center font-medium h-auto w-56 whitespace-normal overflow-hidden text-ellipsis">
//           {/* <Textarea> */}
//           {row.getValue("descripcion")}
//           {/* </Textarea> */}
//         </div>
//       ),
//     },
//     {
//       accessorKey: "precio",
//       header: () => <div className="text-left">Precio</div>,
//       cell: ({ row }) => (
//         <div className="text-left font-medium">{formatearPrecio(row.getValue("precio"))}</div>
//       ),
//     },
//     {
//       id: "actions",
//       header: "Acciones",
//       enableHiding: false,
//       cell: ({ row }) => {
//         const { id } = row.original;
//         return (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <span className="sr-only">Abrir Menu</span>
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Acciones</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <Link href={`/admin/servicios/${id}`}>
//                 <DropdownMenuItem>
//                   <Pencil className="w-4 h-4 mr-2" />Editar Datos
//                 </DropdownMenuItem>
//               </Link>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => setServicioSeleccionado(row.original)}>
//                 <Eye className="w-4 h-4 mr-2" /> Ver detalles del Servicio
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => navigator.clipboard.writeText(`${id}`)}>
//                 Copiar Id del Servicio
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         );
//       },
//     },
//   ];

//   const table = useReactTable<ServicioT>({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     getPaginationRowModel: getPaginationRowModel(),
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//     },
//   });

//   if (!isMounted) return null;

//   return (
//     <>
//       <div className="p-4 bg-background shadow-md rounded-lg mt-4 w-full">
//         <div className="flex items-center mb-2">
//           <Input
//             placeholder="Filtrar Servicio"
//             value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
//             onChange={(event) =>
//               table.getColumn("nombre")?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Columnas<ChevronDown className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table.getAllColumns().map((column) => (
//                 <DropdownMenuCheckboxItem
//                   key={column.id}
//                   className="capitalize"
//                   checked={column.getIsVisible()}
//                   onCheckedChange={(value) =>
//                     column.toggleVisibility(!!value)
//                   }
//                 >
//                   {column.id}
//                 </DropdownMenuCheckboxItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>

//           <TableBody>
//             {table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} className="h-24 text-center">
//                   No hay Servicios Registrados
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <div className="space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Anterior
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Siguiente
//           </Button>
//         </div>
//       </div>

//       <Dialog open={!!medicamentoSeleccionado} onOpenChange={() => setMedicamentoSeleccionado(null)}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogTitle>{medicamentoSeleccionado?.nombre} {medicamentoSeleccionado?.precio}</DialogTitle>
//           <DialogHeader>
//             <DialogDescription>
//               <p>Precio: {medicamentoSeleccionado?.precio}</p>
//               <p>Stock: {medicamentoSeleccionado?.stock}</p>
//               <p>Estado: {medicamentoSeleccionado?.estado === 1 ? "Activo" : "Eliminado"}</p>
//               <p>Tipo: {medicamentoSeleccionado?.tipo}</p>
//               <div>
//                 <div className="">Creado en:</div>
//                 <div className="">{formatearFechaYHora(medicamentoSeleccionado?.creadoEn)}</div>
//                 <div className="">Actualizado en:</div>
//                 <div className="">{formatearFechaYHora(medicamentoSeleccionado?.actualizadoEn)}</div>
//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>

//     </>
//   );
// }




"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatearPrecio } from "@/lib/formatearPrecio";
import { ServicioT } from "@/types";
import { FormServicioGlobal } from "@/app/(administrador)/admin/servicios/_components/FormServicioGlobal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deshabilitarServicio } from '@/actions/servicios'
import { formatearFecha, formatearFechaYHora } from "@/lib/formatearFecha"
import Link from "next/link";
import { Textarea } from "../ui/textarea";


interface DataTableProps {
  data: ServicioT[];
}

export function TablaServicios({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const [isMounted, setIsMounted] = React.useState(false);

  const [servicioDetalles, setServicioDetalles] = React.useState<ServicioT | null>(null);
  const [servicioEditar, setServicioEditar] = React.useState<ServicioT | null>(null);
  const [servicioIdEliminar, setServicioIdEliminar] = React.useState<number | null>(null);

  const router = useRouter();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);


  // Función para deshabilitar un servicio
  const onDeshabilitarServicio = async (id: number) => {
    try {
      await toast.promise(deshabilitarServicio(id), {
        loading: "Cargando...",
        success: (data) => {
          if (data.error) {
            throw new Error(data.error);
          } else {
            router.refresh();
            return `${data.success}`;
          }
        },
        error: (error) => error.message,
      });
    } catch (error) {
      // Manejo de errores adicionales
    }
  };


  const columns: ColumnDef<ServicioT>[] = [
    {
      id: "nro",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nro.
          <ArrowUpDown className="ml-2 h-3 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
      accessorKey: "nombre",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-3 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("nombre")}</div>,
    },
    {
      accessorKey: "descripcion",
      header: () => <div className="">Descripción</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium h-auto w-56 whitespace-normal overflow-hidden text-ellipsis">
          {row.getValue("descripcion")}
        </div>
      ),
    },
    {
      accessorKey: "precio",
      header: () => <div className="text-left">Precio</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium">{formatearPrecio(row.getValue("precio"))}</div>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      enableHiding: false,
      cell: ({ row }) => {
        const servicio = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir Menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/admin/servicios/${servicio.id}`}>
                <DropdownMenuItem>
                  <Pencil className="w-4 h-4 mr-2" />Editar Externo
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setServicioDetalles(servicio)}>
                <Eye className="w-4 h-4 mr-2" /> Ver detalles del Servicio
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setServicioEditar(servicio)}>
                <Pencil className="w-4 h-4 mr-2" /> Editar Servicio
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                setServicioIdEliminar(servicio.id);
              }}>
                <Trash className="w-4 h-4 mr-2" /> Eliminar Servicio
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(`${servicio.id}`)}>
                Copiar Id del Servicio
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable<ServicioT>({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  if (!isMounted) return null;

  return (
    <>
      <div className="p-4 bg-background shadow-md rounded-lg mt-4 w-full">
        <div className="flex items-center mb-2">
          <Input
            placeholder="Filtrar Servicio"
            value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("nombre")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columnas<ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay Servicios Registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>


      {/* Diálogo para ver detalles */}
      <Dialog open={!!servicioDetalles} onOpenChange={() => setServicioDetalles(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>{servicioDetalles?.nombre}</DialogTitle>
          <DialogHeader>
            <DialogDescription>
              {servicioDetalles && (
                <>
                  <p>Precio: {formatearPrecio(servicioDetalles.precio)}</p>
                  <p>Estado: {servicioDetalles.estado === 1 ? "Activo" : "Eliminado"}</p>
                  <p>Descripción: {servicioDetalles.descripcion}</p>
                  <div>
                    <div>Creado en:</div>
                    <div>{formatearFechaYHora(servicioDetalles.creadoEn)}</div>
                    <div>Actualizado en:</div>
                    <div>{formatearFechaYHora(servicioDetalles.actualizadoEn)}</div>
                  </div>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar */}
      <Dialog open={!!servicioEditar} onOpenChange={() => setServicioEditar(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Servicio</DialogTitle>
          </DialogHeader>
          {servicioEditar && (
            <FormServicioGlobal
              servicio={servicioEditar}
              setabrirModal={() => setServicioEditar(null)}
            />
          )}
        </DialogContent>
      </Dialog>


      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog open={!!servicioIdEliminar} onOpenChange={() => setServicioIdEliminar(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar Servicio?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción es irreversible. ¿Está seguro de que desea eliminar el servicio?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setServicioIdEliminar(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (servicioIdEliminar) {
                  onDeshabilitarServicio(servicioIdEliminar);
                  setServicioIdEliminar(null);
                }
              }}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}