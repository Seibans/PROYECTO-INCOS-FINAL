// "use client"

// import * as React from "react"
// // import {
// //   CaretSortIcon,
// //   ChevronDownIcon,
// //   DotsHorizontalIcon,
// // } from "@radix-ui/react-icons"
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
// } from "@tanstack/react-table"

// import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// import Link from "next/link";
// import Image from "next/image";

// import { User } from "@prisma/client";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
// import { UsuarioT } from "@/types";
// import { formatearFecha, formatearFechaYHora } from "@/lib/formatearFecha";

// export const columns: ColumnDef<UsuarioT>[] = [
//   {
//     accessorKey: "image",
//     header: "Foto",
//     cell: ({ row }) => {
//       const imagen = row.getValue("image");

//       return (
//         <div className="px-3">
//           <Image
//             src={typeof imagen === 'string' ? imagen : "/images/imagen-gato.png"}
//             alt="Imagen del usuario"
//             width={30}
//             height={30}
//           // className="h-auto w-auto"
//           />
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "name",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Nombre Completo
//           <ArrowUpDown className="ml-2 h-3 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => {
//       const { name, apellidoPat, apellidoMat } = row.original;
//       return <div>{`${name} ${apellidoPat ? apellidoPat : ""} ${apellidoMat ? apellidoMat : ""}`}</div>;
//     }
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Email
//           <ArrowUpDown className="ml-2 h-3 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => <div>{row.getValue("email")}</div>,
//   },
//   {
//     accessorKey: "celular",
//     header: () => <div className="text-center">Nro: Celular</div>,
//     cell: ({ row }) => {
//       const nombre = row.getValue("name");

//       if (row.getValue("celular") === null) {
//         return <div className="text-center">No tiene celular</div>;
//       } else {
//         const whatsappLink = `https://wa.me/${row.getValue("celular")}?text=Hola%20${nombre},%20me%20interesa%20contactarte%20de%20la%20veterinaria%20Gamaliel.`;

//         return (
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <div className="w-full flex justify-center">
//                   <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
//                     <Button variant="whatsapp">
//                       <FaWhatsapp className="h-5 w-5" />
//                     </Button>
//                   </Link>
//                 </div>
//               </TooltipTrigger>
//               <TooltipContent className="bg-[#43da57]">
//                 <p>Enviar Mensaje a</p>
//                 <p>Con Celular: <span className="font-bold"> {row.getValue("celular")}</span></p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         );
//       }
//     },
//   },
//   {
//     accessorKey: "createdAt",
//     header: () => <div className="text-center">Creado en:</div>,
//     cell: ({ row }) => <div>{formatearFechaYHora(row.getValue("createdAt"))}</div>,
//   },
//   {
//     accessorKey: "updatedAt",
//     header: () => <div className="text-center">Actualizado en:</div>,
//     cell: ({ row }) => <div>{formatearFechaYHora(row.getValue("updatedAt"))}</div>,
//   },
//   {
//     id: "actions",
//     header: "Acciones",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const { id } = row.original;
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Abrir Menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Acciones</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <Link href={`/admin/usuarios/${id}`}>
//               <DropdownMenuItem className="cursor-pointer">
//                 <Pencil className="w-4 h-4 mr-2" />Editar Datos
//               </DropdownMenuItem>
//             </Link>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Ver detalles del Usuario</DropdownMenuItem>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(`${id}`)}
//             >
//               Copiar Id del Usuario
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

// interface DataTableProps<TData> {
//   data: TData[];
// }

// export function TablaUsuarios({
//   data
// }: DataTableProps<UsuarioT>) {
//   const [sorting, setSorting] = React.useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   )
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({})
//   // const [rowSelection, setRowSelection] = React.useState({})
//   const [isMounted, setIsMounted] = React.useState(false);

//   React.useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const table = useReactTable<UsuarioT>({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     // onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       // rowSelection,
//     },
//   });

//   if (!isMounted) return null;

//   return (
//     <div className="p-4 bg-background shadow-md rounded-lg mt-4 w-full">
//       <div className="flex items-center py-4">
//         <Input
//           placeholder="Filtrar Usuarios"
//           value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
//           onChange={(event) =>
//             table.getColumn("name")?.setFilterValue(event.target.value)
//           }
//           className="max-w-sm"
//         />
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="ml-auto">
//               Columnas<ChevronDown className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => {
//                 return (
//                   <DropdownMenuCheckboxItem
//                     key={column.id}
//                     className="capitalize"
//                     checked={column.getIsVisible()}
//                     onCheckedChange={(value) =>
//                       column.toggleVisibility(!!value)
//                     }
//                   >
//                     {column.id}
//                   </DropdownMenuCheckboxItem>
//                 )
//               })}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                     </TableHead>
//                   )
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                 // data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No hay Usuarios.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         {/* <div className="flex-1 text-sm text-muted-foreground">
//             {table.getFilteredSelectedRowModel().rows.length} of{" "}
//             {table.getFilteredRowModel().rows.length} row(s) selected.
//           </div> */}
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
//     </div>
//   )
// }
























































// "use client"

// import * as React from "react"
// import {
//   ColumnDef,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   ColumnFiltersState
// } from "@tanstack/react-table"
// import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil } from "lucide-react"
// import { FaWhatsapp } from "react-icons/fa"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import Link from "next/link"
// import Image from "next/image"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
// import { UsuarioT } from "@/types"
// import { formatearFechaYHora } from "@/lib/formatearFecha"

// export const columns: ColumnDef<UsuarioT>[] = [
//   {
//     accessorKey: "image",
//     header: "Foto",
//     cell: ({ row }) => {
//       const imagen = row.getValue("image")
//       return (
//         <div className="px-3">
//           <Image
//             src={typeof imagen === "string" ? imagen : "/images/imagen-gato.png"}
//             alt="Imagen del usuario"
//             width={30}
//             height={30}
//           />
//         </div>
//       )
//     },
//   },
//   {
//     accessorKey: "name",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Nombre Completo
//         <ArrowUpDown className="ml-2 h-3 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => {
//       const { name, apellidoPat, apellidoMat } = row.original
//       return <div>{`${name} ${apellidoPat || ""} ${apellidoMat || ""}`}</div>
//     },
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Email
//         <ArrowUpDown className="ml-2 h-3 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => <div>{row.getValue("email")}</div>,
//   },
//   {
//     accessorKey: "celular",
//     header: () => <div className="text-center">Nro: Celular</div>,
//     cell: ({ row }) => {
//       const nombre = row.getValue("name")
//       if (row.getValue("celular") === null) {
//         return <div className="text-center">No tiene celular</div>
//       } else {
//         const whatsappLink = `https://wa.me/${row.getValue("celular")}?text=Hola%20${nombre},%20me%20interesa%20contactarte%20de%20la%20veterinaria%20Gamaliel.`
//         return (
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <div className="w-full flex justify-center">
//                   <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
//                     <Button variant="whatsapp">
//                       <FaWhatsapp className="h-5 w-5" />
//                     </Button>
//                   </Link>
//                 </div>
//               </TooltipTrigger>
//               <TooltipContent className="bg-[#43da57]">
//                 <p>Enviar Mensaje a</p>
//                 <p>Con Celular: <span className="font-bold"> {row.getValue("celular")}</span></p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         )
//       }
//     },
//   },
//   {
//     accessorKey: "createdAt",
//     header: () => <div className="text-center">Creado en:</div>,
//     cell: ({ row }) => <div>{formatearFechaYHora(row.getValue("createdAt"))}</div>,
//   },
//   {
//     accessorKey: "updatedAt",
//     header: () => <div className="text-center">Actualizado en:</div>,
//     cell: ({ row }) => <div>{formatearFechaYHora(row.getValue("updatedAt"))}</div>,
//   },
//   {
//     id: "actions",
//     header: "Acciones",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const { id } = row.original
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Abrir Menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Acciones</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <Link href={`/admin/usuarios/${id}`}>
//               <DropdownMenuItem className="cursor-pointer">
//                 <Pencil className="w-4 h-4 mr-2" />Editar Datos
//               </DropdownMenuItem>
//             </Link>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Ver detalles del Usuario</DropdownMenuItem>
//             <DropdownMenuItem onClick={() => navigator.clipboard.writeText(`${id}`)}>
//               Copiar Id del Usuario
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]

// interface DataTableProps<TData> {
//   data: TData[]
// }

// export function TablaUsuarios({ data }: DataTableProps<UsuarioT>) {
//   const [sorting, setSorting] = React.useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
//   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
//   const [isMounted, setIsMounted] = React.useState(false)

//   React.useEffect(() => {
//     setIsMounted(true)
//   }, [])

//   const table = useReactTable<UsuarioT>({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//     },
//     filterFns: {
//       fuzzy: (row, columnId, value, addMeta) => {
//         const rowValue = row.getValue(columnId)
//         return (
//           String(rowValue)
//             .toLowerCase()
//             .includes(String(value).toLowerCase())
//         )
//       },
//     },
//     globalFilterFn: (row, columnId, value) => {
//       return row
//         .getAllCells()
//         .some((cell) =>
//           String(cell.getValue())
//             .toLowerCase()
//             .includes(String(value).toLowerCase())
//         )
//     },
//   })

//   if (!isMounted) return null

//   return (
//     <div className="p-4 bg-background shadow-md rounded-lg mt-4 w-full">
//       <div className="flex items-center py-4">
//         <Input
//           placeholder="Filtrar Usuarios"
//           value={table.getState().globalFilter || ""}
//           onChange={(event) => table.setGlobalFilter(event.target.value)}
//           className="max-w-sm"
//         />
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="ml-auto">
//               Columnas<ChevronDown className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => {
//                 return (
//                   <DropdownMenuCheckboxItem
//                     key={column.id}
//                     className="capitalize"
//                     checked={column.getIsVisible()}
//                     onCheckedChange={(value) => column.toggleVisibility(!!value)}
//                   >
//                     {column.id}
//                   </DropdownMenuCheckboxItem>
//                 )
//               })}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(header.column.columnDef.header, header.getContext())}
//                     </TableHead>
//                   )
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
//                   No se encontraron resultados.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }























// "use client"

// import * as React from "react"
// import {
//   ColumnDef,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   FilterFn,
// } from "@tanstack/react-table"
// import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil } from "lucide-react"
// import { FaWhatsapp } from "react-icons/fa"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import Link from "next/link"
// import Image from "next/image"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
// import { UsuarioT } from "@/types"
// import { formatearFechaYHora } from "@/lib/formatearFecha"

// // Define una función de filtro global
// const globalFilterFn: FilterFn<UsuarioT> = (row, columnId, filterValue) => {
//   return row.getAllCells().some((cell) =>
//     String(cell.getValue())
//       .toLowerCase()
//       .includes(String(filterValue).toLowerCase())
//   )
// }

// export const columns: ColumnDef<UsuarioT>[] = [
//   {
//     accessorKey: "image",
//     header: "Foto",
//     cell: ({ row }) => {
//       const imagen = row.getValue("image")
//       return (
//         <div className="px-3">
//           <Image
//             src={typeof imagen === "string" ? imagen : "/images/imagen-gato.png"}
//             alt="Imagen del usuario"
//             width={30}
//             height={30}
//           />
//         </div>
//       )
//     },
//   },
//   {
//     accessorKey: "name",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Nombre Completo
//         <ArrowUpDown className="ml-2 h-3 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => {
//       const { name, apellidoPat, apellidoMat } = row.original
//       return <div>{`${name} ${apellidoPat || ""} ${apellidoMat || ""}`}</div>
//     },
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Email
//         <ArrowUpDown className="ml-2 h-3 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => <div>{row.getValue("email")}</div>,
//   },
//   {
//     accessorKey: "celular",
//     header: () => <div className="text-center">Nro: Celular</div>,
//     cell: ({ row }) => {
//       const nombre = row.getValue("name")
//       if (row.getValue("celular") === null) {
//         return <div className="text-center">No tiene celular</div>
//       } else {
//         const whatsappLink = `https://wa.me/${row.getValue("celular")}?text=Hola%20${nombre},%20me%20interesa%20contactarte%20de%20la%20veterinaria%20Gamaliel.`
//         return (
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <div className="w-full flex justify-center">
//                   <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
//                     <Button variant="whatsapp">
//                       <FaWhatsapp className="h-5 w-5" />
//                     </Button>
//                   </Link>
//                 </div>
//               </TooltipTrigger>
//               <TooltipContent className="bg-[#43da57]">
//                 <p>Enviar Mensaje a</p>
//                 <p>Con Celular: <span className="font-bold"> {row.getValue("celular")}</span></p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         )
//       }
//     },
//   },
//   {
//     accessorKey: "createdAt",
//     header: () => <div className="text-center">Creado en:</div>,
//     cell: ({ row }) => <div>{formatearFechaYHora(row.getValue("createdAt"))}</div>,
//   },
//   {
//     accessorKey: "updatedAt",
//     header: () => <div className="text-center">Actualizado en:</div>,
//     cell: ({ row }) => <div>{formatearFechaYHora(row.getValue("updatedAt"))}</div>,
//   },
//   {
//     id: "actions",
//     header: "Acciones",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const { id } = row.original
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Abrir Menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Acciones</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <Link href={`/admin/usuarios/${id}`}>
//               <DropdownMenuItem className="cursor-pointer">
//                 <Pencil className="w-4 h-4 mr-2" />Editar Datos
//               </DropdownMenuItem>
//             </Link>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Ver detalles del Usuario</DropdownMenuItem>
//             <DropdownMenuItem onClick={() => navigator.clipboard.writeText(`${id}`)}>
//               Copiar Id del Usuario
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]

// interface DataTableProps<TData> {
//   data: TData[]
// }

// export function TablaUsuarios({ data }: DataTableProps<UsuarioT>) {
//   const [sorting, setSorting] = React.useState<SortingState>([])
//   const [globalFilter, setGlobalFilter] = React.useState<string>("")
//   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
//   const [isMounted, setIsMounted] = React.useState(false)

//   React.useEffect(() => {
//     setIsMounted(true)
//   }, [])

//   const table = useReactTable<UsuarioT>({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     state: {
//       sorting,
//       globalFilter,
//       columnVisibility,
//     },
//     globalFilterFn,
//   })

//   if (!isMounted) return null

//   return (
//     <div className="p-4 bg-background shadow-md rounded-lg mt-4 w-full">
//       <div className="flex items-center py-4">
//         <Input
//           placeholder="Filtrar Usuarios"
//           value={table.getState().globalFilter || ""}
//           onChange={(event) => setGlobalFilter(event.target.value)}
//           className="max-w-sm"
//         />
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="ml-auto">
//               Columnas<ChevronDown className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => {
//                 return (
//                   <DropdownMenuCheckboxItem
//                     key={column.id}
//                     className="capitalize"
//                     checked={column.getIsVisible()}
//                     onCheckedChange={(value) => column.toggleVisibility(!!value)}
//                   >
//                     {column.id}
//                   </DropdownMenuCheckboxItem>
//                 )
//               })}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(header.column.columnDef.header, header.getContext())}
//                     </TableHead>
//                   )
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
//                   No se encontraron resultados.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }


"use client"

import * as React from "react"
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { UsuarioT } from "@/types"
import { formatearFechaYHora } from "@/lib/formatearFecha"
import { useQuery } from "@tanstack/react-query"

// Define una función de filtro global
const globalFilterFn: FilterFn<UsuarioT> = (row, columnId, filterValue) => {
  return row.getAllCells().some((cell) => {
    if (columnId === "name") {
      const { name, apellidoPat, apellidoMat } = row.original
      const fullName = `${name} ${apellidoPat || ""} ${apellidoMat || ""}`.toLowerCase()
      return fullName.includes(String(filterValue).toLowerCase())
    }
    return String(cell.getValue())
      .toLowerCase()
      .includes(String(filterValue).toLowerCase())
  })
}

export const columns: ColumnDef<UsuarioT>[] = [
  {
    accessorKey: "image",
    header: "Foto",
    cell: ({ row }) => {
      const imagen = row.getValue("image")
      return (
        <div className="px-3">
          <Image
            src={typeof imagen === "string" ? imagen : "/images/usuario.png"}
            alt="Imagen del usuario"
            width={30}
            height={30}
          />
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre Completo
        <ArrowUpDown className="ml-2 h-3 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const { name, apellidoPat, apellidoMat } = row.original
      return <div>{`${name} ${apellidoPat || ""} ${apellidoMat || ""}`}</div>
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-3 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => <div>{row.getValue("estado")}</div>,
  },
  {
    accessorKey: "celular",
    header: () => <div className="text-center">Nro: Celular</div>,
    cell: ({ row }) => {
      const nombre = row.getValue("name")
      if (row.getValue("celular") === null) {
        return <div className="text-center">No tiene celular</div>
      } else {
        const whatsappLink = `https://wa.me/${row.getValue("celular")}?text=Hola%20${nombre},%20me%20interesa%20contactarte%20de%20la%20veterinaria%20Gamaliel.`
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full flex justify-center">
                  <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="whatsapp">
                      <FaWhatsapp className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-[#43da57]">
                <p>Enviar Mensaje a</p>
                <p>Con Celular: <span className="font-bold"> {row.getValue("celular")}</span></p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
    },
  },
  {
    accessorKey: "rol",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Rol
        <ArrowUpDown className="ml-2 h-3 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("rol")}</div>
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: () => <div className="text-center">Creado en:</div>,
  //   cell: ({ row }) => <div className="text-center">{formatearFechaYHora(row.getValue("createdAt"))}</div>,
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: () => <div className="text-center">Actualizado en:</div>,
  //   cell: ({ row }) => <div className="text-center">{formatearFechaYHora(row.getValue("updatedAt"))}</div>,
  // },
  {
    id: "actions",
    header: "Acciones",
    enableHiding: false,
    cell: ({ row }) => {
      const { id } = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/admin/usuarios/${id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="w-4 h-4 mr-2" />Editar Datos
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalles del Usuario</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(`${id}`)}>
              Copiar Id del Usuario
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface DataTableProps<TData> {
  data: TData[]
}

export function TablaUsuarios({ data }: DataTableProps<UsuarioT>) {

  //Poner el codigo para controlar los usuarios con tans


  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState<string>("")
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const table = useReactTable<UsuarioT>({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
    },
    globalFilterFn,
  })

  if (!isMounted) return null

  return (
    <div className="p-4 bg-background shadow-md rounded-lg mt-4 w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar Usuarios"
          value={table.getState().globalFilter || ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas<ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
