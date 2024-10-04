"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { tratamientoSchema } from '@/schemas';
import { useTratamientoStore } from '@/store/tratamientoStore';
import { obtenerTratamiento, crearTratamiento, actualizarTratamiento } from '@/actions/tratamiento';
import {MedicamentoSelector} from './MedicamentoSelector';
// import ServicioSelector from './ServicioSelector';
import { useRouter } from 'next/navigation'
import TratamientoList from './TratamientoList';


interface TratamientoFormProps {
    historialId: number;
    tratamientoId: number | null;
}

const TratamientoForm: React.FC<TratamientoFormProps> = ({ historialId, tratamientoId }) => {
    const { tratamiento, setTratamiento, resetTratamiento } = useTratamientoStore();
    const { register, handleSubmit, reset, setValue } = useForm({
        resolver: zodResolver(tratamientoSchema),
        defaultValues: tratamiento || {}
    });

    useEffect(() => {
    }, [historialId, tratamientoId, setTratamiento, resetTratamiento, reset]);

    const onSubmit = async (data: any) => {
        if (tratamientoId) {
            await actualizarTratamiento(historialId, tratamientoId, data);
        } else {
            await crearTratamiento(historialId, data);
        }
    };

    return (
        <div className="flex">
        <Card className='w-2/3'>
            <CardHeader>
                <CardTitle>{tratamientoId ? 'Editar Tratamiento' : 'Nuevo Tratamiento'}</CardTitle>
            </CardHeader>
            <CardContent>

                {/* PONERLO EN EL COMPONENTE FORM
                <Form>
  <FormField
    control={...}
    name="..."
    render={() => (
      <FormItem>
        <FormLabel />
        <FormControl>
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />
</Form> */}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input {...register('descripcion')} placeholder="Descripción" />
                    <Textarea {...register('diagnostico')} placeholder="Diagnóstico" />

                    {/* DEBES USAR PRINCIPALMENTE EL ESTADO DE ZUSTAND, QUE DEBE SER UNA ESPECIE DE OBJETO CON SUS DATOS, Y UN ARRAY DE SERVICIOS Y ARRAY DE MEDICAMENTOS */}
                    {/* <MedicamentoSelector /> */}
                    {/* <ServicioSelector /> */}
                    <Button type="submit">Guardar Tratamiento</Button>
                </form>
            </CardContent>
        </Card>
        <Card className="w-1/3">
            <CardHeader>
                <CardTitle>Tratamientos</CardTitle>
            </CardHeader>
            <CardContent>
                <TratamientoList historialId={historialId} tratamientoSeleccionado={tratamientoId} />
            </CardContent>
        </Card>
        </div>
    );
};

export default TratamientoForm;