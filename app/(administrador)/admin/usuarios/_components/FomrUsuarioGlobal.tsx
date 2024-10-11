'use client'
import { E164Number } from "libphonenumber-js/core";
import 'react-phone-number-input/style.css';

import * as z from "zod";
import { useState, useTransition, useRef } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-number-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Textarea } from "@/components/ui/textarea";

import { registrarUsuarioByAdmin, registrarUsuarioConImagen } from '@/actions/registro';
import { editarUsuario } from '@/actions/usuarios';

import InputImagen, {ImageUploaderRef} from '@/components/admin/FormInputImagen';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { RegistroAdminSchema } from "@/schemas";
import { RolUsuario } from "@prisma/client";
import { UsuarioT } from "@/types";
import { PlusIcon } from "lucide-react";

type FormUsuarioGlobalProps = {
  usuario?: UsuarioT;
  setabrirModal?: (open: boolean) => void;
  isDialog?: boolean;
};

export const FormUsuarioGlobal = ({ usuario, setabrirModal, isDialog = false }: FormUsuarioGlobalProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

	const imageUploaderRef = useRef<ImageUploaderRef>(null);

  if (usuario?.estado == 0) {
    router.push("/admin/usuarios")
  }

  const defaultValues: z.infer<typeof RegistroAdminSchema> = usuario ? {
    name: usuario.name,
    apellidoPat: usuario.apellidoPat || '',
    apellidoMat: usuario.apellidoMat || undefined,
    ci: usuario.ci || undefined,
    sexo: usuario.sexo as "M" | "F" | undefined,
    email: usuario.email || undefined,
    celular: usuario.celular || undefined,
    direccion: usuario.direccion || undefined,
    rol: usuario.rol as "Usuario" | "Veterinario" | "Administrador",
    estado: usuario.estado || undefined,
    image: usuario.image || '',
  } : {
    name: "",
    apellidoPat: "",
    apellidoMat: undefined,
    ci: undefined,
    sexo: undefined,
    email: undefined,
    celular: undefined,
    direccion: undefined,
    rol: RolUsuario.Usuario,
    estado: 1,
    image: "",
  };

  const form = useForm<z.infer<typeof RegistroAdminSchema>>({
    resolver: zodResolver(RegistroAdminSchema),
    defaultValues,
  });

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

  const objectToFormData = (obj: z.infer<typeof RegistroAdminSchema>): FormData => {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres *:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Nombres"
                      type="text"
                      />
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
                  <FormLabel>Apellido Paterno *:</FormLabel>
                  <FormControl>
                    <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Apellido Paterno"
                        type="text"
                        />
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
                  <FormLabel>Apellido Materno:</FormLabel>
                  <FormControl>
                    <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Apellido Materno"
                        type="text"
                        />
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
                  <FormLabel>Carnet de Identidad:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="1234567-A"
                      type="text"
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
							disabled={isPending}
							control={form.control}
							name="sexo"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Genero::</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex gap-6 xl-justify-between"
										>
											<FormItem>
												<FormLabel className="radio-group">
													<FormControl>
														<RadioGroupItem value={"M"} />
													</FormControl>
													Hombre
												</FormLabel>
											</FormItem>
											<FormItem>
												<FormLabel className="radio-group">
													<FormControl>
														<RadioGroupItem value={"F"} />
													</FormControl>
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
                <FormLabel>Email *:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="correo@ejemplo.com"
                    type="email"
                    readOnly={usuario ? true : false}
                    />
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
                <FormLabel>Celular:</FormLabel>
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
                    countrySelectProps={{
                      className: 'bg-white text-black dark:bg-gray-800 dark:text-white',
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isPending}
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección:</FormLabel>
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
                <FormLabel>Rol del Usuario *:</FormLabel>
                <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
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
											ref={imageUploaderRef}
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
            <Button disabled={isPending} type="submit" className="bg-gradient" variant="expandIcon" Icon={PlusIcon} iconPlacement="right">
              {usuario ? 'Actualizar Usuario' : 'Registrar Usuario'}
            </Button>
          </div>
        </form>
      </Form>
  );
};