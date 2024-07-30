import React from 'react'
import { User } from '@prisma/client'
import Image from 'next/image';
import { Dog } from 'lucide-react';
// import { FormEditarUsuario } from './FormEditarUsuario';

type InformacionUsuarioProps = {
    usuario: User;
};

const DefaultImage: React.FC<{ src: string | null, alt: string }> = ({ src, alt }) => {
    const imageSrc = src ?? '/images/imagen-gato.png';
    return <Image src={imageSrc} alt={alt} width={200} height={200} />;
};

export const InformacionUsuario = (props: InformacionUsuarioProps) => {
    const { usuario } = props;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
            <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
                <div>
                    <DefaultImage src={usuario.image} alt="Imagen del Usuario" />
                    {/* <FormEditarUsuario usuario={usuario}/> */}
                </div>
            </div>

            <div className="p-4 rounded-lg shadow-md bg-background hover:shadow-lg h-min">
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
            </div>
        </div>
    )
}
