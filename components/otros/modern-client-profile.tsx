"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, FileTextIcon, PawPrintIcon, UserIcon, PlusCircleIcon, BellIcon, LogOutIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { FormPerfilAdmin } from "@/components/global/FormPerfilAdmin";
import PetViewer from '../../app/(cliente)/_components/visor-mascotas'
import CitasMedicas from '../../app/(cliente)/_components/CitasMedicas'
import NavBar from "@/components/global/Navbar.component";



// Define los tipos para las pestañas
type TabKey = 'profile' | 'pets' | 'appointments';

export default function ModernClientProfile() {
  // Define el tipo para activeTab
  const [activeTab, setActiveTab] = useState<TabKey>('profile')

  const tabContent: Record<TabKey, React.JSX.Element> = {
    profile: <FormPerfilAdmin />,
    pets: <PetViewer />,
    appointments: <CitasMedicas />
  }

  return (
    <div className="bg-gradient-to-br from-teal-200 to-blue-500 min-h-screen rounded-t-2xl w-screen">
      <NavBar profileRoute="/client" />
      <main className="container mx-auto p-4 pt-20 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex items-center flex-col'
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