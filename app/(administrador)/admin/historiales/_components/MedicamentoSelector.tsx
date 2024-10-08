// 'use client'

// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Textarea } from "@/components/ui/textarea";
// import { MedicamentoT, TMFormT } from '@/types';
// import { CustomNumberInput } from '@/components/global/CustomNumberInput';
// import { Edit, Plus } from 'lucide-react';
// import { TipoMedicamento } from '@prisma/client';

// interface MedicamentoSelectorProps {
//   medicamentos: MedicamentoT[];
//   onSelectMedicamento: (medicamento: MedicamentoT, cantidad: number, costoUnitario: number, dosificacion: string) => void;
//   initialMedicamento?: TMFormT;
// }

// const MedicamentoSelector: React.FC<MedicamentoSelectorProps> = ({ medicamentos, onSelectMedicamento, initialMedicamento }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedType, setSelectedType] = useState<TipoMedicamento | 'Todos'>('Todos');
//   const [selectedMedicamento, setSelectedMedicamento] = useState<MedicamentoT | null>(null);

//   const [cantidad, setCantidad] = useState(initialMedicamento?.cantidad || 1);

//   const [costoUnitario, setCostoUnitario] = useState(initialMedicamento?.costoUnitario ? parseFloat(initialMedicamento.costoUnitario) : 0);
//   const [dosificacion, setDosificacion] = useState(initialMedicamento?.dosificacion || '');
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (selectedMedicamento) {
//       setDosificacion(selectedMedicamento.indicaciones || '');
//     }
//   }, [selectedMedicamento]);

//   const filteredMedicamentos = medicamentos.filter(med => 
//     med.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (selectedType === 'Todos' || med.tipo === selectedType)
//   );

//   const handleSelectMedicamento = (medicamento: MedicamentoT) => {
//     setSelectedMedicamento(medicamento);
//     setIsEditing(false);
//   };

//   const handleSubmit = () => {
//     if (selectedMedicamento) {
//       onSelectMedicamento(selectedMedicamento, cantidad, parseFloat(selectedMedicamento.precio.toString()), dosificacion);
//       setSelectedMedicamento(null);
//       setCantidad(1);
//       setDosificacion('');
//       setIsEditing(false);
//     }
//   };

//   return (
//     <Card className="mt-4">
//       <CardHeader>
//         <CardTitle>Medicamentos</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="space-y-4">
//             <Input
//               placeholder="Buscar medicamento..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Select value={selectedType} onValueChange={(value) => setSelectedType(value as TipoMedicamento | 'Todos')}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Filtrar por tipo" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Todos">Todos</SelectItem>
//                 {Object.values(TipoMedicamento).map((tipo) => (
//                   <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <ScrollArea className="h-[400px]">
//               {filteredMedicamentos.map((med) => (
//                 <Card key={med.id} className="mb-2 cursor-pointer" onClick={() => handleSelectMedicamento(med)}>
//                   <CardContent className="p-2 flex items-center space-x-2">
//                     <Avatar>
//                       <AvatarImage src={med.imagen || '/placeholder.svg'} alt={med.nombre} />
//                       <AvatarFallback>{med.nombre[0]}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-semibold">{med.nombre}</p>
//                       <p className="text-sm text-muted-foreground">{med.descripcion}</p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </ScrollArea>
//           </div>
//           <div className="space-y-4">
//             {selectedMedicamento && (
//               <>
//                 <Avatar className="w-16 h-16">
//                   <AvatarImage src={selectedMedicamento.imagen || '/placeholder.svg'} alt={selectedMedicamento.nombre} />
//                   <AvatarFallback>{selectedMedicamento.nombre[0]}</AvatarFallback>
//                 </Avatar>
//                 <Input readOnly value={selectedMedicamento.nombre} />
//                 <Textarea readOnly value={selectedMedicamento.descripcion || ''} />
//                 <Input readOnly value={`Precio: Bs. ${selectedMedicamento.precio}`} />
//                 <div className="flex items-center space-x-2">
//                   <Textarea
//                     value={dosificacion}
//                     onChange={(e) => setDosificacion(e.target.value)}
//                     readOnly={!isEditing}
//                     placeholder="Dosificación"
//                   />
//                   <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)}>
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                 </div>
//                 <CustomNumberInput
//                   value={cantidad}
//                   onValueChange={setCantidad}
//                   min={1}
//                 />
//                 <Button onClick={handleSubmit} className="w-full">
//                   <Plus className="mr-2 h-4 w-4" /> Agregar Medicamento
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default MedicamentoSelector;


'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { MedicamentoT, TMFormT } from '@/types';
import { CustomNumberInput } from '@/components/global/CustomNumberInput';
import { Edit, Plus } from 'lucide-react';
import { TipoMedicamento } from '@prisma/client';

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

  const handleSelectMedicamento = (medicamento: MedicamentoT) => {
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
            <Input
              placeholder="Buscar medicamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={selectedType} onValueChange={(value) => setSelectedType(value as TipoMedicamento | 'Todos')}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                {Object.values(TipoMedicamento).map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedMedicamento.imagen || '/placeholder.svg'} alt={selectedMedicamento.nombre} />
                  <AvatarFallback>{selectedMedicamento.nombre[0]}</AvatarFallback>
                </Avatar>
                <Input readOnly value={selectedMedicamento.nombre} />
                <Textarea readOnly value={selectedMedicamento.descripcion || ''} />
                <Input readOnly value={`Precio: Bs. ${selectedMedicamento.precio}`} />
                <div className="flex items-center space-x-2">
                  <Textarea
                    value={dosificacion}
                    onChange={(e) => setDosificacion(e.target.value)}
                    readOnly={!isEditing}
                    placeholder="Dosificación"
                  />
                  <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <CustomNumberInput
                  value={cantidad}
                  onValueChange={setCantidad}
                  min={1}
                />
                <Input
                  type="number"
                  value={costoUnitario}
                  onChange={(e) => setCostoUnitario(parseFloat(e.target.value))}
                  placeholder="Costo Unitario"
                />
                <Button onClick={handleSubmit} className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> {initialMedicamento ? 'Actualizar Medicamento' : 'Agregar Medicamento'}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicamentoSelector;