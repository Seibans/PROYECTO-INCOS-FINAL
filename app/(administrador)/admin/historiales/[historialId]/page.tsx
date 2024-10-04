// // app/admin/historiales/[historialId]/page.tsx
// import { redirect } from 'next/navigation'
// import { auth } from "@/auth"
// import { obtenerHistorial, obtenerTratamiento } from '@/actions/transaccion'
// import HistorialMedicoView from '../_components/HistorialMedicoView'

// export default async function HistorialIdPage({ params, searchParams }: {
//   params: { historialId: string },
//   searchParams: { idTratamiento?: string }
// }) {
//   const { historialId } = params
//   const { idTratamiento } = searchParams

//   const usuario = await auth()
//   if (!usuario || !usuario.user) {
//     redirect("/login")
//   }

//   const historial = await obtenerHistorial(historialId)
//   if (!historial) {
//     redirect("/admin/historiales")
//   }

//   const tratamientoSeleccionado = idTratamiento ? await obtenerTratamiento(historialId, idTratamiento) : null

//   return (
//     <HistorialMedicoView
//       historial={historial}
//       tratamientoSeleccionado={tratamientoSeleccionado}
//     />
//   )
// }


// app/admin/historiales/[historialId]/page.tsx

import { redirect } from 'next/navigation';
import { auth } from "@/auth";
import { obtenerHistorialconMascotayUsuario, obtenerTratamientoCompleto } from '@/actions/historiales';
import { json } from 'stream/consumers';
// import { obtenerUsuario } from '@/actions/usuario';
import HistorialMedicoView from '../_components/HistorialMedicoView';

interface PageProps {
    params: { historialId: string };
    searchParams: { tratamientoId?: string };
}

export default async function HistorialIdPage({ params, searchParams }: PageProps) {
    const { historialId } = params;
    const { tratamientoId } = searchParams;

    const historial = await obtenerHistorialconMascotayUsuario(parseInt(historialId));
    const tratamiento = tratamientoId ? await obtenerTratamientoCompleto(parseInt(tratamientoId)) : null;
    if (!historial) {
        redirect("/admin/historiales");
    }
    console.log(historial);
    console.log(tratamiento);
    return (
        <HistorialMedicoView
            historial={historial}
            tratamientoSeleccionado={tratamientoId ? parseInt(tratamientoId) : null}
        />
    );
}