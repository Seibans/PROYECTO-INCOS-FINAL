"use client"

import * as React from "react"
import {
	ChevronUpIcon,
	ChevronDownIcon
} from "lucide-react"

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
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import Image from "next/image"
import { Progress } from "../ui/progress"
import { formatearPrecio } from "@/lib/formatearPrecio"

type TablaIntegracionesProps = {
	app: string
	icon: string
	status: "pending" | "processing" | "success" | "failed"
	rate: number
	profit: number
}


const data: TablaIntegracionesProps[] = [
	{
		app: "m5gr84i9",
		icon: "https://res.cloudinary.com/dy8crd62e/image/upload/v1692680027/h74ziuz3v30pdrelsk05.jpg",
		status: "success",
		rate: 100,
		profit: 20
	},
	{
		app: "5gr84i9",
		icon: "/images/base.png",
		status: "processing",
		rate: 50,
		profit: 50.59
	},
	{
		app: "gr84i9",
		icon: "/images/base.png",
		status: "failed",
		rate: 1,
		profit: 20
	}
]

export const columns: ColumnDef<TablaIntegracionesProps>[] = [
	{
		accessorKey: "icon",
		header: "Logo",
		cell: ({ row }) => (
			<div className="capitalize">
				<Image src={row.getValue("icon")} alt="logo" width={20} height={20} />
				{row.getValue("icon")}
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: "app",
		header: "Aplicacion",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("app")}</div>
		),
	},
	{
		accessorKey: "status",
		header: () => <div className="text-center">Estado</div>,
		cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
	},
	{
		accessorKey: "rate",
		header: () => <div className="text-right">Rate</div>,
		cell: ({ row }) => (
			<div className="text-right font-medium flex gap-1 items-center">
				<Progress value={row.getValue("rate")} className="h-2" />
			</div>
		),
	},
	{
		accessorKey: "profit",
		header: ({ column }) => (
			<Button
				variant={"ghost"}
				className="float-end px-0"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
				Profit
				<ChevronUpIcon className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("profit"))

			return (
				<div className="text-right font-medium">
					{formatearPrecio(amount)}
				</div>
			)

		},
	},
]

export const TablaIntegracionesComponent = () => {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	)
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})


	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filtrar Apps..."
					value={(table.getColumn("app")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("app")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columnas <ChevronDownIcon className="ml-2 h-4 w-4" />
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
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
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
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Sin Resultados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} de{" "}
					{table.getFilteredRowModel().rows.length} columnas(s) selecionadas.
				</div>
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
		</div>
	)
}
