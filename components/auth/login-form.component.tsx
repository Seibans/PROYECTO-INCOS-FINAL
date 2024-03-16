"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
// import { FormError } from "@/components/form-error";
// import { FormSuccess } from "@/components/form-success";

// ServerComponent
import { login } from "@/actions/login";
// Schema
import { LoginSchema } from "@/schemas";

export const LoginForm = () => {

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(() => {
      login(values)
        .then((data: any)=> {
          setError(data.error);
          setSuccess(data.success);
        });
    });
    // Si no quieres usar Server Actions puedes usar axios
    // axios.post("your/api/route", values)..then((result: any) => {

    // }).catch((err: any) => {

    // });
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
          {/* <FormError message={error}/>
          <FormSuccess message={success}/> */}
          <Button
            disabled={isPending}
            type="submit"
            className="w-full">
            Ingresar
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
