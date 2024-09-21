"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {formSchema} from "@/schemas"


export default function FormCitaMedica() {
  const [isPending, startTransition] = React.useTransition();

  // Configuración del formulario con React Hook Form y Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fechaReserva: undefined,
      hora: { hour: "", minute: "", period: "" },
      detalles: "",
      servicio: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      console.log(values);
      // Aquí puedes llamar a tu acción o API para registrar la cita
      toast.success("Cita creada exitosamente");
      form.reset(); // Reinicia el formulario después de enviar los datos
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fechaReserva"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de la cita</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP", { locale: es }) : "Seleccione una fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hora"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hora de la cita</FormLabel>
              <FormControl>
                <div className="flex space-x-2">
                  <Select onValueChange={(hour) => field.onChange({ ...field.value, hour })}>
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="HH" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {hour.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select onValueChange={(minute) => field.onChange({ ...field.value, minute })}>
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {["00", "15", "30", "45"].map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select onValueChange={(period) => field.onChange({ ...field.value, period })}>
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="AM/PM" />
                    </SelectTrigger>
                    <SelectContent>
                      {["AM", "PM"].map((period) => (
                        <SelectItem key={period} value={period}>
                          {period}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="detalles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detalles</FormLabel>
              <FormControl>
                <Input placeholder="Detalles de la cita" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="servicio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Servicio</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consulta">Consulta General</SelectItem>
                    <SelectItem value="vacunacion">Vacunación</SelectItem>
                    <SelectItem value="cirugia">Cirugía</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          Crear Cita
        </Button>
      </form>
    </Form>
  );
}
