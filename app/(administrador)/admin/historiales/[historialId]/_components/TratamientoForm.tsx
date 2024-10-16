'use client'

import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { convertirNumeroEspanyol, numeroATexto } from '@/lib/numeroaTexto';

// import { TratamientoSchema } from '@/schemas/tratamiento';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

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
    calcularTotalServicios,
    calcularTotalMedicamentos,
    resetTratamiento
  } = useTratamientoStore();
  const router = useRouter();

  const form = useForm<TratamientoFormT>({
    //TODO: Agregar validacion de formulario
    // resolver: zodResolver(TratamientoSchema),
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
        resetTratamiento(historialId);
      // setTratamiento({
      //   ...formTratamiento,
      //   historialMascotaId: historialId,
      // });
    }
  // }, [tratamiento, historialId, setTratamiento]);
  }, [tratamiento, historialId, setTratamiento, resetTratamiento]);

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
    console.log(data);
    console.log(formTratamiento);
    console.log(tratamiento);
    console.log(tratamiento?.id)
    console.log(historialId)
    setIsConfirmDialogOpen(true);
  };


  const handleConfirmSubmit = async () => {
    const action = tratamiento ? actualizarTratamiento(historialId, tratamiento.id, formTratamiento) : crearTratamiento(historialId, formTratamiento);
    toast.promise(action, {
      loading: "Cargando...",
      success: (data) => {
        if (data.error) {
          setIsConfirmDialogOpen(false);
          throw new Error(data.error);
        } else {
          setIsConfirmDialogOpen(false);
          resetTratamiento(historialId);
          form.reset();
          router.refresh();
          return `${data.success}`;
        }
      },
      error: (error) => error.message,
    });
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
    const existingIndex = formTratamiento.medicamentos.findIndex(m => m.medicamentoId === medicamento.id);
    if (existingIndex !== -1) {
      actualizarMedicamento(existingIndex, {
        // medicamentoId: medicamento.id,
        cantidad: formTratamiento.medicamentos[existingIndex].cantidad + cantidad,
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
    setEditingMedicamentoIndex(null);
  };

  const handleEditMedicamento = (index: number) => {
    setEditingMedicamentoIndex(index);
    setIsDialogOpen(true);
  };

  const handleResetForm = () => {
    resetTratamiento(historialId);
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
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Servicios Seleccionados</h3>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="block lg:hidden">Agregar Servicio</Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                        <ServicioSelector servicios={servicios} onSelectServicio={handleAddServicio} />
                      </SheetContent>
                    </Sheet>
                  </div>
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
                                      e.preventDefault();
                                      handleRemoveServicio(servicio.servicioId);
                                    }}
                                    type='button'
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
                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                      setIsDialogOpen(open);
                      if (!open) {
                        setEditingMedicamentoIndex(null);
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button className="mt-2" type='button'>Agregar Medicamento</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
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
                        <TableHead>#</TableHead>
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
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{med.medicamento!.nombre}</TableCell>
                          <TableCell>
                            <CustomNumberInput
                              value={med.cantidad}
                              onValueChange={(value) => actualizarMedicamento(index, { cantidad: value })}
                              min={1}
                              max={med.medicamento!.stock}
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
                                      type='button'
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
                                      type='button'
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

                <div className=' border-2 lg:border-4 border-dashed rounded-md p-4'>
                  <div>
                    <h3 className="font-semibold mb-2">Información de Pago</h3>
                    <p className='text-center text-lg'>Total Servicios: Bs.{"   " + calcularTotalServicios().toFixed(2)}</p>
                    <p className='text-center text-lg'>Total Medicamentos: Bs.{"   " + calcularTotalMedicamentos().toFixed(2)}</p>
                    <p className='text-center text-xl font-bold'>Total a Cancelar: Bs.{"   " + calcularTotalTratamiento().toFixed(2)}</p>
                    <p className='text-center text-md md:text-lg'>{convertirNumeroEspanyol(calcularTotalTratamiento().toFixed(2))}</p>
                    {/* <p className='text-center text-lg'>{numeroATexto(calcularTotalTratamiento().toFixed(2))}</p> */}
                  </div>
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
      <div className='hidden lg:block lg:w-3/12'>
        <ServicioSelector servicios={servicios} onSelectServicio={handleAddServicio} />
      </div>

      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar {tratamiento ? 'Actualización' : 'Creación'} de Tratamiento</AlertDialogTitle>
            <AlertDialogDescription>
              Por favor, verifique los datos del tratamiento:
              <div className="mt-4 space-y-2">
                <p><strong>Descripción:</strong> {formTratamiento.descripcion}</p>
                <p><strong>Estado:</strong> {formTratamiento.estado}</p>
                <p><strong>Diagnóstico:</strong> {formTratamiento.diagnostico || 'No especificado'}</p>
                <p><strong>Total Servicios:</strong> Bs. {calcularTotalServicios().toFixed(2)}</p>
                <p><strong>Total Medicamentos:</strong> Bs. {calcularTotalMedicamentos().toFixed(2)}</p>
                <p><strong>Total a Cancelar:</strong> Bs. {calcularTotalTratamiento().toFixed(2)}</p>
                <p><strong>Detalle del Pago:</strong> {formTratamiento.detalle || 'No especificado'}</p>
                <p><strong>Ayuda Voluntaria:</strong> {formTratamiento.esAyudaVoluntaria ? 'Sí' : 'No'}</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel >Cancelar</AlertDialogCancel>
            <AlertDialogAction className='sm:w-fit px-0'>
                <Button variant='expandIcon' className='bg-gradient w-full' Icon={Edit} iconPlacement='right' onClick={handleConfirmSubmit}>
                {tratamiento ? 'Actualizar' : 'Crear'} Tratamiento
                </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TratamientoForm;
