// export interface PagoResumen2 {
//   id: number;
//   total: string;
//   fechaPago: string | null;
//   estado: number;
//   detalle: string | null;
//   creadoEn: string;
//   actualizadoEn: string | null;
//   descripcionTratamiento: string | null;
//   estadoTratamiento: number | null;
//   idMascota: number | null;
//   nombreMascota: string | null;
//   idUsuario: number | null;
//   nombreCompletoUsuario: string | null;
//   emailUsuario: string | null;
//   celularUsuario: string | null;
//   rolUsuario: string | null;
//   estadoUsuario: number | null;
// }

export interface PagoResumen2 {
	id: number;
	total: string;
	fechaPago: Date | null;
	estado: number;
	detalle: string | null;
	creadoEn: Date;
	actualizadoEn?: Date | null;
	descripcionTratamiento: string | null;
	estadoTratamiento: number | null;
	idMascota: number | null;
	nombreMascota: string | null;
	idUsuario: number | null;
	nombreCompletoUsuario: string | null;
	emailUsuario: string | null;
	celularUsuario: string | null;
	rolUsuario: string | null;
	estadoUsuario: number | null;
}

// Interfaces
export interface ServicioTratamientoP {
	idServicio: number;
	precioServicio: string;
	nombreServicio: string;
  }
  
export interface MedicamentoTratamientoP {
	idMedicamento: number;
	costoUnitario: string;
	cantidad: number;
	dosificacion: string | null;
	totalMedicamento: string;
	nombreMedicamento: string;
	codigoMedicamento: string | null;
	cantidadPorUnidad: number;
	unidadMedida: string | null;
  }
  
export interface TratamientoCompletoP {
	id: number;
	descripcion: string;
	estado: number;
	diagnostico: string | null;
	idHistorial: number;
	totalPago: string | null;
	estadoPago: number | null;
	creadoEn: Date;
	actualizadoEn: Date | null;
	idUsuario: number;
	servicios: ServicioTratamientoP[];
	medicamentos: MedicamentoTratamientoP[];
	sumaTotalPrecioServicio: string;
	costoTotalMedicamentos: string;
  }
  
export interface ResumenIngresos {
	ingresoSemanal: string;
	ingresoMensual: string;
}