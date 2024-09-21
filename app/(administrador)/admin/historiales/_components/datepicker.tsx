"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

// import { Datepicker } from 'flowbite-react'; // Importa el datepicker

type Status = {
	value: string
	label: string
}


import Datepicker from "tailwind-datepicker-react"


const options = {
	title: "Fecha Inicial",
	autoHide: true,
	todayBtn: true,
	clearBtn: true,
	todayBtnText: "Hoy",
	clearBtnText: "Borrar",
	maxDate: new Date("2030-01-01"),
	minDate: new Date("1950-01-01"),
	theme: {
		background: "bg-gray-700 dark:bg-gray-800",
		todayBtn: "bg-gradient",
		clearBtn: "",
		icons: "",
		text: "",
		disabledText: "opacity-25",
		input: "",
		inputIcon: "",
		selected: "bg-gradient",
	},
	icons: {
		prev: () => <span>{"<"}</span>,
		next: () => <span>{">"}</span>,
	},
	datepickerClassNames: "top-12",
	defaultDate: new Date("2022-01-01"),
	language: "es",
	disabledDates: [],
	weekDays: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Selecciona una Fecha",
	inputDateFormatProp: {
		day: "numeric" as "numeric" | "2-digit",
		month: "long" as "numeric" | "2-digit" | "long" | "short" | "narrow",
		year: "numeric" as "numeric" | "2-digit"
	}
}


const statuses: Status[] = [
	{
		value: "backlog",
		label: "Backlog",
	},
	{
		value: "todo",
		label: "Todo",
	},
	{
		value: "in progress",
		label: "In Progress",
	},
	{
		value: "done",
		label: "Done",
	},
	{
		value: "canceled",
		label: "Canceled",
	},
]


export const DatePicker = () => {

	const [open, setOpen] = React.useState(false)
	const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
		null
	)

	const [show, setShow] = React.useState(false)
	const handleChange = (selectedDate: Date) => {
		console.log(selectedDate)
	}
	const handleClose = (state: boolean) => {
		setShow(state)
	}


	return (
		<div className="flex items-center space-x-4">
			<div>
				<Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
			</div>


			<p className="text-sm text-muted-foreground">Status</p>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-[150px] justify-start">
						{selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0" side="right" align="start">
					<Command>
						<CommandInput placeholder="Change status..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								{statuses.map((status) => (
									<CommandItem
										key={status.value}
										value={status.value}
										onSelect={(value) => {
											setSelectedStatus(
												statuses.find((priority) => priority.value === value) ||
												null
											)
											setOpen(false)
										}}
									>
										{status.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>




			
		</div>
	)
}