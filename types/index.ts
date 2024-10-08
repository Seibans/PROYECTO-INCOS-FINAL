import { RolUsuario, Sexo, TipoMascota, TipoMedicamento } from "@prisma/client";
import Decimal from "decimal.js";

export interface UsuarioT {
  id: number;
  name: string;
  username?: string | null;
  apellidoPat: string | null;
  apellidoMat: string | null;
  ci: string | null;
  sexo: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  rol: RolUsuario;
  celular: string | null;
  direccion: string | null;
  estado: number;
  authDobleFactor: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  idUsuario: number | null;
}

export interface MascotaT {
  id: number;
  nombre: string;
  imagen: string | null;
  especie: TipoMascota;
  raza: string | null;
  fechaNacimiento: Date | null;
  sexo: Sexo;
  detalles: string | null;
  peso: number | null;
  estado: number;
  idPropietario: number | null;
  usuario: UsuarioT | null;
  esterilizado: boolean | null;
  creadoEn: Date;
  actualizadoEn?: Date | null;
  idUsuario: number;
}

export interface HistorialMedicoT {
  historialMascotaId: number;
  descripcionTratamientos: string | null;
  estado: number;
  mascota: MascotaT;
  tratamientos?: TratamientoT[] | null;
  creadoEn: Date;
  actualizadoEn: Date | null;
  idUsuario: number;
}

export interface ServicioT {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  estado: number;
  tratamientos?: ServicioTratamientoT[] | null;
  creadoEn: Date;
  actualizadoEn?: Date | null;
  idUsuario: number;
}


export interface TratamientoT {
  id: number;
  descripcion: string;
  estado: number;
  diagnostico: string | null;
  historialMascotaId: number;
  pagoId: number | null;
  pago?: PagoT | null;
  medicamentos?: TratamientoMedicamentoT[] | null;
  servicios?: ServicioTratamientoT[] | null;
  creadoEn: Date;
  actualizadoEn: Date | null;
  idUsuario: number;
}

export interface ServicioTratamientoT {
  precioServicio: string;
  servicioId: number;
  tratamientoId: number;
  servicio?: ServicioT | null;
  tratamiento?: TratamientoT | null;
}

export interface MedicamentoT {
  id: number;
  imagen: string | null;
  nombre: string;
  codigo: string | null;
  descripcion: string | null;
  indicaciones: string | null;
  unidadMedida: string | null;
  stock: number;
  cantidadPorUnidad: number;
  sobrante: number;
  estado: number;
  precio: string;
  tipo: TipoMedicamento;
  tratamientos?: TratamientoMedicamentoT[] | null;
  creadoEn: Date;
  actualizadoEn?: Date | null;
  idUsuario: number;
}

export interface TratamientoMedicamentoT {
  tratamientoId: number;
  medicamentoId: number;
  cantidad: number;
  costoUnitario: string;
  dosificacion: string | null;
  medicamento?: MedicamentoT | null;
  tratamiento?: TratamientoT | null;
}

export interface PagoT {
  id: number;
  total: string;
  fechaPago: Date | null;
  detalle: string | null;
  estado: number;
  esAyudaVoluntaria: boolean;
  tratamiento: TratamientoT | null;
  creadoEn: Date;
  actualizadoEn?: Date | null;
  idUsuario: number;
}

export interface ReservaMedicaT {
  id: number;
  fechaReserva: Date;
  detalles: string | null;
  estado: number;
  usuarioId: number;
  usuario: UsuarioT;
  creadoEn: Date
  actualizadoEn: Date | null;
  idUsuario: number;
}

















//INTERFACES EXPERIMENTALES
//ESTA INTERFAZ SOLO SE MUESTRA EN EL PAGE.TSX DE HISTORIALES, Y SOLO ES PARA VISTA
export interface HistorialMedicoVistaT {
  historialMascotaId: number;
  estado: number;
  creadoEn: Date;
  actualizadoEn: Date | null;
  nombreMascota: string;
  imagenMascota?: string | null;
  especieMascota: string;
  razaMascota?: string | null;
  sexoMascota: string;
  tratamientos: {
    id: number;
    descripcion: string;
    creadoEn: Date;
    actualizadoEn: Date | null;
    idUsuario: number;
  }[];
}

//ESTA INTERFAZ SOLO SE MUESTRA EN EL PAGE.TSX DE [historialID] Y ES EL HISTORIAL COMPLETO CON EL ARRAY DE TRATAMEINTOS
export interface HistorialMedicoCompleto {
  historialMascotaId: number;
  descripcionTratamientos: string | null;
  estado: number;
  creadoEn: Date;
  actualizadoEn?: Date | null;
  idUsuario: number;
  mascota: {
    id: number;
    nombre: string;
    imagen: string | null;
    especie: TipoMascota;
    raza: string | null;
    fechaNacimiento: Date | null;
    sexo: Sexo;
    detalles: string | null;
    peso: number | null;
    estado: number;
    idPropietario: number | null;
    esterilizado: boolean | null;
    creadoEn: Date;
    actualizadoEn?: Date | null;
    idUsuario: number;
    usuario: {
      id: number;
      name: string;
      apellidoPat: string | null;
      apellidoMat: string | null;
      ci: string | null;
      rol: RolUsuario;
      sexo: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      celular: string | null;
      direccion: string | null;
      estado: number;
      authDobleFactor: boolean;
      createdAt: Date;
      updatedAt: Date | null;
      idUsuario: number | null;
    } | null;
  };
  tratamientos: TratamientoT[];
}



export interface TratamientoCompleto {
  id: number;
  descripcion: string;
  estado: number;
  diagnostico: string | null;
  historialMascotaId: number;
  pagoId: number | null;
  pago: PagoT | null;
  medicamentos: TratamientoMedicamentoT[];
  servicios: ServicioTratamientoT[];
  creadoEn: Date;
  actualizadoEn?: Date | null;
  idUsuario: number;
}






//PARA EL FORMULARIO Y EL ESQUEMA DE ZOD
export interface TratamientoFormT {
  descripcion: string;
  estado: number;
  diagnostico: string | null;
  historialMascotaId: number;
  servicios: STFormT[];
  medicamentos: TMFormT[];
  total: number;
  detalle: string | null;
  esAyudaVoluntaria: boolean;
}

export interface TMFormT {
  medicamentoId: number;
  cantidad: number;
  costoUnitario: string;
  dosificacion: string | null;
  medicamento?: MedicamentoT | null;
}

export interface STFormT {
  precioServicio: string;
  servicioId: number;
  servicio?: ServicioT | null;
}