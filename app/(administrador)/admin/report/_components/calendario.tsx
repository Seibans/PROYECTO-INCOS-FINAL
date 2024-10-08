"use client";

import React, { useState } from "react";
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";

export default function CalendarDatePickerComponent() {

  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">
        Calendar Date Picker Component
      </h1>
      <CalendarDatePicker
        date={selectedDateRange}
        onDateSelect={setSelectedDateRange}
      />
      <div className="mt-4">
        <h2 className="text-md font-semibold">Selecciona un rango de Fechas</h2>
        <p className="text-sm">
          {selectedDateRange.from.toDateString()} -{" "}
          {selectedDateRange.to.toDateString()}
        </p>
      </div>
    </div>
  );
}