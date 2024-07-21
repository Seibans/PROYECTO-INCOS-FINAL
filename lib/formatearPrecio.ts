export const formatearPrecio = (precio: number) => {
	return new Intl.NumberFormat("es-BO", {
		style: "currency",
		currency: "BOB",
	}).format(precio);
}

export const formatearPrecioPorcentaje = (precio: number, porcentaje: number) => {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(precio * porcentaje / 100);
}

export const formatearPrecioPorcentajePorDia = (precio: number, porcentaje: number) => {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(precio * porcentaje / 100 / 365);
}