// components/MedicamentoSelector.tsx

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MedicamentoT } from '@/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CustomNumberInput } from '../../../../../components/global/CustomNumberInput'

interface MedicamentoSelectorProps {
  medicamentos: MedicamentoT[]
  onSelect: (medicamento: MedicamentoT, cantidad: number, dosificacion: string) => void
}

export function MedicamentoSelector({ medicamentos, onSelect }: MedicamentoSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  // const [tipoSeleccionado, setTipoSeleccionado] = useState<TipoMedicamento | "">("")
  const [selectedMedicamento, setSelectedMedicamento] = useState<MedicamentoT | null>(null)
  const [cantidad, setCantidad] = useState(1)
  const [dosificacion, setDosificacion] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => setIsOpen(!isOpen)
  const handleAddMedicamento = () => {
    if (selectedMedicamento) {
      onSelect(selectedMedicamento, cantidad, dosificacion)
      setSelectedMedicamento(null)
      setCantidad(1)
      setDosificacion("")
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className="relative w-full" ref={containerRef}>
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        className="w-full justify-between"
        onClick={handleToggle}
      >
        {selectedMedicamento ? selectedMedicamento.nombre : "Seleccionar medicamento"}
        <Search className="h-4 w-4 opacity-50" />
      </Button>
      {isOpen && (
        <div className="absolute top-0 z-10 w-full mt-1 bg-popover text-popover-foreground shadow-md rounded-md border">
          <div className="flex p-2">
            <Search className='mt-1 mr-2'/>
            <Input
              placeholder="Buscar medicamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8"
            />
          </div>
          <div className="p-2">
          </div>
        </div>
      )}
      {selectedMedicamento && (
        <div className="mt-4 space-y-4">
          <Textarea
            value={dosificacion}
            onChange={(e) => setDosificacion(e.target.value)}
            placeholder="Dosificación"
          />
          <Button onClick={handleAddMedicamento}>Agregar al tratamiento</Button>
        </div>
      )}
    </div>
  )
}