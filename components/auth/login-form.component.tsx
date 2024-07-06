"use client";

import * as z from "zod";
import { useState, useTransition } from "react";

//Estos se usan en formularios de react
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';  
import Link from "next/link";

// Components UI
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//Mi components
import { CardWrapper } from "@/components/auth/card-wrapper.component";
import { FormError } from "@/components/form-error.component";
import { FormSuccess } from "@/components/form-success.component";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

// ServerComponent
import { login } from "@/actions/login";
// Schema
import { LoginSchema } from "@/schemas";

export const LoginForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [dobleFactor, setDobleFactor] = useState(false);
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

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
    setDobleFactor(false);
    startTransition(() => {
      // login(values, callbackUrl).then((data: any) => {
      //   if (data.error) {
      //     throw new Error(data.error || urlError);
      //   } else {
      //     // TODO: Cambiar cuando agreguemos 2FA
      //     setSuccess(`${data.success}`);
      //   }
      // }).catch((error: any) => {
      //   setError(error.message);
      // });

      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
            // throw new Error(data?.error || urlError);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }

          if (data?.dobleFactor) {
            setDobleFactor(true);
          }
        })
        .catch((error: any) => {
          setError(error.message);
        });

      // .catch(()=> setError("Ocurrió un Error inesperado"));
    });
  };

  // El error de la data se resuelve en el minuto 3:45
  // const onSubmit = (values: z.infer<typeof LoginSchema>) => {
  //   console.log(values);
  //   startTransition(() => {
  //     toast.promise(login(values, callbackUrl), {
  //       loading: "Cargando...",
  //       success: (data: any) => {
  //         if (data.error) {
  //           throw new Error(data.error || urlError);
  //         } else {
  //           // TODO: Cambiar cuando agreguemos 2FA
  //           return `${data.success}`;
  //         }
  //       },
  //       error: (error) => error.message,
  //     });
  //   });
  // };

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
            {dobleFactor && (
              <FormField
                control={form.control}
                name="codigo"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex space-x-2">
                      <FormLabel>Código de Protección</FormLabel>
                    </div>
                    <FormControl className="flex items-center gap-2">
                      {/* <Input
                      {...field}
                      disabled={isPending}
                      placeholder="123456"
                      /> */}
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Por Favor introduzca el código de verificación enviado a su correo
                    </FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            )}
            {!dobleFactor && (
              <>
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
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">
                          Olvidaste tu Contraseña?
                        </Link>
                      </Button>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full hover:bg-blue-700">
            {dobleFactor ? "Confirmar" : "Ingresar"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
