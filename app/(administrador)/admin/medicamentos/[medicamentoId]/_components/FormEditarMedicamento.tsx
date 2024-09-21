"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Medicamento } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from 'zod'

// Librerías para el Formulario
import React, { useState, useTransition } from 'react';

// Componentes de UI
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Esquema Zod
import { MedicamentoSchema } from "@/schemas";

// TODO: ARREGLAR
import { useRouter } from 'next/navigation';
import { editarMedicamento } from "@/actions/medicamentos";

import { toast } from 'sonner';


// Props del formulario de edición
type FormEditarMedicamentoProps = {
  medicamento: Medicamento;
};

export const FormEditarMedicamento = (props: FormEditarMedicamentoProps) => {
  const { medicamento } = props;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Definir el formulario utilizando React Hook Form
  const form = useForm<z.infer<typeof MedicamentoSchema>>({
    resolver: zodResolver(MedicamentoSchema),
    defaultValues: {
      nombre: medicamento.nombre,
      descripcion: medicamento.descripcion || '',
      stock: medicamento.stock,
      precio: medicamento.precio.toString(),
      tipo: medicamento.tipo,
    },
  });

  // Definir el manejador de envío del formulario
  const onSubmit = (values: z.infer<typeof MedicamentoSchema>) => {
    startTransition(() => {
      toast.promise(editarMedicamento(values, medicamento.id), {
        loading: "Cargando...",
        success: (data) => {
          if (data.error) {
            throw new Error(data.error);
          } else {
            router.refresh();
            return `${data.success}`;
          }
        },
        error: (error) => error.message,
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            disabled={isPending}
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del medicamento" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isPending}
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descripción del medicamento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            disabled={isPending}
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Stock disponible" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isPending}
            control={form.control}
            name="precio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Precio del medicamento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          disabled={isPending}
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Medicamento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de medicamento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Pastilla">Pastilla</SelectItem>
                  <SelectItem value="Vacuna">Vacuna</SelectItem>
                  <SelectItem value="Inyeccion">Inyección</SelectItem>
                  <SelectItem value="Crema">Crema</SelectItem>
                  <SelectItem value="Suero">Suero</SelectItem>
                  <SelectItem value="Polvo">Polvo</SelectItem>
                  <SelectItem value="Gel">Gel</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button disabled={isPending} type="submit" className="bg-gradient" variant="outline">
            Editar Medicamento
          </Button>
        </div>
      </form>
    </Form>
  );
};
