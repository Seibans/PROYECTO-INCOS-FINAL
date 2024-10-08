'use client'

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { TratamientoFormT, ServicioT, MedicamentoT, TratamientoCompleto, TMFormT } from '@/types';
import { crearTratamiento, actualizarTratamiento } from '@/actions/tratamiento';
import { useTratamientoStore } from '@/store/tratamientoStore';
import ServicioSelector from './ServicioSelector';
import { CustomNumberInput } from '@/components/global/CustomNumberInput';
import { Plus, X, Edit, Trash2, ArrowRightCircleIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import MedicamentoSelector from "./MedicamentoSelector"

interface TratamientoFormProps {
  historialId: number;
  tratamiento: TratamientoCompleto | null;
  medicamentos: MedicamentoT[];
  servicios: ServicioT[];
}

const TratamientoForm: React.FC<TratamientoFormProps> = ({ historialId, tratamiento, medicamentos, servicios }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedServicio, setSelectedServicio] = useState<number | null>(null);
  const [editingMedicamentoIndex, setEditingMedicamentoIndex] = useState<number | null>(null);
  const {
    tratamiento: formTratamiento,
    setTratamiento,
    actualizarCampo,
    agregarServicio,
    eliminarServicio,
    agregarMedicamento,
    actualizarMedicamento,
    eliminarMedicamento,
    calcularTotalTratamiento,
    resetTratamiento
  } = useTratamientoStore();

  const form = useForm<TratamientoFormT>({
    defaultValues: formTratamiento,
  });

  useEffect(() => {
    if (tratamiento) {
      setTratamiento({
        descripcion: tratamiento.descripcion,
        estado: tratamiento.estado,
        diagnostico: tratamiento.diagnostico,
        historialMascotaId: tratamiento.historialMascotaId,
        servicios: tratamiento.servicios.map(s => ({
          precioServicio: s.precioServicio,
          servicioId: s.servicioId,
          servicio: s.servicio
        })),
        medicamentos: tratamiento.medicamentos.map(m => ({
          medicamentoId: m.medicamentoId,
          cantidad: m.cantidad,
          costoUnitario: m.costoUnitario,
          dosificacion: m.dosificacion,
          medicamento: m.medicamento
        })),
        total: tratamiento.pago?.total ? parseFloat(tratamiento.pago.total) : 0,
        detalle: tratamiento.pago?.detalle || null,
        esAyudaVoluntaria: tratamiento.pago?.esAyudaVoluntaria || false,
      });
    } else {
      setTratamiento({
        ...formTratamiento,
        historialMascotaId: historialId,
      });
    }
  }, [tratamiento, historialId, setTratamiento]);

  useEffect(() => {
    const total = calcularTotalTratamiento();
    form.setValue('total', total);
    actualizarCampo('total', total);
  }, [formTratamiento.servicios, formTratamiento.medicamentos, calcularTotalTratamiento, form, actualizarCampo]);

  useEffect(() => {
    form.reset(formTratamiento);
  }, [formTratamiento, form]);

  const onSubmit = async (data: TratamientoFormT) => {
    console.log("DATOS DEL FORMULARIO   ", JSON.stringify(data, null, 2), "");
    console.log("DATOS DEL STORE   ", JSON.stringify(formTratamiento, null, 2), "");
    try {
      if (tratamiento) {
        await actualizarTratamiento(historialId, tratamiento.id, formTratamiento);
      } else {
        await crearTratamiento(historialId, formTratamiento);
      }
    } catch (error) {
      console.error("Error al guardar el tratamiento:", error);
    }
  };

  const handleServicioClick = (servicio: ServicioT) => {
    if (selectedServicio === servicio.id) {
      setSelectedServicio(null);
    } else {
      setSelectedServicio(servicio.id);
    }
  };

  const handleAddServicio = (servicio: ServicioT) => {
    agregarServicio({
      precioServicio: servicio.precio,
      servicioId: servicio.id,
      servicio: servicio,
    });
    setSelectedServicio(null);
  };

  const handleRemoveServicio = (servicioId: number) => {
    eliminarServicio(servicioId);
  };

  const handleMedicamentoSubmit = (medicamento: MedicamentoT, cantidad: number, costoUnitario: number, dosificacion: string) => {
    if (editingMedicamentoIndex !== null) {
      actualizarMedicamento(editingMedicamentoIndex, {
        medicamentoId: medicamento.id,
        cantidad,
        costoUnitario: costoUnitario.toString(),
        dosificacion,
        medicamento,
      });
      setEditingMedicamentoIndex(null);
    } else {
      agregarMedicamento({
        medicamentoId: medicamento.id,
        cantidad,
        costoUnitario: costoUnitario.toString(),
        dosificacion,
        medicamento,
      });
    }
    setIsDialogOpen(false);
  };

  const handleEditMedicamento = (index: number) => {
    setEditingMedicamentoIndex(index);
    setIsDialogOpen(true);
  };

  const handleResetForm = () => {
    resetTratamiento();
    form.reset();
  };

  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="w-full lg:w-9/12 mb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>{tratamiento ? 'Editar Tratamiento' : 'Nuevo Tratamiento'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            actualizarCampo('descripcion', e.target.value);
                          }}
                          className='resize-none'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(parseInt(value));
                          actualizarCampo('estado', parseInt(value));
                        }}
                        value={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione el estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">Cancelado</SelectItem>
                          <SelectItem value="1">Nuevo</SelectItem>
                          <SelectItem value="2">Completado</SelectItem>
                          <SelectItem value="3">En Proceso</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="diagnostico"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diagnóstico</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            actualizarCampo('diagnostico', e.target.value);
                          }}
                          value={field.value || ''}
                          className='resize-none'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-2 border-dashed rounded-md p-4">
                  <h3 className="font-semibold mb-2">Servicios Seleccionados</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
                    {formTratamiento.servicios.map((servicio, index) => (
                      <Card
                        key={servicio.servicioId}
                        className="relative cursor-pointer h-24"
                        onClick={() => handleServicioClick(servicio.servicio!)}
                      >
                        <CardContent className="p-2">
                          <div className="">
                            <div className="flex-grow">
                              <p className="font-semibold text-sm">{index + 1}. {servicio.servicio!.nombre}</p>
                              <p className="text-md text-muted-foreground">{servicio.servicio!.descripcion}</p>
                              <p className="text-sm text-muted-foreground">Bs. {servicio.precioServicio}</p>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive absolute top-1 right-1 hover:bg-red-800 rounded-full"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveServicio(servicio.servicioId);
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Quitar servicio</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                <div>
                  <div className='flex justify-between'>
                    <h3 className="font-semibold mb-2">Medicamentos</h3>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="mt-2">Agregar Medicamento</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{editingMedicamentoIndex !== null ? 'Editar Medicamento' : 'Agregar Medicamento'}</DialogTitle>
                        </DialogHeader>
                        <MedicamentoSelector
                          medicamentos={medicamentos}
                          onSelectMedicamento={handleMedicamentoSubmit}
                          initialMedicamento={editingMedicamentoIndex !== null ? formTratamiento.medicamentos[editingMedicamentoIndex] : undefined}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medicamento</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Costo Unitario</TableHead>
                        <TableHead>Precio Total</TableHead>
                        <TableHead>Dosificación</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formTratamiento.medicamentos.map((med, index) => (
                        <TableRow key={index}>
                          <TableCell>{med.medicamento!.nombre}</TableCell>
                          <TableCell>
                            <CustomNumberInput
                              value={med.cantidad}
                              onValueChange={(value) => actualizarMedicamento(index, { cantidad: value })}
                              min={1}
                            />
                          </TableCell>
                          <TableCell>{med.costoUnitario}</TableCell>
                          <TableCell>{(med.cantidad * parseFloat(med.costoUnitario)).toFixed(2)}</TableCell>
                          <TableCell>{med.dosificacion}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-yellow-500 hover:text-yellow-600"
                                      onClick={() => handleEditMedicamento(index)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Editar medicamento</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-destructive hover:text-destructive/90"
                                      onClick={() => eliminarMedicamento(index)}
                                    >
                
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Eliminar medicamento</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Información de Pago</h3>
                  <p className='text-center text-2xl font-bold'>Total a Cancelar: Bs.{calcularTotalTratamiento().toFixed(2)}</p>
                  <FormField
                    control={form.control}
                    name="detalle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detalle del Pago</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              actualizarCampo('detalle', e.target.value);
                            }}
                            value={field.value || ''}
                            className='resize-none'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='mt-4'>
                    <FormField
                      control={form.control}
                      name="esAyudaVoluntaria"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Ayuda Voluntaria
                            </FormLabel>
                            <FormDescription>
                              Marcar si el pago es una ayuda voluntaria
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                actualizarCampo('esAyudaVoluntaria', checked);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className='flex justify-end gap-2'>
                  <Button type='button' variant="secondary" onClick={handleResetForm}>Limpiar Formulario</Button>
                  <Button type="submit" variant='expandIcon' className='bg-gradient' Icon={Edit} iconPlacement='right'>
                    {tratamiento ? 'Actualizar Tratamiento' : 'Crear Tratamiento'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
      <div className='w-full lg:w-3/12'>
        <ServicioSelector servicios={servicios} onSelectServicio={handleAddServicio} />
      </div>
    </div>
  );
};

export default TratamientoForm;






// 'use client'

// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Switch } from "@/components/ui/switch";
// import { TratamientoFormT, ServicioT, MedicamentoT, TratamientoCompleto } from '@/types';
// import { crearTratamiento, actualizarTratamiento } from '@/actions/tratamiento';
// import { useTratamientoStore } from '@/store/tratamientoStore';
// import ServicioSelector from './ServicioSelector';
// import { CustomNumberInput } from '@/components/global/CustomNumberInput';
// import { Plus, X, Edit, Trash2, ArrowRightCircleIcon, ArrowDown } from 'lucide-react';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
// import MedicamentoSeletor from "./MedicamentoSelector"

// interface TratamientoFormProps {
//   historialId: number;
//   tratamiento: TratamientoCompleto | null;
//   medicamentos: MedicamentoT[];
//   servicios: ServicioT[];
// }

// const TratamientoForm: React.FC<TratamientoFormProps> = ({ historialId, tratamiento, medicamentos, servicios }) => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedServicio, setSelectedServicio] = useState<number | null>(null);
//   const {
//     tratamiento: formTratamiento,
//     setTratamiento,
//     actualizarCampo,
//     agregarServicio,
//     eliminarServicio,
//     agregarMedicamento,
//     actualizarMedicamento,
//     eliminarMedicamento,
//     calcularTotalTratamiento,
//     resetTratamiento
//   } = useTratamientoStore();

//   const form = useForm<TratamientoFormT>({
//     defaultValues: formTratamiento,
//   });

//   useEffect(() => {
//     if (tratamiento) {
//       setTratamiento({
//         descripcion: tratamiento.descripcion,
//         estado: tratamiento.estado,
//         diagnostico: tratamiento.diagnostico,
//         historialMascotaId: tratamiento.historialMascotaId,
//         servicios: tratamiento.servicios.map(s => ({
//           precioServicio: s.precioServicio,
//           servicioId: s.servicioId,
//           servicio: s.servicio
//         })),
//         medicamentos: tratamiento.medicamentos.map(m => ({
//           medicamentoId: m.medicamentoId,
//           cantidad: m.cantidad,
//           costoUnitario: m.costoUnitario,
//           dosificacion: m.dosificacion,
//           medicamento: m.medicamento
//         })),
//         total: tratamiento.pago?.total ? parseFloat(tratamiento.pago.total) : 0,
//         detalle: tratamiento.pago?.detalle || null,
//         esAyudaVoluntaria: tratamiento.pago?.esAyudaVoluntaria || false,
//       });
//     } else {
//       setTratamiento({
//         ...formTratamiento,
//         historialMascotaId: historialId,
//       });
//     }
//   }, [tratamiento, historialId, setTratamiento]);

//   useEffect(() => {
//     const total = calcularTotalTratamiento();
//     form.setValue('total', total);
//     actualizarCampo('total', total);
//   }, [formTratamiento.servicios, formTratamiento.medicamentos, calcularTotalTratamiento, form, actualizarCampo]);



//   useEffect(() => {
//     form.reset(formTratamiento);
//   }, [formTratamiento, form]);

//   const onSubmit = async (data: TratamientoFormT) => {
//     console.log("DATOS DEL FORMULARIO   ", JSON.stringify(data, null, 2), "");
//     console.log("DATOS DEL STORE   ", JSON.stringify(formTratamiento, null, 2), "");
//     try {
//       if (tratamiento) {
//         // await actualizarTratamiento(historialId, tratamiento.id, data);
//         await actualizarTratamiento(historialId, tratamiento.id, formTratamiento);
//       } else {
//         // await crearTratamiento(historialId, data);
//         await crearTratamiento(historialId, formTratamiento);
//       }
//     } catch (error) {
//       console.error("Error al guardar el tratamiento:", error);
//     }
//   };

//   const handleServicioClick = (servicio: ServicioT) => {
//     if (selectedServicio === servicio.id) {
//       setSelectedServicio(null);
//     } else {
//       setSelectedServicio(servicio.id);
//     }
//   };

//   const handleAddServicio = (servicio: ServicioT) => {
//     agregarServicio({
//       precioServicio: servicio.precio,
//       servicioId: servicio.id,
//       servicio: servicio,
//     });
//     setSelectedServicio(null);
//   };

//   const handleRemoveServicio = (servicioId: number) => {
//     eliminarServicio(servicioId);
//   };

//   const handleMedicamentoSubmit = (medicamento: MedicamentoT, cantidad: number, costoUnitario: number, dosificacion: string) => {
//     const existingIndex = formTratamiento.medicamentos.findIndex(m => m.medicamentoId === medicamento.id);
//     if (existingIndex !== -1) {
//       actualizarMedicamento(existingIndex, {
//         cantidad: formTratamiento.medicamentos[existingIndex].cantidad + cantidad,
//         costoUnitario: costoUnitario.toString(),
//         dosificacion,
//       });
//     } else {
//       agregarMedicamento({
//         medicamentoId: medicamento.id,
//         cantidad,
//         costoUnitario: costoUnitario.toString(),
//         dosificacion,
//         medicamento,
//       });
//     }
//     setIsDialogOpen(false);
//   };

//   const handleResetForm = () => {
//     resetTratamiento();
//     form.reset();
//   };

//   return (
//     <div className="w-full flex flex-col lg:flex-row">
//       <div className="w-full lg:w-9/12 mb-4">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <Card>
//               <CardHeader>
//                 <CardTitle>{tratamiento ? 'Editar Tratamiento' : 'Nuevo Tratamiento'}</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <FormField
//                   control={form.control}
//                   name="descripcion"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Descripción</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           {...field}
//                           onChange={(e) => {
//                             field.onChange(e);
//                             actualizarCampo('descripcion', e.target.value);
//                           }}
//                           className='resize-none'
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="estado"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Estado</FormLabel>
//                       <Select
//                         onValueChange={(value) => {
//                           field.onChange(parseInt(value));
//                           actualizarCampo('estado', parseInt(value));
//                         }}
//                         value={field.value.toString()}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Seleccione el estado" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="0">Cancelado</SelectItem>
//                           <SelectItem value="1">Nuevo</SelectItem>
//                           <SelectItem value="2">Completado</SelectItem>
//                           <SelectItem value="3">En Proceso</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="diagnostico"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Diagnóstico</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           {...field}
//                           onChange={(e) => {
//                             field.onChange(e);
//                             actualizarCampo('diagnostico', e.target.value);
//                           }}
//                           value={field.value || ''}
//                           className='resize-none'
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="border-2 border-dashed rounded-md p-4">
//                   <h3 className="font-semibold mb-2">Servicios Seleccionados</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
//                     {formTratamiento.servicios.map((servicio, index) => (
//                       <Card
//                         key={servicio.servicioId}
//                         className="relative cursor-pointer h-24"
//                         onClick={() => handleServicioClick(servicio.servicio!)}
//                       >
//                         <CardContent className="p-2">
//                           <div className="">
//                             <div className="flex-grow">
//                               <p className="font-semibold text-sm">{index + 1}. {servicio.servicio!.nombre}</p>
//                               <p className="text-md text-muted-foreground">{servicio.servicio!.descripcion}{servicio.servicio!.descripcion}{servicio.servicio!.descripcion}{servicio.servicio!.descripcion}</p>
//                               <p className="text-sm text-muted-foreground">Bs. {servicio.precioServicio}</p>
//                             </div>
//                             <TooltipProvider>
//                               <Tooltip>
//                                 <TooltipTrigger asChild>
//                                   <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="text-destructive absolute top-1 right-1 hover:bg-red-800 rounded-full"
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       handleRemoveServicio(servicio.servicioId);
//                                     }}
//                                   >
//                                     <X className="h-4 w-4" />
//                                   </Button>
//                                 </TooltipTrigger>
//                                 <TooltipContent>
//                                   <p>Quitar servicio</p>
//                                 </TooltipContent>
//                               </Tooltip>
//                             </TooltipProvider>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <div className='flex justify-between'>
//                     <h3 className="font-semibold mb-2">Medicamentos</h3>
//                     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button className="mt-2">Agregar Medicamento</Button>
//                       </DialogTrigger>
//                       <DialogContent>
//                         <DialogHeader>
//                           <DialogTitle>Agregar Medicamento</DialogTitle>
//                         </DialogHeader>
//                         <MedicamentoForm medicamentos={medicamentos} onSubmit={handleMedicamentoSubmit} />
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Medicamento</TableHead>
//                         <TableHead>Cantidad</TableHead>
//                         <TableHead>Costo Unitario</TableHead>
//                         <TableHead>Precio Total</TableHead>
//                         <TableHead>Dosificación</TableHead>
//                         <TableHead>Acciones</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {formTratamiento.medicamentos.map((med, index) => (
//                         <TableRow key={index}>
//                           <TableCell>{med.medicamento!.nombre}</TableCell>
//                           <TableCell>
//                             <CustomNumberInput
//                               value={med.cantidad}
//                               onValueChange={(value) => actualizarMedicamento(index, { cantidad: value })}
//                               min={1}
//                             />
//                           </TableCell>
//                           <TableCell>{med.costoUnitario}</TableCell>
//                           <TableCell>{(med.cantidad * parseFloat(med.costoUnitario)).toFixed(2)}</TableCell>
//                           <TableCell>{med.dosificacion}</TableCell>
//                           <TableCell>
//                             <div className="flex space-x-2">
//                               <TooltipProvider>
//                                 <Tooltip>
//                                   <TooltipTrigger asChild>
//                                     <Button
//                                       variant="ghost"
//                                       size="icon"
//                                       className="text-yellow-500 hover:text-yellow-600"
//                                       onClick={() => {/* Lógica para editar */ }}
//                                     >
//                                       <Edit className="h-4 w-4" />
//                                     </Button>
//                                   </TooltipTrigger>
//                                   <TooltipContent>
//                                     <p>Editar medicamento</p>
//                                   </TooltipContent>
//                                 </Tooltip>
//                               </TooltipProvider>
//                               <TooltipProvider>
//                                 <Tooltip>
//                                   <TooltipTrigger asChild>
//                                     <Button
//                                       variant="ghost"
//                                       size="icon"
//                                       className="text-destructive hover:text-destructive/90"
//                                       onClick={() => eliminarMedicamento(index)}
//                                     >
//                                       <Trash2 className="h-4 w-4" />
//                                     </Button>
//                                   </TooltipTrigger>
//                                   <TooltipContent>
//                                     <p>Eliminar medicamento</p>
//                                   </TooltipContent>
//                                 </Tooltip>
//                               </TooltipProvider>
//                             </div>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold mb-2">Información de Pago</h3>
//                   <p className='text-center text-2xl font-bold'>Total a Cancelar: Bs.{calcularTotalTratamiento().toFixed(2)}</p>
//                   <FormField
//                     control={form.control}
//                     name="detalle"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Detalle del Pago</FormLabel>
//                         <FormControl>
//                           <Textarea
//                             {...field}
//                             onChange={(e) => {
//                               field.onChange(e);
//                               actualizarCampo('detalle', e.target.value);
//                             }}
//                             value={field.value || ''}
//                             className='resize-none'
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <div className='mt-4'>
//                     <FormField
//                       control={form.control}
//                       name="esAyudaVoluntaria"
//                       render={({ field }) => (
//                         <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                           <div className="space-y-0.5">

//                             <FormLabel className="text-base">
//                               Ayuda Voluntaria
//                             </FormLabel>
//                             <FormDescription>
//                               Marcar si el pago es una ayuda voluntaria
//                             </FormDescription>
//                           </div>
//                           <FormControl>
//                             <Switch
//                               checked={field.value}
//                               onCheckedChange={(checked) => {
//                                 field.onChange(checked);
//                                 actualizarCampo('esAyudaVoluntaria', checked);
//                               }}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>
//                 <div className='flex justify-end gap-2'>
//                   <Button type='button' variant="secondary" onClick={handleResetForm}>Limpiar Formulario</Button>
//                   <Button type="submit" variant='expandIcon' className='bg-gradient' Icon={Edit} iconPlacement='right'>
//                     {tratamiento ? 'Actualizar Tratamiento' : 'Crear Tratamiento'}
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </form>
//         </Form>
//       </div>
//       <div className='w-full lg:w-3/12'>
//         <ServicioSelector servicios={servicios} onSelectServicio={handleServicioClick} />
//       </div>
//     </div>
//   );
// };

// interface MedicamentoFormProps {
//   medicamentos: MedicamentoT[];
//   onSubmit: (medicamento: MedicamentoT, cantidad: number, costoUnitario: number, dosificacion: string) => void;
// }

// const MedicamentoForm: React.FC<MedicamentoFormProps> = ({ medicamentos, onSubmit }) => {
//   const [selectedMedicamento, setSelectedMedicamento] = useState<MedicamentoT | null>(null);
//   const [cantidad, setCantidad] = useState(1);
//   const [costoUnitario, setCostoUnitario] = useState(0);
//   const [dosificacion, setDosificacion] = useState('');

//   const handleSubmit = () => {
//     if (selectedMedicamento) {
//       onSubmit(selectedMedicamento, cantidad, costoUnitario, dosificacion);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className='grid grid-cols-2 gap-4'>
//         <Select onValueChange={(value) => setSelectedMedicamento(medicamentos.find(m => m.id === parseInt(value)) || null)}>
//           <SelectTrigger>
//             <SelectValue placeholder="Seleccione un medicamento" />
//           </SelectTrigger>
//           <SelectContent>
//             {medicamentos.map((med) => (
//               <SelectItem key={med.id} value={med.id.toString()}>{med.nombre}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         <div>
//           <CustomNumberInput
//             value={cantidad}
//             onValueChange={setCantidad}
//             min={1}
//           />
//           <Input
//             type="number"
//             placeholder="Costo Unitario"
//             value={costoUnitario}
//             onChange={(e) => setCostoUnitario(parseFloat(e.target.value))}
//             min={0}
//             step={0.01}
//           />
//           <Textarea
//             placeholder="Dosificación"
//             value={dosificacion}
//             onChange={(e) => setDosificacion(e.target.value)}
//             className='resize-none'
//           />
//         </div>
//       </div>
//       <div className='flex justify-end gap-2'>
//         <Button type="button" onClick={handleSubmit} variant='expandIcon' Icon={ArrowDown} iconPlacement='right'>
//           Agregar Medicamento
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default TratamientoForm;




{/* <div className="border-2 border-dashed rounded-md p-4">
                   <h3 className="font-semibold mb-2">Servicios Seleccionados</h3>
                   <div className="">
                     {formTratamiento.servicios.map((servicio, index) => (
                       <Card
                         key={servicio.servicioId}
                         className={`relative cursor-pointer ${selectedServicio === servicio.servicioId ? 'ring-2 ring-primary' : ''
                           }`}
                         onClick={() => handleServicioClick(servicio.servicio!)}
                       >
                         <CardContent className="p-2 flex flex-col w-full relative m-3">
                           <div>
                             <p className="font-semibold truncate mr-8">{index + 1 }. {servicio.servicio!.nombre}</p>
                             <p className="text-lg text-muted-foreground">Bs. {servicio.precioServicio}</p>
                           </div>
                           {selectedServicio === servicio.servicioId && (
                             <Button
                               variant="ghost"
                               size="icon"
                               className="text-destructive absolute right-1 top-1 transform translate-y-1/2"
                               onClick={(e) => {
                                 e.stopPropagation();
                                 handleRemoveServicio(servicio.servicioId);
                               }}
                             >
                               <X className="h-4 w-4" />
                             </Button>
                           )}
                         </CardContent>
                       </Card>
                     ))}
                   </div>
                 </div> */}