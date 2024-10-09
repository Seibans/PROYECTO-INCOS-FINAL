// 'use client'

// import { useState, useTransition, useRef, useEffect } from 'react';
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm, Controller } from "react-hook-form"
// import { z } from "zod"
// import { MedicamentoSchema } from "@/schemas";
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dispatch, SetStateAction } from "react";
// import { useRouter } from 'next/navigation';
// import { registrarMedicamento, editarMedicamento } from '@/actions/medicamentos';
// import { toast } from 'sonner';
// import { Medicamento, TipoMedicamento } from '@prisma/client';
// import { TooltipProvider } from "@/components/ui/tooltip"
// import FormPrecioInput from "@/components/global/InputFormPrecio";
// import InputImagen, { ImageUploaderRef } from '@/components/admin/FormInputImagen';

// type FormMedicamentoProps = {
//   medicamento?: Medicamento;
//   setabrirModal?: Dispatch<SetStateAction<boolean>>;
// };

// export const FormMedicamentoGlobal = (props: FormMedicamentoProps) => {
//   const { medicamento, setabrirModal } = props;
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();
//   const imageUploaderRef = useRef<ImageUploaderRef>(null);
//   const [isInitialRender, setIsInitialRender] = useState(true);


//   const defaultValues = medicamento ? {
//     nombre: medicamento.nombre,
//     descripcion: medicamento.descripcion || '',
//     stock: medicamento.stock,
//     precio: medicamento.precio.toString(),
//     tipo: medicamento.tipo as TipoMedicamento,
//     imagen: medicamento.imagen || '',
//   } : {
//     nombre: "",
//     descripcion: "",
//     stock: 0,
//     precio: "0",
//     tipo: TipoMedicamento.Otro,
//     imagen: "",
//   };

//   const form = useForm<z.infer<typeof MedicamentoSchema>>({
//     resolver: zodResolver(MedicamentoSchema),
//     defaultValues,
//   });

//   useEffect(() => {
//     if (medicamento && medicamento?.imagen) {
//       form.setValue('imagen', medicamento.imagen);
//     }
//   }, [medicamento, form]);

//   useEffect(() => {
//     setIsInitialRender(false);
//   }, []);

//   const onSubmit = async (values: z.infer<typeof MedicamentoSchema>) => {
//     console.log(values);
//     const formData = new FormData();
//     Object.entries(values).forEach(([key, value]) => {
//       if (value !== undefined) {
//         if (key === 'archivo' && value instanceof File) {
//           formData.append(key, value);
//         } else {
//           formData.append(key, value.toString());
//         }
//       }
//     });

//     const action = medicamento ? editarMedicamento(values, medicamento.id) : registrarMedicamento(formData);

//     toast.promise(action, {
//       loading: "Cargando...",
//       success: (data) => {
//         if (data.error) {
//           throw new Error(data.error);
//         } else {
//           router.refresh();
//           if (setabrirModal) {
//             setabrirModal(false);
//           }
//           return `${data.success}`;
//         }
//       },
//       error: (error) => error.message,
//     });
//   };

//   return (
//     <TooltipProvider>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// 						<FormField
// 							disabled={isPending}
// 							control={form.control}
// 							name="nombre"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Nombre:</FormLabel>
// 									<FormControl>
// 										<Input placeholder="Nombre del medicamento" {...field} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 						<FormField
// 							disabled={isPending}
// 							control={form.control}
// 							name="descripcion"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Descripción:</FormLabel>
// 									<FormControl>
// 										<Textarea placeholder="Descripción del medicamento" {...field} className='resize-none' />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 					</div>
// 					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// 						<FormField
// 							disabled={isPending}
// 							control={form.control}
// 							name="stock"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Stock:</FormLabel>
// 									<FormControl>
// 										<Input type="number" placeholder="Stock disponible" {...field} min={0} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 						{/* <FormField
// 							control={form.control}
// 							name="precio"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Precio</FormLabel>
// 									<FormControl>
// 										<Controller
// 											name="precio"
// 											control={form.control}
// 											render={({ field: { onChange, value, ...restField } }) => (
// 												<FormPrecioInput
// 													{...restField}
// 													value={value}
// 													onValueChange={(value: string | undefined) => onChange(value)}
// 												/>
// 											)}
// 										/>
// 									</FormControl>
// 									<FormDescription>
// 										Ingrese el precio en bolivianos (Bs.) usando el punto (.) como separador decimal.
// 									</FormDescription>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/> */}
//             <FormField
//             control={form.control}
//             name="precio"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Precio</FormLabel>
//                 <FormControl>
//                   <FormPrecioInput
//                     {...field}
//                     onValueChange={(value) => {
//                       field.onChange(value);
//                       if (!isInitialRender) {
//                         form.trigger('precio');
//                       }
//                     }}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Ingrese el precio en bolivianos (Bs.) usando el punto (.) como separador decimal.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
// 					</div>
// 					<FormField
// 						disabled={isPending}
// 						control={form.control}
// 						name="tipo"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>Tipo de Medicamento:</FormLabel>
// 								<Select onValueChange={field.onChange} defaultValue={field.value}>
// 									<FormControl>
// 										<SelectTrigger>
// 											<SelectValue placeholder="Selecciona el tipo de medicamento" />
// 										</SelectTrigger>
// 									</FormControl>
// 									<SelectContent>
// 										<SelectItem value="Pastilla">Pastilla</SelectItem>
// 										<SelectItem value="Vacuna">Vacuna</SelectItem>
// 										<SelectItem value="Inyeccion">Inyección</SelectItem>
// 										<SelectItem value="Crema">Crema</SelectItem>
// 										<SelectItem value="Suero">Suero</SelectItem>
// 										<SelectItem value="Polvo">Polvo</SelectItem>
// 										<SelectItem value="Gel">Gel</SelectItem>
// 										<SelectItem value="Otro">Otro</SelectItem>
// 									</SelectContent>
// 								</Select>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>

//           {(!medicamento || !medicamento.imagen) && (
//             <FormField
//               control={form.control}
//               name="imagen"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Imagen del Medicamento:</FormLabel>
//                   <FormControl>
//                     <InputImagen
//                       ref={imageUploaderRef}
//                       initialPreview={medicamento?.imagen || undefined}
//                       onImageChange={(file) => {
//                         if (file) {
//                           field.onChange(file.name);
//                           form.setValue('archivo', file);
//                         } else {
//                           field.onChange('');
//                           form.setValue('archivo', undefined);
//                         }
//                         form.trigger('imagen');
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           )}

//           <div className="flex justify-center">
//             <Button disabled={isPending} type="submit" className="bg-gradient" variant={"outline"}>
//               {medicamento ? 'Editar Medicamento' : 'Registrar Medicamento'}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </TooltipProvider>
//   );
// };


'use client'

import { useState, useTransition, useRef, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { MedicamentoSchema } from "@/schemas";
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
import { Dispatch, SetStateAction } from "react";
import { useRouter } from 'next/navigation';
import { registrarMedicamento, editarMedicamento } from '@/actions/medicamentos';
import { toast } from 'sonner';
import { Medicamento, TipoMedicamento } from '@prisma/client';
import { TooltipProvider } from "@/components/ui/tooltip"
import FormPrecioInput from "@/components/global/InputFormPrecio";
import InputImagen, { ImageUploaderRef } from '@/components/admin/FormInputImagen';
import { CustomNumberInput } from '@/components/global/CustomNumberInput';

type FormMedicamentoProps = {
  medicamento?: Medicamento;
  setabrirModal?: Dispatch<SetStateAction<boolean>>;
};

const unidadesMedida = {
  Pastilla: ['unidades', 'mg', 'g'],
  Vacuna: ['ml', 'dosis'],
  Inyeccion: ['ml', 'mg'],
  Crema: ['g', 'ml'],
  Suero: ['ml', 'L'],
  Polvo: ['g', 'mg', 'kg'],
  Gel: ['g', 'ml'],
  Otro: ['unidades', 'ml', 'g', 'mg', 'L', 'kg']
};

export const FormMedicamentoGlobal = (props: FormMedicamentoProps) => {
  const { medicamento, setabrirModal } = props;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const imageUploaderRef = useRef<ImageUploaderRef>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [unidadesMedidaOpciones, setUnidadesMedidaOpciones] = useState<string[]>(unidadesMedida.Otro);

  const defaultValues = medicamento ? {
    codigo: medicamento.codigo || '',
    nombre: medicamento.nombre,
    descripcion: medicamento.descripcion || '',
    indicaciones: medicamento.indicaciones || '',
    unidadMedida: medicamento.unidadMedida || '',
    cantidadPorUnidad: medicamento.cantidadPorUnidad || 0,
    stock: medicamento.stock,
    precio: medicamento.precio.toString(),
    sobrante: medicamento.sobrante || 1,
    tipo: medicamento.tipo as TipoMedicamento,
    imagen: medicamento.imagen || '',
  } : {
    codigo: "",
    nombre: "",
    descripcion: "",
    indicaciones: "",
    unidadMedida: "",
    cantidadPorUnidad: 1,
    stock: 1,
    precio: "0",
    sobrante: 1,
    tipo: TipoMedicamento.Otro,
    imagen: "",
  };

  const form = useForm<z.infer<typeof MedicamentoSchema>>({
    resolver: zodResolver(MedicamentoSchema),
    defaultValues,
  });

  useEffect(() => {
    if (medicamento && medicamento?.imagen) {
      form.setValue('imagen', medicamento.imagen);
    }
  }, [medicamento, form]);

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  useEffect(() => {
    const tipoMedicamento = form.watch('tipo') as keyof typeof unidadesMedida;
    setUnidadesMedidaOpciones(unidadesMedida[tipoMedicamento] || unidadesMedida.Otro);
  }, [form.watch('tipo')]);

  const onSubmit = async (values: z.infer<typeof MedicamentoSchema>) => {
    console.log(values);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'archivo' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    const action = medicamento ? editarMedicamento(values, medicamento.id) : registrarMedicamento(formData);

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
  };

  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              disabled={isPending}
              control={form.control}
              name="codigo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo del Medicamento:</FormLabel>
                  <FormControl>
                    <Input placeholder="Código del medicamento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre:</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del medicamento" {...field} />
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
                  <FormLabel>Descripción:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción del medicamento" {...field} className='resize-none' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            disabled={isPending}
            control={form.control}
            name="indicaciones"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indicaciones:</FormLabel>
                <FormControl>
                  <Textarea placeholder="Indicaciones de uso" {...field} className='resize-none' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FormField
              disabled={isPending}
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Medicamento:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de medicamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(unidadesMedida).map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="unidadMedida"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidad de Medida:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la unidad de medida" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {unidadesMedidaOpciones.map((unidad) => (
                        <SelectItem key={unidad} value={unidad}>{unidad}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="cantidadPorUnidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad por Unidad:</FormLabel>
                  <FormControl>
                    <CustomNumberInput
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                      min={1}
                      max={10000}
                      step={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FormField
              disabled={isPending}
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock:</FormLabel>
                  <FormControl>
                    <CustomNumberInput
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                      min={1}
                      max={100000}
                      step={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            {/* <FormField
              disabled={isPending}
              control={form.control}
              name="sobrante"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrante:</FormLabel>
                  <FormControl>
                    <CustomNumberInput
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                      min={0}
                      max={1000}
                      step={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          {(!medicamento || !medicamento.imagen) && (
            <FormField
              control={form.control}
              name="imagen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen del Medicamento:</FormLabel>
                  <FormControl>
                    <InputImagen
                      ref={imageUploaderRef}
                      initialPreview={medicamento?.imagen || undefined}
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
            <Button disabled={isPending} type="submit" className="bg-gradient" variant={"outline"}>
              {medicamento ? 'Editar Medicamento' : 'Registrar Medicamento'}
            </Button>
          </div>
        </form>
      </Form>
    </TooltipProvider>
  );
};