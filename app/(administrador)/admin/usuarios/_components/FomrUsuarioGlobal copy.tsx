'use client'

import { useState, useTransition, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { RegistroAdminSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';
import { editarUsuario } from '@/actions/usuarios';
import { registrarUsuarioByAdmin, registrarUsuarioConImagen } from '@/actions/registro';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RolUsuario } from "@prisma/client";
import InputImagen, { ImageUploaderRef } from '@/components/admin/FormInputImagen';
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import 'react-phone-number-input/style.css';
import { UsuarioT } from "@/types";

type FormUsuarioGlobalProps = {
  usuario?: UsuarioT;
  setabrirModal?: (open: boolean) => void;
  isDialog?: boolean;
};

export const FormUsuarioGlobal = ({ usuario, setabrirModal, isDialog = false }: FormUsuarioGlobalProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isInitialRender, setIsInitialRender] = useState(true);

  const defaultValues = usuario ? {
    name: usuario.name,
    apellidoPat: usuario.apellidoPat || '',
    apellidoMat: usuario.apellidoMat || '',
    ci: usuario.ci || '',
    sexo: usuario.sexo as "M" | "F" | undefined,
    email: usuario.email,
    celular: usuario.celular || '',
    direccion: usuario.direccion || '',
    rol: usuario.rol as RolUsuario,
    estado: usuario.estado,
  } : {
    name: "",
    apellidoPat: "",
    apellidoMat: "",
    ci: "",
    sexo: undefined,
    email: "",
    celular: "",
    direccion: "",
    rol: RolUsuario.Usuario,
    estado: 1,
  };

  const form = useForm<z.infer<typeof RegistroAdminSchema>>({
    resolver: zodResolver(RegistroAdminSchema),
    defaultValues,
  });

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  const onSubmit = async (values: z.infer<typeof RegistroAdminSchema>) => {
    startTransition(async () => {
      let action;
      if (usuario) {
        action = editarUsuario(values, usuario.id);
      } else {
        action = values.archivo
          ? registrarUsuarioConImagen(objectToFormData(values))
          : registrarUsuarioByAdmin(values);
      }

      toast.promise(action, {
        loading: "Cargando...",
        success: (data) => {
          if (data.error) {
            throw new Error(data.error);
          } else {
            router.refresh();
            if (setabrirModal) {
              setabrirModal(false);
            }
            return `${data.success}`;
          }
        },
        error: (error) => error.message,
      });
    });
  };

  const objectToFormData = (obj: any): FormData => {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'archivo' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value.toString());
        }
      }
    });
    return formData;
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellidoPat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido Paterno</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido Paterno" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellidoMat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido Materno</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido Materno" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ci"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carnet de Identidad</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567-A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="sexo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-6"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="M" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Hombre
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="F" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Mujer
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="celular"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry="BO"
                    placeholder="+591 00000000"
                    international
                    withCountryCallingCode
                    value={field.value as E164Number | undefined}
                    onChange={(value) => field.onChange(value || '')}
                    className="input-phone"
                    countries={['PE', 'BO', 'AR', 'CL', 'CO', 'EC', 'MX', 'PY', 'UY', 'VE']}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ciudad, Zona, Calle, Número, Localidad"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol del Usuario *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={RolUsuario.Usuario}>Usuario (Cliente)</SelectItem>
                    <SelectItem value={RolUsuario.Veterinario}>Veterinario</SelectItem>
                    <SelectItem value={RolUsuario.Administrador}>Administrador</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {!usuario && (
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen de Perfil del Usuario (Opcional)</FormLabel>
                  <FormControl>
                    <InputImagen
                      onImageChange={(file) => {
                        if (file) {
                          field.onChange(file.name);
                          form.setValue('archivo', file);
                        } else {
                          field.onChange('');
                          form.setValue('archivo', undefined);
                        }
                        form.trigger('image');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex justify-center">
            <Button disabled={isPending} type="submit" className="bg-gradient" variant="outline">
              {usuario ? 'Actualizar Usuario' : 'Registrar Usuario'}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};