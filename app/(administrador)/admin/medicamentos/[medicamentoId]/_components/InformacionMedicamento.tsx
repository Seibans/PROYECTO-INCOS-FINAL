import React from 'react'
import { Medicamento } from '@prisma/client'
import { FormMedicamentoGlobal } from '../../_components/FormMedicamentoGlobal';
import CambiarImagen from '@/components/admin/CambiarImagen.component';

type InformacionMedicamentoProps = {
    medicamento: Medicamento;
};

export const InformacionMedicamento = (props: InformacionMedicamentoProps) => {
    const { medicamento } = props;
    console.log(medicamento);

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
