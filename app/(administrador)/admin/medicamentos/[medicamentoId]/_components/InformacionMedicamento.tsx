import React from 'react'
import { Medicamento } from '@prisma/client'
import Image from 'next/image';
import { Dog } from 'lucide-react';
import { FormEditarMedicamento } from './FormEditarMedicamento';

type InformacionMedicamentoProps = {
    medicamento: Medicamento;
};

const DefaultImage: React.FC<{ src: string | null, alt: string }> = ({ src, alt }) => {
    const imageSrc = src ?? '/images/imagen-gato.png';
    return <Image src={imageSrc} alt={alt} width={200} height={200} />;
};

export const InformacionMedicamento = (props: InformacionMedicamentoProps) => {
    const { medicamento } = props;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
            <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
                <div>
                    {/* <DefaultImage src={medicamento.nombre} alt="Imagen del Medicamento" /> */}
                    <FormEditarMedicamento medicamento={medicamento} />
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
