import { TipoMedicamento } from "@prisma/client";

export interface MedicamentoT {
    id: number;
    nombre: string;
    descripcion: string | null;
    precio: any;
    stock: number;
    estado: number;
    tipo: TipoMedicamento;
    imagen: string | null;
    creadoEn: Date;
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
export interface TratamientoT {
    id: number;
    nombre: string;
    descripcion: string | null;
    precio: number;
    creadoEn: Date;
    actualizadoEn: Date | null;
    idUsuario: number;
}

export interface MascotaT {
    nombre: string;
    sexo: 'Macho' | 'Hembra';
    imagen: string | null;
    especie: 'Perro' | 'Gato' | 'Otro';
    raza: string | null;
}

export interface HistorialMedicoT {
    id: number;
    estado: number;
    creadoEn: Date;
    actualizadoEn: Date | null;
    nombreMascota: string;
    imagenMascota: string | null;
    especieMascota: 'Perro' | 'Gato' | 'Otro';
    razaMascota: string | null;
    sexoMascota: 'Macho' | 'Hembra';
    tratamientos: TratamientoT[];
}

export interface ReservaMedica {
    id: string
    fechaReserva: Date
    detalles: string
    servicio: string
    estado: 'pendiente' | 'completada' | 'cancelada'
    usuarioId: string
    creadoEn: Date
    actualizadoEn: Date
}