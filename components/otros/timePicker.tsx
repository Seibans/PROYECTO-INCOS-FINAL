"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Nuevo componente TimePicker
export const TimePicker = ({ value, onChange }: any) => {
	const hours = Array.from({ length: 12 }, (_, i) => i + 1)
	const minutes = ['00', '15', '30', '45']
	const periods = ['AM', 'PM']
  
	return (
	  <div className="flex space-x-2">
		<Select onValueChange={(hour) => onChange({ ...value, hour })}>
		  <SelectTrigger className="w-[70px]">
			<SelectValue placeholder="HH" />
		  </SelectTrigger>
		  <SelectContent>
			{hours.map((hour) => (
			  <SelectItem key={hour} value={hour.toString()}>
				{hour.toString().padStart(2, '0')}
			  </SelectItem>
			))}
		  </SelectContent>
		</Select>
		<Select onValueChange={(minute) => onChange({ ...value, minute })}>
		  <SelectTrigger className="w-[70px]">
			<SelectValue placeholder="MM" />
		  </SelectTrigger>
		  <SelectContent>
			{minutes.map((minute) => (
			  <SelectItem key={minute} value={minute}>
				{minute}
			  </SelectItem>
			))}
		  </SelectContent>
		</Select>
		<Select onValueChange={(period) => onChange({ ...value, period })}>
		  <SelectTrigger className="w-[90px]">
			<SelectValue placeholder="AM/PM" />
		  </SelectTrigger>
		  <SelectContent>
			{periods.map((period) => (
			  <SelectItem key={period} value={period}>
				{period}
			  </SelectItem>
			))}
		  </SelectContent>
		</Select>
	  </div>
	)
  }