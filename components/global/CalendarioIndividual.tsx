"use client"

import * as React from "react"
import { CalendarIcon, X } from "lucide-react"
import { format, isValid } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CalendarDatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date | undefined
  onDateSelect: (date: Date | undefined) => void
  minDate?: Date
  maxDate?: Date
  className?: string
}

export function CalendarioIndividual({
  date,
  onDateSelect,
  className,
  minDate,
  maxDate,
}: CalendarDatePickerProps) {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [month, setMonth] = React.useState(date || new Date())

  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear()
    const minYear = minDate ? minDate.getFullYear() : currentYear - 100
    const maxYear = maxDate ? maxDate.getFullYear() : currentYear + 100
    return Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i)
  }, [minDate, maxDate])

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  const handleYearChange = (year: string) => {
    setMonth(new Date(parseInt(year), month.getMonth()))
  }

  const handleMonthChange = (monthName: string) => {
    const monthIndex = months.indexOf(monthName)
    setMonth(new Date(month.getFullYear(), monthIndex))
  }

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const clearDate = () => {
    onDateSelect(undefined)
    setIsPopoverOpen(false)
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date && isValid(date) ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex items-center justify-between space-x-2 p-3">
          <Select
            onValueChange={handleMonthChange}
            value={months[month.getMonth()]}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={month.getFullYear().toString()}
          >
            <SelectTrigger className="w-[90px]">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearDate}
            title="Borrar fecha"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            onDateSelect(newDate || undefined)
            setIsPopoverOpen(false)
          }}
          month={month}
          onMonthChange={setMonth}
          disabled={isDateDisabled}
          fromDate={minDate}
          toDate={maxDate}
          locale={es}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  )
}