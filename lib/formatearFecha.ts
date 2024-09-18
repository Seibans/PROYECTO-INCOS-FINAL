import { format, formatRelative, addDays, addHours } from "date-fns";
import { es } from "date-fns/locale";
import { TZDate } from "@date-fns/tz";

export const formatearFecha = (date: Date | null, formatStr: string = "yyyy-MM-dd HH:mm:ss"): string => {
    if (!date) {
        return 'Sin registro de fecha';  // Si la fecha es null, devolver mensaje
    }

    // Agrega 1 día a la fecha recibida si no es null
    // const adjustedDate = addDays(date, 1);
    // return format(adjustedDate, formatStr, { locale: es });
	return format(date, formatStr, { locale: es });
};

export const formatearFechaYHora = (date: Date | null | undefined, formatStr: string = "PPPpp"): string => {
    if (!date) {
        return 'Sin registro de fecha';  // Si la fecha es null, devolver mensaje
    }
	const fechaFormateada = format(date, formatStr, { locale: es });
	console.log(fechaFormateada);
	return `${fechaFormateada}`;
};

/*
PPP: Fecha en formato corto o largo dependiendo de la localización.
pppp: Fecha y hora extendida, incluyendo la hora exacta y la zona horaria.
*/