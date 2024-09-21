"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, XIcon } from "lucide-react";
import { ReservaMedica } from "@/types"; // Importamos la interfaz para las citas médicas
import FormCitaMedica from "./formCitaMedica"; // El componente del formulario para crear citas

export default function CitasMedicas() {
  const [citas, setCitas] = useState<ReservaMedica[]>([]); // Estado local para almacenar las citas
  const [isModalOpen, setIsModalOpen] = useState(false); // Controlar la visibilidad del modal

  // Función para agregar nuevas citas desde el formulario
  const addCita = (newCita: ReservaMedica) => {
    setCitas([...citas, newCita]); // Actualizamos el estado con la nueva cita
    setIsModalOpen(false); // Cerramos el modal
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Citas Médicas Veterinarias</h1>

      {/* Resumen de citas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div
          className="bg-blue-100 p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-xl font-semibold mb-2">Citas Pendientes</h2>
          <p className="text-3xl font-bold">{citas.filter((c) => c.estado === "pendiente").length}</p>
        </motion.div>
        <motion.div
          className="bg-green-100 p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-xl font-semibold mb-2">Citas Completadas</h2>
          <p className="text-3xl font-bold">{citas.filter((c) => c.estado === "completada").length}</p>
        </motion.div>
        <motion.div
          className="bg-red-100 p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-xl font-semibold mb-2">Citas Canceladas</h2>
          <p className="text-3xl font-bold">{citas.filter((c) => c.estado === "cancelada").length}</p>
        </motion.div>
      </div>

      {/* Botón para abrir el modal de nueva cita */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
      >
        <PlusIcon className="mr-2 h-4 w-4" /> Nueva Cita
      </Button>

      {/* Tabla de citas */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha y Hora</TableHead>
            <TableHead>Servicio</TableHead>
            <TableHead>Detalles</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {citas.map((cita) => (
            <TableRow key={cita.id}>
              <TableCell>{format(cita.fechaReserva, "PPP p", { locale: es })}</TableCell>
              <TableCell>{cita.servicio}</TableCell>
              <TableCell>{cita.detalles}</TableCell>
              <TableCell>
                <Badge>
                  {cita.estado}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal para crear nueva cita */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Nueva Cita</h2>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  <XIcon className="h-6 w-6" />
                </Button>
              </div>
              {/* Componente de formulario para crear citas */}
              <FormCitaMedica/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}




















// "use client"

// import { useState } from 'react'
// import { format } from 'date-fns'
// import { es } from 'date-fns/locale'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useForm, Controller } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as z from 'zod'
// import { CalendarIcon, PlusIcon, XIcon, ClockIcon } from 'lucide-react'
// import { toast } from "sonner"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"
// import { Badge } from "@/components/ui/badge"
// import { TimePicker } from "./timePicker"
// import { ReservaMedica } from '@/types' 
// import FormCitaMedica from './formCitaMedica'
// import {formSchema} from "@/schemas"

// export default function CitasMedicas() {
//   const [citas, setCitas] = useState<ReservaMedica[]>([])
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
//     resolver: zodResolver(formSchema),
//   })

//   const onSubmit = (data: z.infer<typeof formSchema>) => {
//     const { fechaReserva, hora, detalles, servicio } = data
//     const horaReserva = new Date(fechaReserva)
//     let hours = parseInt(hora.hour)
//     if (hora.period === 'PM' && hours !== 12) hours += 12
//     if (hora.period === 'AM' && hours === 12) hours = 0
//     horaReserva.setHours(hours, parseInt(hora.minute))

//     const newCita: ReservaMedica = {
//       id: Math.random().toString(36).substr(2, 9),
//       fechaReserva: horaReserva,
//       detalles,
//       servicio,
//       estado: 'pendiente',
//       usuarioId: 'user123', // Asumimos un ID de usuario fijo para este ejemplo
//       creadoEn: new Date(),
//       actualizadoEn: new Date(),
//     }
//     setCitas([...citas, newCita])
//     setIsModalOpen(false)
//     toast.success("Cita creada exitosamente") // Aquí se muestra el toast global
//     reset()
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Citas Médicas Veterinarias</h1>
      
//       {/* BentoGrid para mostrar resumen de citas */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <motion.div
//           className="bg-blue-100 p-6 rounded-lg shadow-md"
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           <h2 className="text-xl font-semibold mb-2">Citas Pendientes</h2>
//           <p className="text-3xl font-bold">{citas.filter(c => c.estado === 'pendiente').length}</p>
//         </motion.div>
//         <motion.div
//           className="bg-green-100 p-6 rounded-lg shadow-md"
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           <h2 className="text-xl font-semibold mb-2">Citas Completadas</h2>
//           <p className="text-3xl font-bold">{citas.filter(c => c.estado === 'completada').length}</p>
//         </motion.div>
//         <motion.div
//           className="bg-red-100 p-6 rounded-lg shadow-md"
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           <h2 className="text-xl font-semibold mb-2">Citas Canceladas</h2>
//           <p className="text-3xl font-bold">{citas.filter(c => c.estado === 'cancelada').length}</p>
//         </motion.div>
//       </div>

//       {/* Botón para abrir el modal de nueva cita */}
//       <Button
//         onClick={() => setIsModalOpen(true)}
//         className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
//       >
//         <PlusIcon className="mr-2 h-4 w-4" /> Nueva Cita
//       </Button>

//       {/* Tabla de citas */}
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Fecha y Hora</TableHead>
//             <TableHead>Servicio</TableHead>
//             <TableHead>Detalles</TableHead>
//             <TableHead>Estado</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {citas.map((cita) => (
//             <TableRow key={cita.id}>
//               <TableCell>{format(cita.fechaReserva, 'PPP p', { locale: es })}</TableCell>
//               <TableCell>{cita.servicio}</TableCell>
//               <TableCell>{cita.detalles}</TableCell>
//               <TableCell>
//                 <Badge
//                   variant={cita.estado === 'pendiente' ? 'default' : cita.estado === 'completada' ? 'success' : 'destructive'}
//                 >
//                   {cita.estado}
//                 </Badge>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Modal para crear nueva cita */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
//           >
//             <motion.div
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: 50, opacity: 0 }}
//               className="bg-white rounded-lg p-6 w-full max-w-md"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Nueva Cita</h2>
//                 <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
//                   <XIcon className="h-6 w-6" />
//                 </Button>
//               </div>
//               <FormCitaMedica />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }
