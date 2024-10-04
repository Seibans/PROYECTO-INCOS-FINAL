import React from 'react'
import { FormServicioGlobal } from '../../_components/FormServicioGlobal';
import { ServicioT } from '@/types';

type InformacionServicioProps = {
    servicio: ServicioT;
};

export const InformacionServicio = (props: InformacionServicioProps) => {
    const { servicio } = props;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-1 lg:gap-x-10 gap-y-4">
            <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
                <div>
                    <FormServicioGlobal servicio={servicio} />
                </div>
            </div>
        </div>
    )
}
