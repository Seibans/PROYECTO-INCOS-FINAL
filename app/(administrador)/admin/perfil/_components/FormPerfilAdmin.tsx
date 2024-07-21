"use client"
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
import { Label } from "@/components/ui/label"
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
import { ConfiguracionSchema } from "@/schemas";
import { toast } from "sonner";

import { settings } from "@/actions/settings";

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


export function FormPerfilAdmin() {
  const { update } = useSession();
  const usuario = useUsuarioActual();
  const [isPending, startTransition] = useTransition();


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


  return (
    <Tabs defaultValue="cuenta" className="w-4/5 bg-background p-4 rounded-lg">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="cuenta">Datos de la Cuenta</TabsTrigger>
        <TabsTrigger value="contrasena">Contraseña</TabsTrigger>
      </TabsList>
      <TabsContent value="cuenta">

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
                                disabled={true}
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
      </TabsContent>


      <TabsContent value="contrasena">
        <div className="h-dvh">
          Para Cambiar la contraseña
        </div>
      </TabsContent>
    </Tabs>
  )
}
