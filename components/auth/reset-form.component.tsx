"use client";

import * as z from "zod";
import { useState, useTransition } from "react";

//Estos se usan en formularios de react
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';

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
import { reset } from "@/actions/reset";
// Schema
import { ResetSchema } from "@/schemas";
import { FormError } from "../form-error.component";
import { FormSuccess } from "../form-success.component";

export const ResetForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });


  // El error de la data se resuelve en el minuto 3:45
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {

    console.log(values);

    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        })
    });


    // startTransition(() => {
    //   toast.promise(login(values, callbackUrl), {
    //     loading: "Cargando...",
    //     success: (data: any) => {
    //       if (data.error) {
    //         throw new Error(data.error || urlError);
    //       } else {
    //         // TODO: Cambiar cuando agreguemos 2FA
    //         return `${data.success}`;
    //       }
    //     },
    //     // error: (error) => console.log(error),
    //   });
    // });
  };

  return (
    <CardWrapper
      headerLabel="Olvidaste tu Contraseña?"
      backButtonLabel="Regresar al Login"
      backButtonHref="/auth/login"
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full hover:bg-blue-700">
            Enviar Correo para Reestablecer la Contraseña
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
