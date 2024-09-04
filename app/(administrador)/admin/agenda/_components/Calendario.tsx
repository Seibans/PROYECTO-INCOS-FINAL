"use client"

import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateSelectArg, EventContentArg } from "@fullcalendar/core/index.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalAgregarReserva from "./ModalAgregarReserva";
import esLocale from '@fullcalendar/core/locales/es';


export const Calendario = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [guardarNuevaReserva, setguardarNuevaReserva] = useState(false);
  const [itemSeleccionado, setitemSeleccionado] = useState<DateSelectArg>();
  const [nuevoEvento, setnuevoEvento] = useState({
    titulo: "",
    usuarioSeleccionado: {
      name: "",
      id: ""
    }
  });

  const handleDateClick = async (selected: DateSelectArg) => {
    setOpen(true);
    setitemSeleccionado(selected)
  }

  const handleEventClick = () => {
    console.log("evento")
  }
  return (
    <div>
      <div className="md:flex gap-x-3">
        <div className="w-[200px] relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-auto">
            <p className="mb-3 text-xl">Listado de Reservas</p>
            {/* {events.map((currentEvent) => (
              <div key={currentEvent.id} className="p-4 rounded-lg shadow-md mb-2 bg-slate-200 dark:bg-background">
                <p className="font-bold">{currentEvent.titulo}</p>
                <p>{formatDate(currentEvent.titulo)}</p>
              </div>
            ))} */}
          </div>
        </div>
        <div className="flex-1 calendar-container">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear,listMonth",
                  
                }}
                buttonText={
                  {
                    today:    'Hoy',
                    month:    'Mes',
                    week:     'Semana',
                    day:      'Dia',
                    year:     'Año',
                    list:     'Listado'
                  }
                }
                height="80vh"
                initialView="dayGridMonth"
                weekends={false}
                // events={events}
                eventContent={renderEventContent}
                editable={true}
                selectable={true}
                selectMirror={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                locale={esLocale}
                noEventsText="No hay eventos para mostrar"
              />
        </div>
      </div>
      {/* <ModalAgregarReserva
        open={open}
        setOpen={setOpen}
        setguardarNuevaReserva={setguardarNuevaReserva}
        usuarios={usuarios}
        setnuevoEvento={setnuevoEvento}
      /> */}
    </div>
  )
}

function renderEventContent(reservaInfo: EventContentArg){
  return (
    <div className="bg-slate-200 dark:bg-background w-full p-1">
      <i>{reservaInfo.event.title}</i>
      <p>Prueba eliminar</p>
    </div>
  )
} 