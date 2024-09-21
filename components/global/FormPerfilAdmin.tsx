"use client"
import { E164Number } from "libphonenumber-js/core";
import 'react-phone-number-input/style.css';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useUsuarioActual } from "@/hooks/use-usuario-actual"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CambiarPasswordSchema, ConfiguracionSchema } from "@/schemas";
import { toast } from "sonner";

import { perfil, perfilPassword } from "@/actions/settings";

import PhoneInput from "react-phone-number-input";


import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RolUsuario } from "@prisma/client";
import { useSession } from "next-auth/react"
import { Textarea } from '@/components/ui/textarea';
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";


export function FormPerfilAdmin() {
  const { update } = useSession();
  const usuario = useUsuarioActual();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ConfiguracionSchema>>({
    resolver: zodResolver(ConfiguracionSchema),
    defaultValues: {
      name: usuario?.name || undefined,
      apellidoPat: usuario?.apellidoPat || undefined,
      apellidoMat: usuario?.apellidoMat || undefined,
      ci: usuario?.ci || undefined,
      sexo: usuario?.sexo || undefined,
      // password: undefined,
      // nuevoPassword: undefined,
      email: usuario?.email || undefined,
      celular: usuario?.celular || undefined,
      rol: usuario?.rol || undefined,
      authDobleFactor: usuario?.authDobleFactor || undefined,
    }
  });

  const formPassword = useForm<z.infer<typeof CambiarPasswordSchema>>({
    resolver: zodResolver(CambiarPasswordSchema),
    defaultValues: {
      password: "",
      nuevoPassword: "",
      repetirPassword: "",
    }
  });


  const onSubmit = (values: z.infer<typeof ConfiguracionSchema>) => {
    startTransition(() => {
      toast.promise(perfil(values), {
        loading: "Guardando Datos...",
        success: (data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          if (data.success) {
            update();
            return `${data.success}`;
          }
        },
        error: (error) => error.message,
      });
    });
  };

  const onSubmitPassword = (values: z.infer<typeof CambiarPasswordSchema>) => {
    startTransition(() => {
      toast.promise(perfilPassword(values), {
        loading: "Guardando Datos...",
        success: (data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          if (data.success) {
            console.log("Values before reset:", formPassword.getValues());
            formPassword.reset({
              password: "",
              nuevoPassword: "",
              repetirPassword: ""
            });
            console.log("Values after reset:", formPassword.getValues());
            update();
            return `${data.success}`;
          }
        },
        error: (error) => error.message,
      });
    });
  };


  return (
    <>
      <h2 className="text-2xl">Mi Perfil</h2>
      <Tabs defaultValue="cuenta" className="w-4/5 bg-background p-4 rounded-lg">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cuenta">Datos de la Cuenta</TabsTrigger>
          <TabsTrigger value="contrasena">Contraseña</TabsTrigger>
        </TabsList>
        <TabsContent value="cuenta">
          <Card>
            <CardHeader>
              <p className="text-2xl font-semibold text-center">
                Configuración de los Campos del Usuario
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
                          <FormLabel>Nombre:</FormLabel>
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

                    <FormField
                      control={form.control}
                      name="apellidoPat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido Paterno:</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Apellido Paterno"
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
                      name="apellidoMat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido Materno:</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Apellido Materno"
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
                      name="ci"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Carnet de Identidad:</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Carnet de Identidad"
                              {...field}
                              disabled={isPending}
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
                                  disabled={true}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

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
                    {usuario?.rol === RolUsuario.Administrador && (
                      <FormField
                        control={form.control}
                        name="rol"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rol</FormLabel>
                            <Select
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
                                <SelectItem value={RolUsuario.Usuario}>Usuario</SelectItem>
                                <SelectItem value={RolUsuario.Administrador}>Administrador</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
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
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="bg-gradient"
                      variant={"outline"}>
                      Guardar Datos
                    </Button>
                  </div>
                </form>

              </Form>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="contrasena">
          <Card>
            <CardHeader>
              <p className="text-2xl font-semibold text-center">
                Cambiar la Contraseña
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {usuario?.isOAuth ? (
                <p className="text-center text-red-500">
                  Has iniciado sesión con un proveedor como Google o Facebook. No puedes cambiar la contraseña desde aquí.
                </p>
              ) : (
                <Form {...formPassword}>
                  <form
                    className="space-y-6"
                    onSubmit={formPassword.handleSubmit(onSubmitPassword)}
                  >
                    <div className="space-y-4">
                      <FormField
                        control={formPassword.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contraseña:</FormLabel>
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
                        control={formPassword.control}
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
                      <FormField
                        control={formPassword.control}
                        name="repetirPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Repetir Contraseña:</FormLabel>
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
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-gradient"
                        variant={"outline"}>
                        Cambiar Contraseña
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
