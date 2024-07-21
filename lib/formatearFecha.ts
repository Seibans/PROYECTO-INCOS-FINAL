import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatearFecha = (date: Date, formatStr: string = "PPP"): string => {
	return format(date, formatStr, { locale: es });
};
