import { TipoMedicamento } from "@prisma/client";

export interface MedicamentoT {
    id: number;
    nombre: string;
    descripcion: string | null;  // Permitir que sea string o null
    stock: number;
    precio: number;  // 'precio' es un number en lugar de Decimal
    tipo: TipoMedicamento;
    creadoEn: Date;
    actualizadoEn: Date;
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
  