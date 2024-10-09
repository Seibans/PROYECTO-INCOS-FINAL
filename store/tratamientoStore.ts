// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
// import { TratamientoFormT, ServicioT, TratamientoMedicamentoT } from '@/types'

// interface TratamientoStore {
//     tratamiento: TratamientoFormT | null;
//     setTratamiento: (tratamiento: TratamientoFormT | null) => void;
//     actualizarCampo: (campo: keyof TratamientoFormT, valor: any) => void;
//     agregarServicio: (servicio: ServicioT) => void;
//     eliminarServicio: (id: number) => void;
//     agregarMedicamento: (medicamento: TratamientoMedicamentoT) => void;
//     actualizarMedicamento: (id: number, medicamento: Partial<TratamientoMedicamentoT>) => void;
//     eliminarMedicamento: (id: number) => void;
//     actualizarPago: (pago: Partial<TratamientoFormT['pago']>) => void;
//     calcularTotalTratamiento: () => number;
//     resetTratamiento: () => void;
// }

// export const useTratamientoStore = create<TratamientoStore>()(
//     persist(
//         (set, get) => ({
//             tratamiento: null,
//             setTratamiento: (tratamiento) => set({ tratamiento }),
//             actualizarCampo: (campo, valor) => set((state) => ({
//                 tratamiento: state.tratamiento ? { ...state.tratamiento, [campo]: valor } : null
//             })),
//             agregarServicio: (servicio) => set((state) => ({
//                 tratamiento: state.tratamiento
//                     ? {
//                         ...state.tratamiento,
//                         servicios: [...state.tratamiento.servicios, servicio]
//                     }
//                     : null
//             })),
//             eliminarServicio: (id) => set((state) => ({
//                 tratamiento: state.tratamiento
//                     ? {
//                         ...state.tratamiento,
//                         servicios: state.tratamiento.servicios.filter((s) => s.id !== id)
//                     }
//                     : null
//             })),
//             agregarMedicamento: (medicamento) => set((state) => ({
//                 tratamiento: state.tratamiento
//                     ? {
//                         ...state.tratamiento,
//                         medicamentos: [...state.tratamiento.medicamentos, medicamento]
//                     }
//                     : null
//             })),
//             actualizarMedicamento: (id, medicamento) => set((state) => ({
//                 tratamiento: state.tratamiento
//                     ? {
//                         ...state.tratamiento,
//                         medicamentos: state.tratamiento.medicamentos.map((m) =>
//                             m.id === id ? { ...m, ...medicamento } : m
//                         )
//                     }
//                     : null
//             })),
//             eliminarMedicamento: (id) => set((state) => ({
//                 tratamiento: state.tratamiento
//                     ? {
//                         ...state.tratamiento,
//                         medicamentos: state.tratamiento.medicamentos.filter((m) => m.id !== id)
//                     }
//                     : null
//             })),
//             actualizarPago: (pago) => set((state) => ({
//                 tratamiento: state.tratamiento
//                     ? {
//                         ...state.tratamiento,
//                         pago: { ...state.tratamiento.pago, ...pago }
//                     }
//                     : null
//             })),
//             calcularTotalTratamiento: () => {
//                 const state = get();
//                 if (!state.tratamiento) return 0;
                
//                 const serviciosTotal = state.tratamiento.servicios.reduce((total, servicio) => total + parseFloat(servicio.precio), 0);
//                 const medicamentosTotal = state.tratamiento.medicamentos.reduce((total, med) => total + (med.cantidad * med.costoUnitario), 0);
                
//                 return serviciosTotal + medicamentosTotal;
//             },
//             resetTratamiento: () => set({ tratamiento: null }),
//         }),
//         {
//             name: 'tratamiento-storage',
//         }
//     )
// )


import { create } from 'zustand'
import { TratamientoFormT, STFormT, TMFormT } from '@/types'

interface TratamientoStore {
  tratamiento: TratamientoFormT;
  setTratamiento: (tratamiento: TratamientoFormT) => void;
  actualizarCampo: (campo: keyof TratamientoFormT, valor: any) => void;
  agregarServicio: (servicio: STFormT) => void;
  eliminarServicio: (servicioId: number) => void;
  agregarMedicamento: (medicamento: TMFormT) => void;
  actualizarMedicamento: (index: number, medicamento: Partial<TMFormT>) => void;
  eliminarMedicamento: (index: number) => void;
  calcularTotalTratamiento: () => number;
  resetTratamiento: () => void;
  servicioYaAgregado: (servicioId: number) => boolean;
}

const tratamientoInicial: TratamientoFormT = {
  descripcion: '',
  estado: 1,
  diagnostico: null,
  historialMascotaId: 0,
  servicios: [],
  medicamentos: [],
  total: 0,
  detalle: null,
  esAyudaVoluntaria: false,
};

export const useTratamientoStore = create<TratamientoStore>((set, get) => ({
  tratamiento: tratamientoInicial,
  setTratamiento: (tratamiento) => set({ tratamiento }),
  actualizarCampo: (campo, valor) => set((state) => ({
    tratamiento: { ...state.tratamiento, [campo]: valor }
  })),
  agregarServicio: (servicio) => set((state) => {
    const nuevosTratamientos = {
      ...state.tratamiento,
      servicios: [...state.tratamiento.servicios, servicio]
    };
    const nuevoTotal = get().calcularTotalTratamiento();
    return { tratamiento: { ...nuevosTratamientos, total: nuevoTotal } };
  }),
  eliminarServicio: (servicioId) => set((state) => {
    const nuevosTratamientos = {
      ...state.tratamiento,
      servicios: state.tratamiento.servicios.filter((s) => s.servicioId !== servicioId)
    };
    const nuevoTotal = get().calcularTotalTratamiento();
    return { tratamiento: { ...nuevosTratamientos, total: nuevoTotal } };
  }),
  agregarMedicamento: (medicamento) => set((state) => {
    const nuevosTratamientos = {
      ...state.tratamiento,
      medicamentos: [...state.tratamiento.medicamentos, medicamento]
    };
    const nuevoTotal = get().calcularTotalTratamiento();
    return { tratamiento: { ...nuevosTratamientos, total: nuevoTotal } };
  }),
  actualizarMedicamento: (index, medicamento) => set((state) => {
    const nuevosTratamientos = {
      ...state.tratamiento,
      medicamentos: state.tratamiento.medicamentos.map((m, i) =>
        i === index ? { ...m, ...medicamento } : m
      )
    };
    const nuevoTotal = get().calcularTotalTratamiento();
    return { tratamiento: { ...nuevosTratamientos, total: nuevoTotal } };
  }),
  eliminarMedicamento: (index) => set((state) => {
    const nuevosTratamientos = {
      ...state.tratamiento,
      medicamentos: state.tratamiento.medicamentos.filter((_, i) => i !== index)
    };
    const nuevoTotal = get().calcularTotalTratamiento();
    return { tratamiento: { ...nuevosTratamientos, total: nuevoTotal } };
  }),
  calcularTotalTratamiento: () => {
    const state = get();
    const serviciosTotal = state.tratamiento.servicios.reduce((total, servicio) => 
      total + parseFloat(servicio.precioServicio), 0);
    const medicamentosTotal = state.tratamiento.medicamentos.reduce((total, med) => 
      total + (med.cantidad * parseFloat(med.costoUnitario)), 0);
    return serviciosTotal + medicamentosTotal;
  },
  resetTratamiento: () => set({ tratamiento: tratamientoInicial }),
  servicioYaAgregado: (servicioId) => {
    const state = get();
    return state.tratamiento.servicios.some(s => s.servicioId === servicioId);
  },
}));