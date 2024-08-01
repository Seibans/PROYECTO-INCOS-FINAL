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