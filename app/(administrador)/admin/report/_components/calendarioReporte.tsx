"use client";

import React, { useState } from "react";
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { formatearFecha, formatearFechaYHora } from "@/lib/formatearFecha";

export default function CalendarioReporteComponent() {

  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  return (
    // <div className="p-4 max-w-2xl">
    <div className="p-4 max-full">
      <h1 className="text-2xl font-bold mb-4">
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
  );
}