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

import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Image from "next/image";

import { Mascota } from "@prisma/client";
import { formatearFecha } from "@/lib/formatearFecha"

export const columns: ColumnDef<Mascota>[] = [
  {
    accessorKey: "imagen",
    header: "Foto",
    cell: ({ row }) => {
      const imagen = row.getValue("imagen");

      return (
        <div className="px-3">
          <Image
            src={typeof imagen === 'string' ? imagen : "/images/imagen-gato.png"}
            alt="Imagen de la mascota"
            width={30}
            height={30}
            className="h-auto w-auto"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-3 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("nombre")}</div>,
  },
  {
    accessorKey: "especie",
    header: () => <div className="text-center">Especie</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("especie")}
        </div>
      );
    },
  },
  {
    accessorKey: "raza",
    header: () => <div className="text-left">Raza</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("raza")}
        </div>
      );
    },
  },
  {
    accessorKey: "fechaNacimiento",
    header: () => <div className="text-left">Fecha de Nacimiento</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {/* {row.getValue("fechaNacimiento")?.toLocaleDateString()} */}
          {/* {row.getValue("fechaNacimiento")} */}


          {/* {formatearFecha(row.getValue("fechaNacimiento"), "PPP")} */}
          EXISTE FECHA?
        </div>
      );
    },
  },
  {
    accessorKey: "sexo",
    header: () => <div className="text-left">Sexo</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("sexo")}
        </div>
      );
    },
  },
  {
    accessorKey: "detalles",
    header: () => <div className="text-left">Detalles</div>,
    cell: ({ row }) => {
      return (
        // text-pretty text-wrap text-balance
        <div className="font-medium w-48 overflow-hidden">
          {row.getValue("detalles")}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    enableHiding: false,
    cell: ({ row }) => {
      const { id } = row.original;

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
            <Link href={`/admin/mascotas/${id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />Editar Datos
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalles de la Mascota</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`${id}`)}
            >
              Copiar Id de la Mascota
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface DataTableProps<TData> {
  data: TData[];
}

export function TablaMascotas({
  data
}: DataTableProps<Mascota>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [isMounted, setIsMounted] = React.useState(false);
  // const [rowSelection, setRowSelection] = React.useState({}) //para el select de cada uno o muchos


  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const table = useReactTable<Mascota>({
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
            placeholder="Filtrar Mascota"
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
                  No hay Mascotas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
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
    </>
  );
}


