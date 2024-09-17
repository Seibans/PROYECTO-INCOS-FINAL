import { format, formatRelative, addDays, addHours } from "date-fns";
import { es } from "date-fns/locale";
import { TZDate } from "@date-fns/tz";

export const formatearFecha = (date: Date, formatStr: string = "yyyy-MM-dd HH:mm:ss"): string => {
	return format(date, formatStr, { locale: es });
};

export const formatearFechaYHora = (date: Date, formatStr: string = "PPPpp"): string => {
	const fechaFormateada = format(date, formatStr, { locale: es });
	console.log(fechaFormateada);
	return `${fechaFormateada}`;
};

/*
PPP: Fecha en formato corto o largo dependiendo de la localización.
pppp: Fecha y hora extendida, incluyendo la hora exacta y la zona horaria.
*/