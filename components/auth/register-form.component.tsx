"use client";
import { E164Number } from "libphonenumber-js/core";
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
import PhoneInput from "react-phone-number-input";


//Mi components
import { CardWrapper } from "@/components/auth/card-wrapper.component";
// import { FormError } from "@/components/form-error.component";
// import { FormSuccess } from "@/components/form-success.component";

// ServerComponent
import { register } from "@/actions/register";
// Schema
import { RegisterSchema } from "@/schemas";

export const RegisterForm = () => {
  // const [error, setError] = useState<string | undefined>("");
  // const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      celular: undefined
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      toast.promise(register(values), {
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

  // const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
  //   setError("");
  //   setSuccess("");

  //   startTransition(() => {
  //     register(values)
  //       .then((data: any)=> {
  //         // setError(data.error);
  //         // setSuccess(data.success);
  //       });
  //   });
  //   // Si no quieres usar Server Actions puedes usar axios
  //   // axios.post("your/api/route", values)..then((result: any) => {

  //   // }).catch((err: any) => {

  //   // });
  // };

  return (
    <CardWrapper
      headerLabel="Crea una Cuenta"
      backButtonLabel="Ya tienes una cuenta?"
      backButtonHref="/auth/login"
      showSocial
    >
      {/* obtiene todas las propiedades desestructurandolas excepto children */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Pablo Fernandez"
                      type="text"
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="pablo.a@ejemplo.com"
                      type="email"
                    />
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormError message={error} />
          <FormSuccess message={success} /> */}

          <Button disabled={isPending} type="submit" className="w-full">
            Crear Cuenta
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
