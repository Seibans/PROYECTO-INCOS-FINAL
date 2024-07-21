import { getUserByEmail } from "@/data/user";
import { RolUsuario } from "@prisma/client";
import * as z from "zod";


export const ConfiguracionSchema = z.object({
    name: z.optional(z.string()),
    authDobleFactor: z.optional(z.boolean()),
    rol: z.enum([RolUsuario.Administrador, RolUsuario.Usuario]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(1)),
    nuevoPassword: z.optional(z.string().min(6, {
        message: "* La Nueva Contraseña debe ser de mínimo 6 caracteres"
    })),
}).refine((data) => {
    if(data.password && !data.nuevoPassword){
        return false;
    }
    return true;
}, {
    message: "Su Nueva Contraseña es Necesaria",
    path: ["nuevoPassword"],
}).refine((data) => {
    if(data.nuevoPassword && !data.password){
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
    })
});