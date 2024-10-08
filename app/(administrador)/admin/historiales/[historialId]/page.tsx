import { redirect } from 'next/navigation';
import { obtenerHistorialconMascotayUsuario, obtenerTratamientoCompleto } from '@/actions/historiales';
import { obtenerServicios } from '@/actions/servicios';
import { obtenerMedicamentos } from '@/actions/medicamentos';
import HistorialMedicoView from '../_components/HistorialMedicoView';

interface PageProps {
    params: { historialId: string };
    searchParams: { tratamientoId?: string };
}

export default async function HistorialIdPage({ params, searchParams }: PageProps) {
    const historialId = parseInt(params.historialId);
    const tratamientoId = searchParams.tratamientoId ? parseInt(searchParams.tratamientoId) : undefined;

    if (isNaN(historialId)) {
        console.error('ID de historial inválido');
        redirect("/admin/historiales");
    }

    const historial = await obtenerHistorialconMascotayUsuario(historialId);
    if (!historial || 'error' in historial) {
        console.error('Historial no encontrado o error al obtenerlo');
        redirect("/admin/historiales");
    }

    let tratamiento = null;
    if (tratamientoId !== undefined) {
        if (isNaN(tratamientoId)) {
            console.error('ID de tratamiento inválido');
        } else {
            tratamiento = await obtenerTratamientoCompleto(tratamientoId);
            if (!tratamiento || 'error' in tratamiento) {
                console.error('Tratamiento no encontrado o error al obtenerlo');
                tratamiento = null;
            }
        }
    }
    const servicios = await obtenerServicios();
    const medicamentos = await obtenerMedicamentos();
    return (
        <HistorialMedicoView
            historial={historial}
            tratamiento={tratamiento}
            servicios={servicios}
            medicamentos={medicamentos}
        />
    );
}