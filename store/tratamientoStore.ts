import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TratamientoT, TratamientoMedicamentoT, ServicioT } from '@/types'

interface TratamientoStore {
    tratamiento: TratamientoT | null;
    setTratamiento: (tratamiento: TratamientoT | null) => void;
    actualizarDescripcion: (descripcion: string) => void;
    actualizarDiagnostico: (diagnostico: string) => void;
    agregarMedicamento: (medicamento: TratamientoMedicamentoT) => void;
    actualizarMedicamento: (id: number, medicamento: Partial<TratamientoMedicamentoT>) => void;
    eliminarMedicamento: (id: number) => void;
    agregarServicio: (servicio: ServicioT) => void;
    eliminarServicio: (id: number) => void;
    calcularTotalTratamiento: () => number;
    resetTratamiento: () => void;
}


// FALTA COMPLETAR O MODIFICAR POR COMPLETO ESTE ESTADO DE ZUSTAND
export const useTratamientoStore = create<TratamientoStore>()(
    persist(
        (set, get) => ({
            tratamiento: null,
            setTratamiento: (tratamiento) => set({ tratamiento }),
            actualizarDescripcion: (descripcion) => set((state) => ({
                tratamiento: state.tratamiento ? { ...state.tratamiento, descripcion } : null
            })),
            actualizarDiagnostico: (diagnostico) => set((state) => ({
                tratamiento: state.tratamiento ? { ...state.tratamiento, diagnostico } : null
            })),
            agregarMedicamento: (medicamento) => set((state) => ({
                tratamiento: state.tratamiento
                    ? {
                        ...state.tratamiento,
                        medicamentos: [...state.tratamiento.medicamentos, medicamento]
                    }
                    : null
            })),
            actualizarMedicamento: (id, medicamento) => set((state) => ({
                tratamiento: state.tratamiento
                    ? {
                        ...state.tratamiento,
                        medicamentos: state.tratamiento.medicamentos.map((m) =>
                            m.id === id ? { ...m, ...medicamento } : m
                        )
                    }
                    : null
            })),
            eliminarMedicamento: (id) => set((state) => ({
                tratamiento: state.tratamiento
                    ? {
                        ...state.tratamiento,
                        medicamentos: state.tratamiento.medicamentos.filter((m) => m.id !== id)
                    }
                    : null
            })),
            agregarServicio: (servicio) => set((state) => ({
                tratamiento: state.tratamiento
                    ? {
                        ...state.tratamiento,
                        servicios: [...state.tratamiento.servicios, servicio]
                    }
                    : null
            })),
            eliminarServicio: (id) => set((state) => ({
                tratamiento: state.tratamiento
                    ? {
                        ...state.tratamiento,
                        servicios: state.tratamiento.servicios.filter((s) => s.id !== id)
                    }
                    : null
            })),
            calcularTotalTratamiento: () => {
                return 0;
            },
            resetTratamiento: () => set({ tratamiento: null }),
        }),
        {
            name: 'tratamiento-storage',
        }
    )
)