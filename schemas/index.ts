import { RolUsuario, Sexo, TipoMascota } from "@prisma/client";
import * as z from "zod";


export const ConfiguracionSchema = z.object({
    name: z.optional(z.string()),
    authDobleFactor: z.optional(z.boolean()),
    rol: z.enum([RolUsuario.Administrador, RolUsuario.Usuario]),
    email: z.optional(z.string().email()),
    celular: z.optional(z.string().refine((celular) => /^\+\d{10,15}$/.test(celular), "Numero de Celular Invalido")),
    password: z.optional(z.string().min(1)),
    nuevoPassword: z.optional(z.string().min(6, {
        message: "* La Nueva Contraseña debe ser de mínimo 6 caracteres"
    })),
}).refine((data) => {
    if (data.password && !data.nuevoPassword) {
        return false;
    }
    return true;
}, {
    message: "Su Nueva Contraseña es Necesaria",
    path: ["nuevoPassword"],
}).refine((data) => {
    if (data.nuevoPassword && !data.password) {
        return false;
    }
    return true;
}, {
    message: "Su Contraseña es Necesaria",
    path: ["password"],
});

export const LoginSchema = z.object({
    email: z.string({
        invalid_type_error: "Ingrese Caracteres válidos"
    }).email({
        message: "* El Email es requerido"
    }),
    password: z.string().min(1, {
        message: "* La Contraseña es requerida"
    }),
    codigo: z.optional(z.string()),
});

export const NuevoPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "* La Contraseña debe ser de mínimo 6 caracteres"
    })
});

export const ResetSchema = z.object({
    email: z.string({
        invalid_type_error: "Ingrese Caracteres válidos"
    }).email({
        message: "* El Email es requerido"
    })
});

export const RegisterSchema = z.object({
    email: z.string({
        invalid_type_error: "Ingrese Caracteres válidos"
    }).email({
        message: "* El Email es requerido"
    }),
    password: z.string().min(6, {
        message: "* La Contraseña debe ser de mínimo 6 caracteres"
    }),
    name: z.string().min(1, {
        message: "* El nombre es requerido"
    }),
    celular: z.optional(z.string().refine((celular) => /^\+\d{10,15}$/.test(celular), "Numero de Celular Invalido")),
});

export const MascotaSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio").max(255),
    especie: z.enum([TipoMascota.Perro, TipoMascota.Gato, TipoMascota.Otro], { message: "Por favor selecciona la especie" }),
    raza: z.string().min(1, "La raza es obligatoria"),
    // fechaNacimiento: z.date().refine(value => value !== undefined, {
    //     message: "La fecha de nacimiento es obligatoria",
    //     path: ['fechaNacimiento']
    // }),
    fechaNacimiento: z.date({
        required_error: "La fecha de nacimiento es requerida",
    }).refine(date => date < new Date(), {
        message: "La fecha de nacimiento no puede ser futura",
    }),
    sexo: z.enum([Sexo.Macho, Sexo.Hembra], {
        message: "Por favor selecciona el género de la mascota",
        required_error: "El género es obligatorio",
    }),
    detalles: z.string()
        .min(10, { message: "La descripción debe tener al menos 10 caracteres." })
        .max(160, { message: "La descripción no debe tener más de 160 caracteres." }),
    imagen: z.string().optional(),
    estado: z.string().min(1).max(1).default('1'),
});

export const MedicamentoSchema = z.object({
    id: z.number().optional(),
    nombre: z.string()
        .min(1, { message: "El nombre es obligatorio" })
        .max(100, { message: "El nombre no puede tener más de 100 caracteres" }),
    descripcion: z.string()
        .max(1000, { message: "La descripción no puede tener más de 1000 caracteres" })
        .optional(),
    stock: z.preprocess((val) => parseInt(val as string, 10), z.number().positive({ message: "El stock debe ser un número positivo" })),
    precio: z.preprocess((val) => parseFloat(val as string), z.number().positive({ message: "El precio debe ser un número positivo" })),

    // stock: z.number()
    //     .int({ message: "El stock debe ser un número entero" })
    //     .positive({ message: "El stock debe ser un número positivo" }),
    // precio: z.number()
    //     .positive({ message: "El precio debe ser un número positivo" }),
    tipo: z.enum(["Pastilla", "Vacuna", "Inyeccion", "Crema", "Suero", "Polvo", "Gel", "Otro"], {
        errorMap: () => ({ message: "El tipo de medicamento es inválido" })
    }),
    creadoEn: z.date().optional(),
    actualizadoEn: z.date().optional(),
});

export const PagoSchema = z.object({
    id: z.number().optional(),
    usuarioId: z.number({ required_error: "El ID del usuario es obligatorio" }),
    total: z.number()
        .positive({ message: "El total debe ser un número positivo" }),
    cuotas: z.number()
        .int({ message: "Las cuotas deben ser un número entero" })
        .positive({ message: "Las cuotas deben ser un número positivo" }),
    montoCuota: z.number()
        .positive({ message: "El monto de la cuota debe ser un número positivo" }),
    estado: z.enum(["Pendiente", "Pagado"], {
        errorMap: () => ({ message: "El estado del pago es inválido" })
    }),
    fechaPago: z.date().optional(),
    detalle: z.string().optional(),
    creadoEn: z.date().optional(),
    actualizadoEn: z.date().optional(),
});

export const ReservaMedicaSchema = z.object({
    id: z.number().optional(),
    fechaReserva: z.date({
        required_error: "La fecha de la reserva es obligatoria y debe ser válida"
    }),
    detalles: z.string().optional(),
    usuarioId: z.number().optional(),
    servicio: z.string()
        .min(1, { message: "El servicio es obligatorio" })
        .max(100, { message: "El servicio no puede tener más de 100 caracteres" }),
    estado: z.enum(["Pendiente", "Confirmada", "Cancelada"], {
        errorMap: () => ({ message: "El estado de la reserva es inválido" })
    }),
    creadoEn: z.date().optional(),
    actualizadoEn: z.date().optional(),
});
