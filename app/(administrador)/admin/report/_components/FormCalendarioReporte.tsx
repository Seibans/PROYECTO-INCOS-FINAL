"use client";

import React, { useState } from "react";
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { formatearFecha, formatearFechaYHora } from "@/lib/formatearFecha";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react"
import GeneratePDFButton from './boton';

export default function CalendarioReporteComponent() {

  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  return (
    <>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Generar Reporte
        </legend>
        <div className="grid gap-3">
          <Label htmlFor="datos">Datos</Label>
          <Select>
            <SelectTrigger
              id="datos"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="SELECCIONA LOS DATOS DE LOS REPORTES" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="genesis">
                <div className="flex items-start gap-3 text-muted-foreground">
                  {/* <Rabbit className="size-7" /> */}
                  <Rabbit className="w-7 h-7" />
                  <div className="grid gap-0.5">
                    <p>
                      Usuarios{" "}
                      <span className="font-medium text-foreground">
                        Reporte de Todos los Usuarios
                      </span>
                    </p>
                    <p className="text-xs" data-description>
                      Desacargar en Pdf o Excel los reportes de todos los usuarios.
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="explorer">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Bird className="size-7" />
                  <div className="grid gap-0.5">
                    <p>
                      Mascotas{" "}
                      <span className="font-medium text-foreground">
                        Reporte de Todas las Mascotas
                      </span>
                    </p>
                    <p className="text-xs" data-description>
                      Descargar en Pdf o Excel los reportes de todas las mascotas.
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="quantum">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Turtle className="size-7" />
                  <div className="grid gap-0.5">
                    <p>
                      Reservas Médicas{" "}
                      <span className="font-medium text-foreground">
                        Reporte de Todas las Reservas Médicas
                      </span>
                    </p>
                    <p className="text-xs" data-description>
                      Descargar en Pdf o Excel los reportes de todas las reservas médicas.
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="quantum1">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Turtle className="size-7" />
                  <div className="grid gap-0.5">
                    <p>
                      Medicamentos{" "}
                      <span className="font-medium text-foreground">
                        Reporte de Todos los Medicamentos
                      </span>
                    </p>
                    <p className="text-xs" data-description>
                      Descargar en Pdf o Excel los reportes de todos los medicamentos.
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="quantum2">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Turtle className="size-7" />
                  <div className="grid gap-0.5">
                    <p>
                      Pagos{" "}
                      <span className="font-medium text-foreground">
                        Reporte de Todos los Pagos
                      </span>
                    </p>
                    <p className="text-xs" data-description>
                      Descargar en Pdf o Excel los reportes de todos los pagos.
                    </p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </fieldset>
      <div className="p-4 max-w-2xl bg-red-500">
        {/* <div className="p-4 max-full"> */}
        <h1 className="text-xl font-semibold mb-4">
          Selecciona el Rango de Fechas Para obtener los reportes.
        </h1>
        <div className="flex items-center justify-center">

          <CalendarDatePicker
            date={selectedDateRange}
            onDateSelect={setSelectedDateRange}
          />
        </div>
        <div className="mt-4">
          <h2 className="text-md font-semibold">Selecciona un rango de Fechas</h2>
          <p className="text-sm">
            {/* {selectedDateRange.from.toDateString()} - {" "}{selectedDateRange.to.toDateString()} */}
            {`${formatearFecha(selectedDateRange.from, "PPP")} hasta ${formatearFecha(selectedDateRange.to, "PPP")}`}
          </p>
        </div>
      </div>
      <GeneratePDFButton />
      <GeneratePDFButton />
    </>
  );
}