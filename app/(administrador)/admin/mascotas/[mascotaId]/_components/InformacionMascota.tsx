"use client"
import React from 'react'
import { Mascota } from '@prisma/client'
import Image from 'next/image';
import { useEffect, useState } from "react";
import { Dog } from 'lucide-react';
import { FormEditarMascota } from './FormEditarMascota';
import CambiarImagen from '@/components/admin/CambiarImagen.component';
import { FormMascotaGlobal } from '../../_components/FormMascotaGlobal';
import { usuariosMascota } from "@/actions/usuarios";
import { MascotaT } from '@/types';


type InformacionMascotaProps = {
    mascota: MascotaT;
};

export const InformacionMascota = (props: InformacionMascotaProps) => {
    const { mascota } = props;

    const [usuarios, setUsuarios] = useState<any[]>([]);

	useEffect(() => {
		const loadUsuarios = async () => {
			const usuariosData = await usuariosMascota();
			setUsuarios(usuariosData);
		};
		loadUsuarios();
	}, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
            <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
                <h1 className="text-2xl font-bold">Información de la Mascota</h1>
                <p>Imagen de la mascota:</p>
                <div>
                    <CambiarImagen
                        id={mascota.id}
                        imagenPrevia={mascota.imagen}
                        componente="mascota"
                    />
                    {/* <FormEditarMascota mascota={mascota} /> */}
                    <FormMascotaGlobal mascota={mascota} usuarios={usuarios}/>
                </div>
            </div>
            {/* <div className="p-4 rounded-lg shadow-md bg-background hover:shadow-lg h-min">
                <div className="flex items-center justify-between gap-x-2">
                    <div className="flex items-center gap-x-2">
                        <Dog className='w-5 h-5' />
                        RELACION
                    </div>

                    <div>
                        <p>Nueva Agregado</p>
                    </div>

                </div>

                <p>Lista</p>
            </div> */}
        </div>
    )
}
