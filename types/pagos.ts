// // File: @/types/index.ts

// import { Decimal } from '@prisma/client/runtime/library';
// import { TipoMascota, Sexo, RolUsuario } from '@prisma/client';

// export interface PagoResumen {
//   id: number;
//   total: Decimal;
//   fechaPago: Date | null;
//   estado: number;
//   detalle: string | null;
//   creadoEn: Date;
//   mascotaNombre: string;
//   tratamientoId: number;
// }

// export interface TratamientoDetallado {
//   id: number;
//   descripcion: string;
//   estado: number;
//   diagnostico: string | null;
//   historialMascotaId: number;
//   creadoEn: Date;
//   actualizadoEn: Date | null;
//   idUsuario: number;
//   pago: {
//     id: number;
//     total: Decimal;
//     fechaPago: Date | null;
//     detalle: string | null;
//     estado: number;
//     esAyudaVoluntaria: boolean;
//   };
//   mascota: {
//     id: number;
//     nombre: string;
//     especie: TipoMascota;
//     raza: string | null;
//     sexo: Sexo;
//     peso: number | null;
//   };
//   propietario: {
//     id: number;
//     name: string;
//     apellidoPat: string | null;
//     apellidoMat: string | null;
//     email: string | null;
//     rol: RolUsuario;
//   } | null;
//   servicios: {
//     id: number;
//     nombre: string;
//     precioServicio: Decimal;
//   }[];
//   medicamentos: {
//     id: number;
//     nombre: string;
//     cantidad: number;
//     costoUnitario: Decimal;
//   }[];
// }

// export interface ResumenIngresos {
//   totalSemanal: Decimal;
//   totalMensual: Decimal;
// }







import { TipoMascota, Sexo, RolUsuario } from '@prisma/client';

export interface PagoResumen {
  id: number;
  total: number;
  fechaPago: Date | null;
  estado: number;
  detalle: string | null;
  creadoEn: Date;
  actualizadoEn: Date | null;
  tratamientoId: number;
  tratamientoDescripcion: string;
  tratamientoEstado: number;
  mascotaNombre: string | null;
  mascotaId: number | null;
  usuarioNombreCompleto: string | null;
  usuarioEmail: string | null;
  usuarioCelular: string | null;
}

export interface TratamientoCompleto {
  id: number;
  descripcion: string;
  estado: number;
  diagnostico: string | null;
  fechaCreacion: Date;
  fechaActualizacion: Date | null;
  pago: {
    id: number;
    total: number;
    fechaPago: Date | null;
    metodoPago: string | null;
    estado: number;
  } | null;
  servicios: {
    id: number;
    nombre: string;
    precio: number;
  }[];
  medicamentos: {
    id: number;
    nombre: string;
    codigo: string | null;
    costoUnitario: number;
    cantidad: number;
    dosificacion: string | null;
    total: number;
  }[];
  sumaTotalServicios: number;
  sumaTotalMedicamentos: number;
  mascota: {
    id: number;
    nombre: string;
    especie: TipoMascota;
    raza: string | null;
  };
  propietario: {
    id: number;
    nombre: string;
    apellidoPat: string | null;
    apellidoMat: string | null;
    email: string | null;
    celular: string | null;
  } | null;
}

export interface ResumenIngresos {
  ingresoSemanal: string;
  ingresoMensual: string;
  porcentajeCambioSemanal: number;
  porcentajeCambioMensual: number;
}