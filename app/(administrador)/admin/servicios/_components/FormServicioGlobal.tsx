'use client'

import { useState, useTransition, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { ServicioSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from 'next/navigation';
import { registrarServicio, editarServicio } from '@/actions/servicios';
import { toast } from 'sonner';
import FormPrecioInput from "@/components/global/InputFormPrecio";
import { ServicioT } from '@/types';

type FormServicioProps = {
  servicio?: ServicioT;
  setabrirModal?: Dispatch<SetStateAction<boolean>>;
};

export const FormServicioGlobal = (props: FormServicioProps) => {
  const { servicio, setabrirModal } = props;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isInitialRender, setIsInitialRender] = useState(true);

  const defaultValues = servicio ? {
    nombre: servicio.nombre,
    descripcion: servicio.descripcion || '',
    precio: servicio.precio.toString(),
  } : {
    nombre: "",
    descripcion: "",
    precio: "0",
  };

  const form = useForm<z.infer<typeof ServicioSchema>>({
    resolver: zodResolver(ServicioSchema),
    defaultValues,
  });

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  const onSubmit = async (values: z.infer<typeof ServicioSchema>) => {
    startTransition(async () => {
      const action = servicio ? editarServicio(values, servicio.id) : registrarServicio(values);

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

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Servicio:</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del servicio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción del Servicio:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción del servicio" {...field} className='resize-none' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="precio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <FormPrecioInput
                    {...field}
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (!isInitialRender) {
                        form.trigger('precio');
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Ingrese el precio en bolivianos (Bs.) usando el punto (.) como separador decimal.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button disabled={isPending} type="submit" className="bg-gradient" variant={"outline"}>
              {servicio ? 'Editar Servicio' : 'Registrar Servicio'}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};