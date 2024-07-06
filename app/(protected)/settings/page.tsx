"use client";

import Image from "next/image";
// import React from "react";
import { CardContainer, CardItem, CardBody } from "@/components/ui/3d-card";
import { BackButton } from "@/components/auth/back-button.component";
import { logout } from "@/actions/logout";
import { useUsuarioActual } from "@/hooks/use-usuario-actual";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { settings } from "@/actions/settings";
import { useTransition, useState } from "react";

//Esto es importante ya que actualiza los datos del usuario en el token y asi actualiza todo
import { useSession } from "next-auth/react";


import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConfiguracionSchema } from "@/schemas";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { RolUsuario } from "@prisma/client";

// para envolver toda nuestra session en el minuto 5:57


const SettingsPage = () => {
  // const { data: session } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [succes, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const usuario = useUsuarioActual();
  const [isPending, startTransition] = useTransition();


  // es mejor manejarlo como undefined, ya que en el action como se le pasa ...values entonces no lo actualizara
  const form = useForm<z.infer<typeof ConfiguracionSchema>>({
    resolver: zodResolver(ConfiguracionSchema),
    defaultValues: {
      password: undefined,
      nuevoPassword: undefined,
      name: usuario?.name || undefined,
      email: usuario?.email || undefined,
      rol: usuario?.rol || undefined,
      authDobleFactor: usuario?.authDobleFactor || undefined,
    }
  });


  const onSubmit = (values: z.infer<typeof ConfiguracionSchema>) => {
    startTransition(() => {
      toast.promise(settings(values), {
        loading: "Guardando Datos...",
        success: (data) => {
          if (data.error) {
            // setError(data.error);
            throw new Error(data.error);
          }
          if (data.success) {
            // setSuccess(data.success);
            update();
            return `${data.success}`;
          }
        },
        error: (error) => error.message,
      });



      // settings(values).then((data) => {
      //   if (data.error) {
      //     setError(data.error);
      //   }
      //   if (data.success) {
      //     update();
      //     setSuccess(data.success);
      //   }
      //   // el error de abajo es por si la accion del servidor da error
      // }).catch(() => {
      //   setError("Hubo un error al actualizar la configuración");
      // });
    });
  };

  const onClick = () => {
    logout();
  }
  // session?.user.id; mejora el autocompletado
  // const userImage = session?.user?.image || "https://res.cloudinary.com/dy8crd62e/image/upload/v1717429749/gamaliel_gaoa0t.png"; 
  return (
    <div>
      {/* {JSON.stringify(session)} */}
      {/* boton de cerrar session de supermaven */}
      {/* <button type="submit" onClick={async () => {
					await auth.signOut();
				}}>
					Cerrar sesión
				</button> */}

      {/* <Button variant={"default"} onClick={onClick}>Cerrar Sessión</Button>
      <BackButton label="Administracion" href="/bento" /> */}

      <Card>
        <CardHeader>
          <p className="text-2xl font-semibold text-center">
            Configuración
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Nombre
          </p>
          <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-100 rounded-md ">
            {usuario?.name}
          </p>
          </div> */}
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Nombre"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {usuario?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Email"
                              {...field}
                              disabled={isPending}
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
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="******"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nuevoPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nueva Contraseña</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="******"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <FormField
                  control={form.control}
                  name="rol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol</FormLabel>
                      <Select
                        // {...field}
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un rol" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            value={RolUsuario.USUARIO}>Usuario</SelectItem>
                          <SelectItem
                            value={RolUsuario.ADMINISTRADOR}>Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {usuario?.isOAuth === false && (

                  <FormField
                    control={form.control}
                    name="authDobleFactor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0 5">
                          <FormLabel>Autenticacion de Doble Factor</FormLabel>
                          <FormDescription>Habilitar la autenticacion de doble factor para Mi Cuenta</FormDescription>
                        </div>

                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

              </div>
              <Button
                type="submit"
                disabled={isPending}>
                Guardar Datos
              </Button>
            </form>

          </Form>
          {/* <Button disabled={isPending}>
            Cambiar Nombre
          </Button> */}
        </CardContent>
      </Card>

      <div className="flex items-center justify-center">
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              Bienvenido Usuario {usuario?.name}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Prueba todas nuestras funcionalidades
            </CardItem>
            <CardItem
              translateZ="100"
              // rotateX={20}
              // rotateZ={-10}
              className="w-full mt-4"
            >
              <Image
                // src={usuario?.image}
                src=""
                fill
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ={20}
                translateX={-40}
                as="button"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
              >
                Configuración →
              </CardItem>
              <CardItem
                translateZ={20}
                translateX={40}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              >
                Mis Mascotas
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
};

export default SettingsPage;
