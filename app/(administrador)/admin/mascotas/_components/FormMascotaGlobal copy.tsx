'use client'

import { useState, useTransition, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MascotaSchema } from "@/schemas";
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
import { useRouter } from 'next/navigation';
import { registrarMascota, registrarMascotaConImagen, editarMascota } from '@/actions/mascotas';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TipoMascota, Sexo } from "@prisma/client";
import InputImagen from '@/components/admin/FormInputImagen';
import { Switch } from "@/components/ui/switch";
import { razasGatos, razasPerros } from "@/utils/constantes";
import { DatePicker } from "@/components/global/InputDatePicker";
import { PesoMascotaInput } from '@/components/global/InputPesoMascota';
import { UserSelect } from './SelectUsuario';
import { MascotaT, UsuarioT } from "@/types";


interface User {
  id: number
  nombreCompleto: string
  email: string
  image: string | null
  ci: string | null
  celular: string | null
  rol: string
}

type FormMascotaGlobalProps = {
  mascota?: MascotaT;
  setabrirModal?: (open: boolean) => void;
  isDialog?: boolean;
  usuarios: User[];
};

export const FormMascotaGlobal = ({ mascota, setabrirModal, isDialog = false, usuarios }: FormMascotaGlobalProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [razaOptions, setRazaOptions] = useState<string[]>(["Sin Raza (Especial)"]);

  const defaultValues = mascota ? {
    nombre: mascota.nombre,
    especie: mascota.especie,
    raza: mascota.raza || "Sin Raza (Especial)",
    fechaNacimiento: mascota.fechaNacimiento,
    sexo: mascota.sexo,
    detalles: mascota.detalles || '',
    peso: mascota.peso?.toString() || '',
    esterilizado: mascota.esterilizado || false,
    estado: mascota.estado.toString(),
    idPropietario: mascota.idPropietario,
  } : {
    nombre: "",
    especie: undefined,
    raza: "Sin Raza (Especial)",
    fechaNacimiento: undefined,
    sexo: undefined,
    detalles: "",
    peso: "",
    esterilizado: false,
    estado: "1",
    idPropietario: undefined,
  };

  const form = useForm<z.infer<typeof MascotaSchema>>({
    resolver: zodResolver(MascotaSchema),
    defaultValues,
  });

  useEffect(() => {
    if (form.getValues("especie") === TipoMascota.Perro) {
      setRazaOptions(razasPerros);
    } else if (form.getValues("especie") === TipoMascota.Gato) {
      setRazaOptions(razasGatos);
    }
  }, [form]);

  const handleEspecieChange =   (value: TipoMascota) => {
    form.setValue("raza", "Sin Raza (Especial)");
    if (value === TipoMascota.Perro) {
      form.setValue("especie", TipoMascota.Perro);
      setRazaOptions(razasPerros);
      form.setValue("raza", razasPerros[0]);
    } else if (value === TipoMascota.Gato) {
      form.setValue("especie", TipoMascota.Gato);
      setRazaOptions(razasGatos);
      form.setValue("raza", razasGatos[0]);
    } else {
      form.setValue("especie", TipoMascota.Otro);
      setRazaOptions(["Sin Raza (Especial)"]);
      form.setValue("raza", "Sin Raza (Especial)");
    }
    form.trigger("especie");
  };

  const onSubmit = async (values: z.infer<typeof MascotaSchema>) => {
    startTransition(async () => {
      let action;
      if (mascota) {
        action = editarMascota(values, mascota.id);
      } else {
        action = values.archivo
          ? registrarMascotaConImagen(objectToFormData(values))
          : registrarMascota(values);
      }

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

  const objectToFormData = (obj: any): FormData => {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'archivo' && value instanceof File) {
          formData.append(key, value);
        } else if (key === 'fechaNacimiento' && value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, value.toString());
        }
      }
    });
    return formData;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre *</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de la mascota" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="especie"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especie *</FormLabel>
                <Select onValueChange={handleEspecieChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la Especie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={TipoMascota.Perro}>Perro</SelectItem>
                    <SelectItem value={TipoMascota.Gato}>Gato</SelectItem>
                    <SelectItem value={TipoMascota.Otro}>Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="raza"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raza</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la Raza" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {razaOptions.map((raza) => (
                    <SelectItem key={raza} value={raza}>{raza}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fechaNacimiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormControl>
                  <DatePicker
                    onChange={(date) => field.onChange(date)}
                    value={field.value}
                    maxDate={new Date()}
                    minDate={new Date("2000-01-01")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sexo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo de la Mascota</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-6 justify-center"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={Sexo.Macho} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Macho
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={Sexo.Hembra} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Hembra
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="peso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso (kg)</FormLabel>
                <FormControl>
                  <PesoMascotaInput {...field} />
                </FormControl>
                <FormDescription>
                  Usa el punto (.) para separar los decimales.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="esterilizado"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Esterilizado</FormLabel>
                  <FormDescription>
                    ¿La mascota está esterilizada?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Registrado</SelectItem>
                  <SelectItem value="2">Atendido</SelectItem>
                  <SelectItem value="3">En Tratamiento</SelectItem>
                  <SelectItem value="4">En Observación</SelectItem>
                  <SelectItem value="5">Dado de Alta</SelectItem>
                  <SelectItem value="6">Internado</SelectItem>
                  <SelectItem value="7">Fallecido</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idPropietario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Propietario (Opcional)</FormLabel>
              <FormControl>
                <UserSelect
                  users={usuarios}
                  onSelect={(userId) => field.onChange(userId)}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>
                Si no se selecciona un propietario, se asignará al administrador por defecto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detalles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detalles, Alergias y Observaciones de la Mascota</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detalles de la mascota"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Agrega una descripción detallada de la mascota.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {!mascota && (
          <FormField
            control={form.control}
            name="imagen"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen de la Mascota (Opcional)</FormLabel>
                <FormControl>
                  <InputImagen
                    onImageChange={(file) => {
                      if (file) {
                        field.onChange(file.name);
                        form.setValue('archivo', file);
                      } else {
                        field.onChange('');
                        form.setValue('archivo', undefined);
                      }
                      form.trigger('imagen');
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-center">
          <Button disabled={isPending} type="submit" className="bg-gradient" variant="outline">
            {mascota ? 'Actualizar Mascota' : 'Registrar Mascota'}
          </Button>
        </div>
      </form>
    </Form>
  );
};