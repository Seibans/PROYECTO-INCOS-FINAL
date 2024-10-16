"use client";
import { E164Number } from "libphonenumber-js/core";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Components UI
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '@/components/ui/textarea';
import { FaEye, FaEyeSlash } from "react-icons/fa";

//Mi components
import { CardWrapper } from "@/components/auth/card-wrapper.component";

// ServerComponent
import { registro } from "@/actions/registro";
// Schema
import { RegistroSchema } from "@/schemas";

export const RegistroForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof RegistroSchema>>({
    resolver: zodResolver(RegistroSchema),
    defaultValues: {
      name: "",
      apellidoPat: "",
      apellidoMat: undefined,
      ci: undefined,
      sexo: undefined,
      celular: undefined,
      email: "",
      password: "",
      repetirPassword: "",
      direccion: undefined
    },
  });

  const onSubmit = (values: z.infer<typeof RegistroSchema>) => {
    console.log(values);
    startTransition(() => {
      toast.promise(registro(values), {
        loading: "Cargando...",
        success: (data) => {
          if (data.error) {
            throw new Error(data.error);
          } else {
            router.push("/auth/login");
            return `${data.success}`;
          }
        },
        error: (error) => error.message,
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Crea una Cuenta"
      backButtonLabel="Ya tienes una cuenta?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="apellidoPat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido Paterno:</FormLabel>
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
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                disabled={isPending}
                control={form.control}
                name="sexo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genero:</FormLabel>
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
              <div className="flex flex-col gap-6 xl:flex-row">
                <FormField
                  control={form.control}
                  name="celular"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="shad-input-label">Celular:</FormLabel>
                      <FormControl>
                        <PhoneInput
                          defaultCountry="BO"
                          placeholder="+591 00000000"
                          international
                          withCountryCallingCode
                          value={field.value as E164Number | undefined}
                          onChange={field.onChange}
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
              </div>
            </div>
            <FormField
              disabled={isPending}
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direccion:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ciudad, Zona, Calle, Numero, Localidad"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="veterinaria@ejemplo.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña *:</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type={showPassword ? "text" : "password"}
                        className="pr-10"
                      />
                    </FormControl>
                    <div
                      className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repetirPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repite tu Contraseña *:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type={showPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} type="submit" className="w-full bg-gradient">
            Crear Cuenta
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
