"use client";

import * as z from "zod";
import { useState, useTransition } from "react";

//Estos se usan en formularios de react
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from 'sonner';


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

//Mi components
import { CardWrapper } from "@/components/auth/card-wrapper.component";

// ServerComponent
import { login } from "@/actions/login";
// Schema
import { LoginSchema } from "@/schemas";

export const LoginForm = () => {

  // const [error, setError] = useState<string | undefined>("");
  // const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  // TODO: Esto obtiene el error del mismo correo las cuentas de google, github y facebook
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "El correo  ya está en uso con otro proveedor!"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  // El error de la data se resuelve en el minuto 3:45
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    startTransition(() => {
      toast.promise(login(values, callbackUrl), {
        loading: "Cargando...",
        success: (data: any) => {
          if (data.error) {
            throw new Error(data.error || urlError);
          } else {
            // TODO: Cambiar cuando agreguemos 2FA
            return `${data.success}`;
          }
        },
        error: (error) => error.message,
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Bienvenido de nuevo!"
      backButtonLabel="No tienes una Cuenta?"
      backButtonHref="/auth/register"
      showSocial
    >
      {/* obtiene todas las propiedades desestructurandolas excepto children */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          action=""
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex space-x-2">
                    <FormLabel>Email</FormLabel>
                    <FormMessage></FormMessage>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="pablo.a@ejemplo.com"
                      type="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex space-x-2">
                    <FormLabel>Password</FormLabel>
                    <FormMessage></FormMessage>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className="w-full hover:bg-blue-700">
            Ingresar
          </Button>
        </form>
      </Form>
      <Toaster richColors position="top-right" />
    </CardWrapper>
  );
};
