"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, FileTextIcon, PawPrintIcon, UserIcon, PlusCircleIcon, BellIcon, LogOutIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { FormPerfilAdmin } from "@/components/global/FormPerfilAdmin";

const MotionCard = motion(Card);

// Define los tipos para las pestañas
type TabKey = 'profile' | 'pets' | 'appointments';

export default function ModernClientProfile() {
  // Define el tipo para activeTab
  const [activeTab, setActiveTab] = useState<TabKey>('profile')

  const tabContent: Record<TabKey, React.JSX.Element> = {
    // profile: <ProfileContent />,
    profile: <FormPerfilAdmin />,
    pets: <PetsContent />,
    appointments: <AppointmentsContent />
  }

  return (
    <div className="bg-gradient-to-br from-teal-200 to-blue-500 min-h-screen rounded-t-2xl w-screen">
      <main className="container mx-auto p-4 pt-20 pb-24 bg-red-500">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex justify-center'
        >
          {tabContent[activeTab]}
        </motion.div>
      </main>
      <footer className="shadow-md p-4 fixed bottom-0 left-0 right-0">
        <nav className="flex justify-center items-baseline">
          {[
            { icon: <UserIcon className="w-6 h-6" />, label: 'Perfil', value: 'profile' },
            { icon: <PawPrintIcon className="w-6 h-6" />, label: 'Mascotas', value: 'pets' },
            { icon: <CalendarIcon className="w-6 h-6" />, label: 'Citas', value: 'appointments' },
          ].map((tab) => (
            <Button
              key={tab.value}
              variant="secondary"
              className={`flex mx-2 flex-col items-center w-1/3 ${activeTab === tab.value ? 'bg-teal-600 p-9' : 'bg-transparent p-7'}`}
              onClick={() => setActiveTab(tab.value as TabKey)}
            >
              <div className="flex items-center">
                {tab.icon}
              </div>
              <span className="text-xs mt-1">{tab.label}</span>
            </Button>
          ))}
        </nav>
      </footer>


    </div>
  )
}

function ProfileContent() {
  return (
    <MotionCard className="overflow-hidden" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Cliente" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">Carlos Núñez</h2>
          <p className="text-gray-500">Miembro desde 2021</p>
        </div>
        <div className="space-y-4">
          <InfoItem icon={<UserIcon />} label="Nombre" value="Carlos Núñez" />
          <InfoItem icon={<CalendarIcon />} label="Fecha de Nacimiento" value="15/05/1985" />
          <InfoItem icon={<FileTextIcon />} label="Email" value="carlos@example.com" />
          <InfoItem icon={<PawPrintIcon />} label="Mascotas" value="2" />
        </div>
        <div className="mt-6 flex justify-between">
          <Button variant="outline" className="w-[48%]">Editar Perfil</Button>
          <Button variant="outline" className="w-[48%]" onClick={() => console.log('Cerrar sesión')}>
            <LogOutIcon className="mr-2 h-4 w-4" /> Cerrar Sesión
          </Button>
        </div>
      </CardContent>
    </MotionCard>
  )
}

function PetsContent() {
  const pets = [
    { name: "Luna", species: "Perro", breed: "Labrador", image: "/placeholder-dog.jpg" },
    { name: "Milo", species: "Gato", breed: "Siamés", image: "/placeholder-cat.jpg" },
  ]

  return (
    <div className="space-y-4 w-full">
      {pets.map((pet, index) => (
        <MotionCard key={index} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <CardContent className="p-4 flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={pet.image} alt={pet.name} />
              <AvatarFallback>{pet.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{pet.name}</h3>
              <p className="text-gray-500">{pet.species} - {pet.breed}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Ver Detalles</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{pet.name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <p><strong>Especie:</strong> {pet.species}</p>
                  <p><strong>Raza:</strong> {pet.breed}</p>
                  <p><strong>Edad:</strong> 3 años</p>
                  <p><strong>Peso:</strong> 25 kg</p>
                  <Button className="mt-4 w-full">Ver Historial Médico</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </MotionCard>
      ))}
      <Button className="w-full" variant="outline">
        <PlusCircleIcon className="mr-2 h-4 w-4" /> Agregar Nueva Mascota
      </Button>
    </div>
  )
}

function AppointmentsContent() {
  const appointments = [
    { date: "15 Jun 2023", time: "10:00", service: "Consulta General", pet: "Luna", status: "Próxima" },
    { date: "22 Jun 2023", time: "15:30", service: "Vacunación", pet: "Milo", status: "Pendiente" },
  ]

  return (
    <div className="space-y-4 w-full">
      {appointments.map((appointment, index) => (
        <MotionCard key={index} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-semibold">{appointment.service}</h3>
                <p className="text-sm text-gray-500">{appointment.pet}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${appointment.status === 'Próxima' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                {appointment.status}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {appointment.date} - {appointment.time}
            </div>
          </CardContent>
        </MotionCard>
      ))}
      <Button className="w-full">
        <PlusCircleIcon className="mr-2 h-4 w-4" /> Agendar Nueva Cita
      </Button>
    </div>
  )
}

function InfoItem({ icon, label, value }: any) {
  return (
    <div className="flex items-center space-x-3">
      <div className="bg-teal-100 p-2 rounded-full">
        {React.cloneElement(icon, { className: "h-5 w-5 text-teal-600" })}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}