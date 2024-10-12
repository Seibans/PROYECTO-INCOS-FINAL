"use server";
import Decimal from 'decimal.js';

import * as z from "zod";
import { ServicioSchema} from "@/schemas";
import { prisma } from "@/lib/prisma"
import { ServicioT } from '@/types';
import { usuarioIdActual } from "@/lib/auth";
import { formatearNombre } from '@/lib/formatearNombre';

export const obtenerServicios = async (): Promise<ServicioT[]> => {
    try {
        const servicios = await prisma.servicio.findMany({
            where: {
                estado: 1,
            },
            orderBy: {
                creadoEn: 'desc',
            }
        });
        const servicio = servicios.map((servicio) => ({
            ...servicio,
            precio: new Decimal(servicio.precio).toNumber().toFixed(2),
        }));
        return servicio;
    } catch (error) {
        console.error("Error al obtener servicios:", error);
        throw new Error("Ocurrió un error al obtener los servicios.");
    }
};


export const registrarServicio = async (values: z.infer<typeof ServicioSchema>) => {
    const validatedServicio = ServicioSchema.safeParse(values);
    if (!validatedServicio.success) {
        return { error: "Campos Inválidos!" };
    }
    const { nombre, descripcion, precio } = validatedServicio.data;
    const nombreF = formatearNombre(nombre);
    const descripcionF = formatearNombre(descripcion);
    try {
        const idUActual = await usuarioIdActual();
        const servicio = await prisma.servicio.create({
            data: {
                nombre: nombreF,
                descripcion: descripcionF,
                precio,
                idUsuario: idUActual,
            },
        });

        return { success: "Servicio Registrado Correctamente!" };
    } catch (error) {
        console.error("Error al registrar el servicio:", error);
        return { error: "Ocurrió un error al registrar el servicio." };
    }
};


export const editarServicio = async (
    values: z.infer<typeof ServicioSchema>,
    idServicio: number,
) => {
    try {
        const validatedFields = ServicioSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Campos Inválidos!" };
        }
        const { nombre, descripcion, precio } = validatedFields.data;
        const nombreF = formatearNombre(nombre);
        const descripcionF = formatearNombre(descripcion);

        const servicioActualizado = await prisma.servicio.update({
            where: { id: idServicio },
            data: {
                nombre: nombreF,
                descripcion: descripcionF,
                precio,
                idUsuario: await usuarioIdActual(),
            },
        });

        return { success: "Servicio actualizado correctamente!" };
    } catch (error) {
        console.error("Error al editar el servicio:", error);
        return { error: "Ocurrió un error al editar el servicio." };
    }
};


export const obtenerServicio = async (id: number) => {
    try {
        const servicio = await prisma.servicio.findUnique({
            where: {
                id,
            },
        });

        if (!servicio) {
            return null;
        }

        const precioDecimal = servicio.precio ? new Decimal(servicio.precio) : new Decimal(0);

        return {
            ...servicio,
            precio: precioDecimal.toNumber().toFixed(2),
        };
    } catch (error) {
        console.error("Error al obtener el servicio:", error);
        throw new Error("Ocurrió un error al obtener el servicio.");
    }
};

export const eliminarServicio = async (id: number) => {
    try {
        const servicio = await prisma.servicio.delete({
            where: { id },
        });

        if (!servicio) return { error: "Servicio no encontrado" };
        return { success: "El servicio fue eliminado correctamente" };
    } catch (error) {
        console.error("Error al eliminar el servicio:", error);
        return { error: "Ocurrió un error al eliminar el servicio." };
    }
};

export const deshabilitarServicio = async (id: number) => {
    try {
        const usuarioActualId = await usuarioIdActual();

        if (!usuarioActualId || isNaN(usuarioActualId)) {
            throw new Error('ID del usuario autenticado no es válido');
        }

        const servicio = await prisma.servicio.update({
            where: { id },
            data: {
                estado: 0,  // Cambiamos el estado a 0 para deshabilitar
                idUsuario: usuarioActualId,
            },
        });

        if (!servicio) return { error: "Servicio no encontrado" };
        return { success: "El servicio fue deshabilitado correctamente" };
    } catch (error) {
        console.error("Error al deshabilitar el servicio:", error);
        return { error: "Ocurrió un error al deshabilitar el servicio." };
    }
};










// export const registrarMedicamento = async (values: z.infer<typeof MedicamentoSchema>) => {
//     const validatedFields = MedicamentoSchema.safeParse(values);

//     if (!validatedFields.success) {
//         return { error: "Campos Inválidos!" };
//     }

//     const { nombre, descripcion, stock, precio, tipo } = validatedFields.data;


// export const registrarMedicamento = async (values: FormData) => {
//     try {
//         const nombre = values.get('nombre') as string;
//         const descripcion = values.get('descripcion') as string;
//         const stock = parseInt(values.get('stock') as string, 10);
//         const precio = parseFloat(values.get('precio') as string);
//         const tipo = values.get('tipo') as TipoMedicamento;
//         const archivoImagen = values.get('imagen') as File | null;
//         let rutaImagen = null;

//         if (archivoImagen) {
//             const nombreUnico = `${uuidv4()}_${archivoImagen.name}`;
//             const rutadeAlmacenamiento = path.join(process.cwd(), 'public', 'uploads', 'admin','medicamentos',nombreUnico);
//             await fs.ensureDir(path.dirname(rutadeAlmacenamiento));

//             const arrayBuffer = await archivoImagen.arrayBuffer();
//             const buffer = new Uint8Array(arrayBuffer);
//             await fs.writeFile(rutadeAlmacenamiento, buffer);
//             rutaImagen = `${process.env.NEXT_PUBLIC_APP_URL}/uploads/admin/medicamentos/${nombreUnico}`;
//         }
//         const idUActual = await usuarioIdActual();
//         const medicamento = await prisma.medicamento.create({
//             data: {
//                 nombre,
//                 descripcion,
//                 stock,
//                 precio,
//                 tipo,
//                 idUsuario: idUActual,
//                 imagen: rutaImagen,
//             },
//         });

//         return { success: "Medicamento Registrado Correctamente!" };
//     } catch (error) {
//         console.error("Error al registrar medicamento:", error);
//         return { error: "Ocurrió un error al registrar el medicamento." };
//     }
// };



// export const editarMedicamento = async (values: z.infer<typeof MedicamentoSchema>, idMedicamento: number) => {
//     const validatedFields = MedicamentoSchema.safeParse(values);

//     if (!validatedFields.success) {
//         return { error: "Campos Inválidos!" };
//     }

//     try {
//         const idUActual = await usuarioIdActual();
//         const medicamentoActualizado = await prisma.medicamento.update({
//             where: {
//                 id: idMedicamento
//             },
//             data: {
//                 ...values,
//                 idUsuario: idUActual,
//             }
//         })

//         return { success: "Medicamento Editado Correctamente!" };
//     } catch (error) {
//         console.error("Error al actualizar el medicamento:", error);
//         return { error: "Ocurrió un error al actualizar el medicamento." };
//     }







// const validatedFields = MedicamentoSchema.safeParse(values);
// if (!validatedFields.success) {
//     return { error: "Campos Inválidos!" };
// }

// const { nombre, descripcion, stock, precio, tipo, archivo } = validatedFields.data;
// };