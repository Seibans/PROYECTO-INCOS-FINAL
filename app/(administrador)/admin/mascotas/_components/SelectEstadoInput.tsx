// components/EstadoSelect.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface Estado {
  value: number;
  label: string;
}

interface EstadoSelectProps {
  estados: Estado[];
  onSelect: (value: string) => void;
  value: string;
}

export const EstadoSelect: React.FC<EstadoSelectProps> = ({ estados, onSelect, value }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredEstados = estados.filter((estado) =>
    estado.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSelectChange = (newValue: string) => {
    onSelect(newValue);
    setOpen(false);
    setSearchTerm("");
  };

  const selectedEstado = estados.find(estado => estado.value.toString() === value);

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={handleSelectChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue>
          {selectedEstado ? selectedEstado.label : "Selecciona el Estado"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <div className="mb-2 px-2 flex items-center">
          <SearchIcon className="h-5 w-5 mr-2" />
          <Input
            ref={inputRef}
            placeholder="Buscar Estado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            className="h-8"
          />
        </div>
        {filteredEstados.length > 0 ? (
          filteredEstados.map((estado) => (
            <SelectItem key={estado.value.toString()} value={estado.value.toString()}>
              {estado.label}
            </SelectItem>
          ))
        ) : (
          <div className="p-2 text-center text-gray-500">No se encontraron resultados</div>
        )}
      </SelectContent>
    </Select>
  );
};