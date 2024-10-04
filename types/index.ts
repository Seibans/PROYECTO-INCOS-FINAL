import { RolUsuario, Sexo, TipoMascota, TipoMedicamento } from "@prisma/client";
import Decimal from "decimal.js";

export interface MedicamentoT {
    id: number;
    imagen: string | null;
    nombre: string;
    descripcion: string | null;
    indicaciones: string | null;
    unidadMedida: string | null;
    cantidadPorUnidad: number | null;
    stock: number;
    sobrante: number;
    estado: number;
    precio: string;
    tipo: TipoMedicamento;
    creadoEn: Date;
    actualizadoEn?: Date | null;
    idUsuario: number;
}

export interface TratamientoMedicamentoT {
    id: number;
    cantidad: number;
    costoUnitario: number;
    dosificacion: string | null;
    medicamento: MedicamentoT;
}

export interface ServicioT {
    id: number;
    nombre: string;
    descripcion: string;
    precio: string;
    estado: number;
    creadoEn: Date;
    actualizadoEn?: Date | null;
    idUsuario: number;
}

export interface TratamientoT {
    id: number;
    descripcion: string;
    diagnostico: string | null;
    estado: number;
    idPago: number;
    creadoEn: Date;
    actualizadoEn: Date | null;
    idUsuario: number;
    medicamentos: TratamientoMedicamentoT[];
    servicios: ServicioT[];
}




export interface MascotaT {
    id: number;
    nombre: string;
    sexo: 'Macho' | 'Hembra';
    imagen: string | null;
    especie: 'Perro' | 'Gato' | 'Otro';
    raza: string | null;
    fechaNacimiento: Date | null;
    detalles: string | null;
    peso: number | null;
    vacunas: any | null;
    estado: number;
    idPropietario: number | null;
    esterilizado: boolean | null;
    creadoEn: Date;
    actualizadoEn?: Date | null;
    idUsuario: number;
}

export interface HistorialMedicoT {
    id: number;
    mascotaId: number;
    descripcionTratamientos: string | null;
    estado: number;
    creadoEn: Date;
    actualizadoEn: Date | null;
    idUsuario: number;
    mascota: MascotaT;
    tratamientos: TratamientoT[];
}

export interface ReservaMedicaT {
    id: number;
    fechaReserva: Date;
    detalles: string | null;
    servicio: string;
    estado: number;
    usuarioId: number | null;
    creadoEn: Date
    actualizadoEn: Date | null;
    idUsuario: number;
}




export interface UsuarioT {
    id: number;
    name: string;
    apellidoPat: string | null;
    apellidoMat: string | null;
    ci: string | null;
    sexo: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    rol: string;
    celular: string | null;
    direccion: string | null;
    estado: number;
    authDobleFactor: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    idUsuario: number | null;
}



export interface HistorialMedicoCompleto {
    id: number;
    mascotaId: number;
    descripcionTratamientos: string | null;
    estado: number;
    creadoEn: Date;
    actualizadoEn: Date | null;
    idUsuario: number;
    mascota: {
      id: number;
      nombre: string;
      especie: TipoMascota;
      raza: string | null;
      fechaNacimiento: Date | null;
      sexo: Sexo;
      detalles: string | null;
      imagen: string | null;
      peso: number | null;
      vacunas: any | null;
      estado: number;
      idPropietario: number | null;
      esterilizado: boolean | null;
      creadoEn: Date;
      actualizadoEn: Date | null;
      idUsuario: number;
      usuario: {
        id: number;
        name: string;
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
      } | null;
    };
    tratamientos: TratamientoT[];
  }


  export interface TratamientoCompleto {
    id: number;
    descripcion: string;
    diagnostico: string | null;
    estado: number;
    historialMedicoId: number;
    pagoId: number | null;
    creadoEn: Date;
    actualizadoEn: Date | null;
    idUsuario: number;
    servicios: ServicioT[];
    medicamentos: {
      id: number;
      cantidad: number;
      costoUnitario: number;
      dosificacion: string | null;
      medicamento: MedicamentoT;
    }[];
  }




























  export interface HistorialMedicoVistaT {
    id: number;
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