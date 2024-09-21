import { RolUsuario, Sexo, TipoMascota, TipoMedicamento } from "@prisma/client";
import * as z from "zod";

export const RegistroSchema = z.object({
    name: z.string().min(2, {
        message: "* El o los Nombres son requeridos"
    }).max(50, {
        message: "* El nombre no puede tener más de 50 caracteres"
    }).refine((value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value), {
        message: "* El nombre solo puede contener letras y espacios"
    }),

    apellidoPat: z.string()
        .min(2, {
            message: "* El apellido paterno es requerido"
        })
        .max(40, {
            message: "* El apellido paterno no puede tener más de 40 caracteres"
        })
        .refine((value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value), {
            message: "* El apellido paterno solo puede contener letras y espacios"
        }),
    apellidoMat: z.preprocess((value) => value === "" ? undefined : value, z.optional(
        z.string().max(40, {
            message: "* El apellido materno no puede tener más de 40 caracteres"
        }).refine((value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value), {
            message: "* El apellido materno solo puede contener letras y espacios"
        })
    )),
    ci: z.preprocess((value) => value === "" ? undefined : value, z.optional(
        z.string().max(18, {
            message: "* El C.I. no puede tener más de 18 caracteres"
        }).refine((value) => /^\d{7,8}(-[A-Z]{2})?$/.test(value), {
            message: "* Ingrese Un C.I. válido"
        })
    )),
    sexo: z.optional(z.enum(["M", "F"])),
    email: z.string({
        invalid_type_error: "Ingrese Caracteres válidos"
    }).email({
        message: "* El Email es requerido"
    }).max(150, {
        message: "* El Email no puede tener más de 150 caracteres"
    }),
    password: z.string().min(6, {
        message: "* La Contraseña debe ser de mínimo 6 caracteres"
    }),
    repetirPassword: z.string().min(6, {
        message: "* La Contraseña Repetida debe ser de mínimo 6 caracteres"
    }),
    celular: z.optional(
        z.string()
            .max(17, {
                message: "* El Celular no puede tener más de 17 caracteres"
            })
            .refine((celular) => /^\+\d{10,15}$/.test(celular),
                "Numero de Celular Invalido")
    ),
    direccion: z.optional(
        z.string()
            .max(255, { message: "La dirección no debe tener más de 255 caracteres." })
    ),
}).refine((data) =>
    data.password === data.repetirPassword, {
    message: "* Las contraseñas no coinciden",
    path: ["repetirPassword"],
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

export const CambiarPasswordSchema = z.object({
    password: z.optional(
        z.string().min(6, {
            message: "* La Contraseña debe ser de mínimo 6 caracteres"
        })
    ),
    nuevoPassword: z.optional(
        z.string().min(6, {
            message: "* La Nueva Contraseña debe ser de mínimo 6 caracteres"
        })
    ),
    repetirPassword: z.optional(
        z.string().min(6, {
            message: "* La Contraseña Repetida debe ser de mínimo 6 caracteres"
        })
    ),
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
}).refine((data) =>
    data.nuevoPassword === data.repetirPassword, {
    message: "* Las contraseñas no coinciden",
    path: ["repetirPassword"],
});

export const ResetSchema = z.object({
    email: z.string({
        invalid_type_error: "Ingrese Caracteres válidos"
    }).email({
        message: "* El Email es requerido"
    })
});


export const ConfiguracionSchema = z.object({
    name: z.preprocess((value) => value === "" ? undefined : value, z.optional(
        z.string().min(2, {
            message: "* El o los Nombres son requeridos"
        }).max(50, {
            message: "* El nombre no puede tener más de 50 caracteres"
        }).refine((value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value), {
            message: "* El nombre solo puede contener letras y espacios"
        })
    )),
    apellidoPat: z.preprocess((value) => value === "" ? undefined : value, z.optional(
        z.string()
        .min(2, {
            message: "* El apellido paterno es requerido"
        })
        .max(40, {
            message: "* El apellido paterno no puede tener más de 40 caracteres"
        })
        .refine((value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value), {
            message: "* El apellido paterno solo puede contener letras y espacios"
        })
    )),
    apellidoMat: z.preprocess((value) => value === "" ? undefined : value, z.optional(
        z.string().max(40, {
            message: "* El apellido materno no puede tener más de 40 caracteres"
        }).refine((value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value), {
            message: "* El apellido materno solo puede contener letras y espacios"
        })
    )),
    ci: z.preprocess((value) => value === "" ? undefined : value, z.optional(
        z.string().max(18, {
            message: "* El C.I. no puede tener más de 18 caracteres"
        }).refine((value) => /^\d{7,8}(-[A-Z]{2})?$/.test(value), {
            message: "* Ingrese Un C.I. válido"
        })
    )),
    // sexo: z.optional(z.enum(["M", "F"])),
    sexo: z.preprocess(
        (value) => value === undefined || value === "" ? undefined : value, 
        z.optional(z.enum(["M", "F"]))
      ),
    email: z.optional(z.string().email()),
    // password: z.optional(z.string().min(1)),
    rol: z.enum([RolUsuario.Administrador, RolUsuario.Usuario]),
    celular: z.optional(z.string().refine((celular) => /^\+\d{10,15}$/.test(celular), "Numero de Celular Invalido")),
    direccion: z.optional(z.string()
        .max(255, { message: "La dirección no debe tener más de 255 caracteres." }),
    ),
    // TODO:Posible error
    estado: z.optional(z.number().positive({ message: "El estado debe ser un número positivo" })),
    authDobleFactor: z.optional(z.boolean()),
    // nuevoPassword: z.optional(z.string().min(6, {
    //     message: "* La Nueva Contraseña debe ser de mínimo 6 caracteres"
    // })),
});

export const MascotaSchema = z.object({
    nombre: z.string()
        .min(1, "El nombre es obligatorio")
        .max(50, "El nombre no puede tener más de 50 caracteres"),
    especie: z.enum([TipoMascota.Perro, TipoMascota.Gato, TipoMascota.Otro],
        { message: "Por favor selecciona la especie" }),
    raza: z.string()
        .min(1, "La raza es obligatoria")
        .max(40, "La raza no puede tener más de 40 caracteres"),
    // fechaNacimiento: z.date().refine(value => value !== undefined, {
    //     message: "La fecha de nacimiento es obligatoria",
    //     path: ['fechaNacimiento']
    // }),
    fechaNacimiento: z.optional(z.date(
        // {
        //     required_error: "La fecha de nacimiento es requerida",
        // }
    ).refine(date => date < new Date(), {
        message: "La fecha de nacimiento no puede ser futura",
    })),
    sexo: z.enum([Sexo.Macho, Sexo.Hembra], {
        message: "Por favor selecciona el género de la mascota",
        required_error: "El género es obligatorio",
    }),
    detalles: z.optional(
        z.string()
            .max(255, { message: "La descripción no debe tener más de 255 caracteres." })
    ),
    imagen: z.string().optional(),
    // estado: z.preprocess((val) => parseInt(val as string, 10), z.number().positive({ message: "El estado debe ser un número positivo" })),
    esterilizado: z.boolean().optional(),
    alergias: z.optional(
        z.string()
            .max(255, { message: "Las alergias no deben tener más de 255 caracteres." })
    ),
    observaciones: z.optional(
        z.string()
            .max(255, { message: "Las observaciones no deben tener más de 255 caracteres." })
    ),
});

export const MedicamentoSchema = z.object({
    nombre: z.string()
        .min(1, { message: "El nombre es obligatorio" })
        .max(100, { message: "El nombre no puede tener más de 100 caracteres" }),
    descripcion: z.string()
        .max(255, { message: "La descripción no puede tener más de 255 caracteres" })
        .optional(),
    stock: z.preprocess((val) => parseInt(val as string, 10), z.number().positive({ message: "El stock debe ser un número positivo" })),
    // precio: z.preprocess((val) => parseFloat(val as string), z.number().positive({ message: "El precio debe ser un número positivo" })),
    precio: z.string().min(1, "El precio es requerido"),
    imagen: z.instanceof(File, { message: "La imagen es requerida" }),
    // stock: z.number()
    //     .int({ message: "El stock debe ser un número entero" })
    //     .positive({ message: "El stock debe ser un número positivo" }),
    // precio: z.number()
    //     .positive({ message: "El precio debe ser un número positivo" }),
    tipo: z.enum([TipoMedicamento.Pastilla, TipoMedicamento.Vacuna, TipoMedicamento.Inyeccion, TipoMedicamento.Crema, TipoMedicamento.Suero, TipoMedicamento.Polvo, TipoMedicamento.Gel, TipoMedicamento.Otro], {
        errorMap: () => ({ message: "El tipo de medicamento es inválido" })
    }),
    archivo: z.optional(z.instanceof(File, { message: "El archivo es requerido" })),
});

export const PagoSchema = z.object({
    usuarioId: z.number({ required_error: "El ID del usuario es obligatorio" }),
    total: z.preprocess((val) => parseInt(val as string, 10), z.number().int({ message: "El total debe ser un número entero" }).positive({ message: "El total debe ser un número positivo" })),
    cuotas: z.preprocess((val) => parseInt(val as string, 10), z.number().int({ message: "Las cuotas deben ser un número entero" }).positive({ message: "Las cuotas deben ser un número positivo" })),
    // cuotas: z.number()
    //     .int({ message: "Las cuotas deben ser un número entero" })
    //     .positive({ message: "Las cuotas deben ser un número positivo" }),
    montoCuota: z.preprocess((val) => parseFloat(val as string), z.number().positive({ message: "El monto de la cuota debe ser un número positivo" })),
    detalle: z.string().max(100, { message: "El detalle no puede tener más de 100 caracteres" }).optional(),
    estado: z.preprocess((val) => parseInt(val as string, 10), z.number().positive({ message: "El estado debe ser un número positivo" })),
    fechaPago: z.date().optional(),
});

export const ReservaMedicaSchema = z.object({
    fechaReserva: z.date({
        required_error: "La fecha de la reserva es obligatoria y debe ser válida"
    }),
    detalles: z.string().max(255, { message: "La descripción no puede tener más de 255 caracteres." }).optional(),
    servicio: z.string()
        .min(1, { message: "El servicio es obligatorio" })
        .max(150, { message: "El servicio no puede tener más de 150 caracteres" }),
    estado: z.preprocess((val) => parseInt(val as string, 10), z.number().positive({ message: "El estado debe ser un número positivo" })),
});


export const formSchema = z.object({
    fechaReserva: z.date({
      required_error: "Por favor seleccione una fecha.",
    }),
    hora: z.object({
      hour: z.string().min(1, "Seleccione la hora"),
      minute: z.string().min(1, "Seleccione los minutos"),
      period: z.string().min(1, "Seleccione AM/PM"),
    }),
    detalles: z.string().min(1, "Por favor ingrese los detalles de la cita."),
    servicio: z.string().min(1, "Por favor seleccione un servicio."),
  })
