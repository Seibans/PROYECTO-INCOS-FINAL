import { TipoMedicamento } from "@prisma/client";

export interface MedicamentoT {
    id: number;
    nombre: string;
    descripcion: string | null;  // Permitir que sea string o null
    precio: number;  // 'precio' es un number en lugar de Decimal
    stock: number;
    estado: number;
    tipo: TipoMedicamento;
    imagen: string | null;
    creadoEn: Date;
    actualizadoEn: Date | null;
    idUsuario: number;
}

// types.ts
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
    rol: string; // o el tipo correcto para el rol
    celular: string | null;
    direccion: string | null;
    estado: number;
    authDobleFactor: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    idUsuario: number | null;
}



// types.ts
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
