import { format, formatRelative, addDays, addHours } from "date-fns";
import { es } from "date-fns/locale";
import { TZDate } from "@date-fns/tz";
import { formatInTimeZone } from 'date-fns-tz';
import { enGB } from 'date-fns/locale/en-GB'

export const formatearFecha = (date: Date | null, formatStr: string = "yyyy-MM-dd HH:mm:ss"): string => {
    if (!date) {
        return 'Sin registro de fecha';
    }
    return format(date, formatStr, { locale: es });
};

export const formatearFechaYHora = (date: Date | null | undefined, formatStr: string = "PPPpp"): string => {
    if (!date) {
        return 'Sin registro de fecha';
    }
    const fechaFormateada = format(date, formatStr, { locale: es });
    return `${fechaFormateada}`;
};

/*
PPP: Fecha en formato corto o largo dependiendo de la localización.
pppp: Fecha y hora extendida, incluyendo la hora exacta y la zona horaria.
*/


// console.log(new Date());
// console.log(formatInTimeZone(new Date(), 'America/La_Paz', 'yyyy-MM-dd HH:mm:ss'));
// console.log(formatInTimeZone(new Date(), 'America/La_Paz', 'yyyy-MM-dd HH:mm:ss zzz', { locale: enGB }));
// const fecha = formatInTimeZone(new Date(), 'America/La_Paz', 'yyyy-MM-dd HH:mm:ss');