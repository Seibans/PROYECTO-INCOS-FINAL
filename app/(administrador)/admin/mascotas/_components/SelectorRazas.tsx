import React, { useState, useRef, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SelectorRazas: React.FC<SearchableSelectProps> = ({ options, value, onChange, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSelectChange = (newValue: string) => {
    onChange(newValue);
    setOpen(false);
    setSearchTerm("");
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={handleSelectChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue>
          {selectedOption ? selectedOption.label : placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <div className="mb-2 px-2 flex items-center">
          <SearchIcon className="h-5 w-5 mr-2" />
          <Input
            ref={inputRef}
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            className="h-8"
          />
        </div>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        ) : (
          <div className="p-2 text-center text-gray-500">No se encontraron resultados</div>
        )}
      </SelectContent>
    </Select>
  );
};