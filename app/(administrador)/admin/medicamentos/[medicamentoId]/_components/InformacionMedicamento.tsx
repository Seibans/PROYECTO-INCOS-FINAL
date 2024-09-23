import React from 'react'
import { Medicamento } from '@prisma/client'
import Image from 'next/image';
import { Dog } from 'lucide-react';
import { FormEditarMedicamento } from './FormEditarMedicamento';
import { FormMedicamentoGlobal } from '../../_components/FormMedicamentoGlobalChat';
import { MedicamentoT } from '@/types';
import FormSubirImagen from './File';
import CambiarImagen from '@/components/admin/CambiarImagen.component';

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
        <div className="grid grid-cols-1 lg:grid-cols-1 lg:gap-x-10 gap-y-4">
            <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
                <div>
                    <CambiarImagen
                        id={medicamento.id}
                        imagenPrevia={medicamento.imagen}
                        componente="medicamento"
                    />
                    <FormMedicamentoGlobal medicamento={medicamento} />
                </div>
            </div>
        </div>
    )
}
