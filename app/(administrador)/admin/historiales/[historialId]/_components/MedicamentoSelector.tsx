'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MedicamentoT, TMFormT } from '@/types';
import { CustomNumberInput } from '@/components/global/CustomNumberInput';
import { Edit, Plus } from 'lucide-react';
import { TipoMedicamento } from '@prisma/client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface MedicamentoSelectorProps {
  medicamentos: MedicamentoT[];
  onSelectMedicamento: (medicamento: MedicamentoT, cantidad: number, costoUnitario: number, dosificacion: string) => void;
  initialMedicamento?: TMFormT;
}

const MedicamentoSelector: React.FC<MedicamentoSelectorProps> = ({ medicamentos, onSelectMedicamento, initialMedicamento }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<TipoMedicamento | 'Todos'>('Todos');
  const [selectedMedicamento, setSelectedMedicamento] = useState<MedicamentoT | null>(null);
  const [cantidad, setCantidad] = useState(initialMedicamento?.cantidad || 1);
  const [costoUnitario, setCostoUnitario] = useState(initialMedicamento?.costoUnitario ? parseFloat(initialMedicamento.costoUnitario) : 0);
  const [dosificacion, setDosificacion] = useState(initialMedicamento?.dosificacion || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialMedicamento) {
      setSelectedMedicamento(initialMedicamento.medicamento || null);
      setCantidad(initialMedicamento.cantidad);
      setCostoUnitario(parseFloat(initialMedicamento.costoUnitario));
      setDosificacion(initialMedicamento.dosificacion || '');
    } else {
      setSelectedMedicamento(null);
      setCantidad(1);
      setCostoUnitario(0);
      setDosificacion('');
    }
  }, [initialMedicamento]);

  useEffect(() => {
    if (selectedMedicamento) {
      setDosificacion(selectedMedicamento.indicaciones || '');
      setCostoUnitario(parseFloat(selectedMedicamento.precio.toString()));
    }
  }, [selectedMedicamento]);

  const filteredMedicamentos = medicamentos.filter(med => 
    med.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedType === 'Todos' || med.tipo === selectedType)
  );

  const handleSelectMedicamento = (medicamento:  MedicamentoT) => {
    setSelectedMedicamento(medicamento);
    setIsEditing(false);
  };

  const handleSubmit = () => {
    if (selectedMedicamento) {
      onSelectMedicamento(selectedMedicamento, cantidad, costoUnitario, dosificacion);
    }
  };

  return (
    <Card className="mt-4">
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="search-medicamento">Buscar medicamento</Label>
              <Input
                id="search-medicamento"
                placeholder="Buscar medicamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="filter-tipo">Filtrar por tipo</Label>
              <Select value={selectedType} onValueChange={(value) => setSelectedType(value as TipoMedicamento | 'Todos')}>
                <SelectTrigger id="filter-tipo">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  {Object.values(TipoMedicamento).map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ScrollArea className="h-[400px]">
              {filteredMedicamentos.map((med) => (
                <Card key={med.id} className="mb-2 cursor-pointer" onClick={() => handleSelectMedicamento(med)}>
                  <CardContent className="p-2 flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={med.imagen || '/placeholder.svg'} alt={med.nombre} />
                      <AvatarFallback>{med.nombre[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{med.nombre}</p>
                      <p className="text-sm text-muted-foreground">{med.descripcion}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </div>
          <div className="space-y-4">
            {selectedMedicamento && (
              <>
                <Card>
                    <CardTitle className='ml-2 mt-2'>
                      Medicamento
                    </CardTitle>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={selectedMedicamento.imagen || '/placeholder.svg'} alt={selectedMedicamento.nombre} />
                          <AvatarFallback>{selectedMedicamento.nombre[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{selectedMedicamento.nombre}</h3>
                          <p className="text-sm text-muted-foreground">{selectedMedicamento.descripcion}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Código</Label>
                          <p>{selectedMedicamento.codigo || 'N/A'}</p>
                        </div>
                        <div>
                          <Label>Tipo</Label>
                          <p>{selectedMedicamento.tipo || ''}</p>
                        </div>
                        <div>
                          <Label>Precio</Label>
                          <p>Bs. {selectedMedicamento.precio}</p>
                        </div>
                        <div>
                          <Label>Stock</Label>
                          <p>{selectedMedicamento.stock} Unidades.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                <div>
                  <Label htmlFor="dosificacion-medicamento">Dosificación</Label>
                  <div className="flex items-center space-x-2">
                    <Textarea
                      id="dosificacion-medicamento"
                      value={dosificacion}
                      onChange={(e) => setDosificacion(e.target.value)}
                      disabled={!isEditing}
                      placeholder="Dosificación"
                      className='resize-none'
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent align='end'>
                          <p>{isEditing ? 'Guardar dosificación' : 'Editar dosificación'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div>
                  <Label htmlFor="cantidad-medicamento">Cantidad</Label>
                  <div className='flex justify-center'>

                  <CustomNumberInput
                    id="cantidad-medicamento"
                    value={cantidad}
                    onValueChange={setCantidad}
                    min={1}
                    max={selectedMedicamento?.stock}
                    />
                    </div>
                </div>
                <div>
                  <Label htmlFor="costo-unitario">Costo Unitario</Label>
                  <Input
                    id="costo-unitario"
                    type="number"
                    value={costoUnitario}
                    onChange={(e) => setCostoUnitario(parseFloat(e.target.value))}
                    placeholder="Costo Unitario"
                    min={0}
                    step={0.01}
                    readOnly={true}
                  />
                </div>
                <div className='flex justify-center'>
                <Button onClick={handleSubmit} className="w-fit" variant={'expandIcon'} Icon={Plus} iconPlacement='right'>
                  {initialMedicamento ? 'Actualizar Medicamento' : 'Agregar Medicamento'}
                </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicamentoSelector;