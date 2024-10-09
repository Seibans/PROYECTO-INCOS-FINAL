// File: @/types/index.ts

import { Decimal } from '@prisma/client/runtime/library';
import { TipoMascota, Sexo, RolUsuario } from '@prisma/client';

export interface PagoResumen {
  id: number;
  total: Decimal;
  fechaPago: Date | null;
  estado: number;
  detalle: string | null;
  creadoEn: Date;
  mascotaNombre: string;
  tratamientoId: number;
}

export interface TratamientoDetallado {
  id: number;
  descripcion: string;
  estado: number;
  diagnostico: string | null;
  historialMascotaId: number;
  creadoEn: Date;
  actualizadoEn: Date | null;
  idUsuario: number;
  pago: {
    id: number;
    total: Decimal;
    fechaPago: Date | null;
    detalle: string | null;
    estado: number;
    esAyudaVoluntaria: boolean;
  };
  mascota: {
    id: number;
    nombre: string;
    especie: TipoMascota;
    raza: string | null;
    sexo: Sexo;
    peso: number | null;
  };
  propietario: {
    id: number;
    name: string;
    apellidoPat: string | null;
    apellidoMat: string | null;
    email: string | null;
    rol: RolUsuario;
  } | null;
  servicios: {
    id: number;
    nombre: string;
    precioServicio: Decimal;
  }[];
  medicamentos: {
    id: number;
    nombre: string;
    cantidad: number;
    costoUnitario: Decimal;
  }[];
}

export interface ResumenIngresos {
  totalSemanal: Decimal;
  totalMensual: Decimal;
}