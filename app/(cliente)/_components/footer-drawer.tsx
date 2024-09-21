"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarIcon, FileTextIcon, PawPrintIcon, UserIcon, PlusCircleIcon, BellIcon, LogOutIcon, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function FooterDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleButtonClick = (route: string) => {
    router.push(route)
    setIsOpen(false)
  }

  const navItems = [
    { icon: <UserIcon className="h-4 w-4" />, label: 'Perfil', route: '/cliente/perfil' },
    { icon: <PawPrintIcon className="h-4 w-4" />, label: 'Mascotas', route: '/cliente/mascotas' },
    { icon: <CalendarIcon className="h-4 w-4" />, label: 'Citas', route: '/cliente/citasmedicas' },
    // { icon: <FileTextIcon className="h-4 w-4" />, label: 'Historial', route: '/cliente/historial' },
    { icon: <PlusCircleIcon className="h-4 w-4" />, label: 'Nueva Cita', route: '/cliente/nueva-cita' },
    // { icon: <BellIcon className="h-4 w-4" />, label: 'Notificaciones', route: '/cliente/notificaciones' },
    { icon: <LogOutIcon className="h-4 w-4" />, label: 'Volver a la Página Principal', route: '/' },
  ]

  return (
    <>
      {/* <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(true)}
      > */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Menú de Navegación</DrawerTitle>
              <DrawerDescription>Seleccione una opción para navegar</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.route}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleButtonClick(item.route)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cerrar</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}




// otra opcion


// "use client"

// import { useState, useRef } from 'react'
// import { useRouter } from 'next/navigation'
// import { CalendarIcon, FileTextIcon, PawPrintIcon, UserIcon, PlusCircleIcon, BellIcon, LogOutIcon, Menu, X } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { motion } from 'framer-motion'
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"

// export default function FooterDrawer() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [isHovered, setIsHovered] = useState(false)
//   const [isMenuHovered, setIsMenuHovered] = useState(false)
//   const router = useRouter()
//   const menuRef = useRef<HTMLDivElement>(null)

//   const handleButtonClick = (route: string) => {
//     router.push(route)
//     setIsOpen(false)
//   }

//   const navItems = [
//     { icon: <UserIcon className="h-4 w-4" />, label: 'Perfil', route: '/cliente/perfil' },
//     { icon: <PawPrintIcon className="h-4 w-4" />, label: 'Mascotas', route: '/cliente/mascotas' },
//     { icon: <CalendarIcon className="h-4 w-4" />, label: 'Citas', route: '/cliente/citasmedicas' },
//     { icon: <FileTextIcon className="h-4 w-4" />, label: 'Historial', route: '/cliente/historial' },
//     { icon: <PlusCircleIcon className="h-4 w-4" />, label: 'Nueva Cita', route: '/cliente/nueva-cita' },
//     { icon: <BellIcon className="h-4 w-4" />, label: 'Notificaciones', route: '/cliente/notificaciones' },
//     { icon: <LogOutIcon className="h-4 w-4" />, label: 'Cerrar Sesión', route: '/logout' },
//   ]

//   return (
//     <>
//       {/* Botón de menú fijo para móviles */}
//       <Button
//         variant="outline"
//         size="icon"
//         className="fixed bottom-4 left-1/2 transform -translate-x-1/2 rounded-full shadow-lg z-50 lg:hidden"
//         onClick={() => setIsOpen(true)}
//       >
//         {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
//       </Button>

//       {/* Drawer para móviles */}
//       <Drawer open={isOpen} onOpenChange={setIsOpen}>
//         <DrawerContent>
//           <div className="mx-auto w-full max-w-sm">
//             <DrawerHeader>
//               <DrawerTitle>Menú de Navegación</DrawerTitle>
//               <DrawerDescription>Seleccione una opción para navegar</DrawerDescription>
//             </DrawerHeader>
//             <div className="p-4 pb-0">
//               <div className="flex flex-col space-y-2">
//                 {navItems.map((item) => (
//                   <Button
//                     key={item.route}
//                     variant="outline"
//                     className="w-full justify-start"
//                     onClick={() => handleButtonClick(item.route)}
//                   >
//                     {item.icon}
//                     <span className="ml-2">{item.label}</span>
//                   </Button>
//                 ))}
//               </div>
//             </div>
//             <DrawerFooter>
//               <DrawerClose asChild>
//                 <Button variant="outline" onClick={() => setIsOpen(false)}>Cerrar</Button>
//               </DrawerClose>
//             </DrawerFooter>
//           </div>
//         </DrawerContent>
//       </Drawer>

//       {/* Menú desplegable para pantallas grandes */}
//       <div
//         className="relative hidden lg:flex lg:items-center lg:justify-center"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => {
//           if (!isMenuHovered) {
//             setIsHovered(false)
//           }
//         }}
//       >
//         <Button
//           variant="outline"
//           size="icon"
//           className="rounded-full shadow-lg z-50"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => {
//             if (!isMenuHovered) {
//               setIsHovered(false)
//             }
//           }}
//         >
//           {isHovered ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
//         </Button>
//         {isHovered && (
//           <motion.div
//             ref={menuRef}
//             className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md overflow-hidden mt-2"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.3 }}
//           >
//             {navItems.map((item, index) => (
//               <motion.div
//                 key={item.route}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ delay: index * 1, duration: 0.3 }} // Escalonar la animación
//               >
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start hover:bg-gray-200"
//                   onClick={() => handleButtonClick(item.route)}
//                   onMouseEnter={() => setIsMenuHovered(true)}
//                   onMouseLeave={() => {
//                     setIsMenuHovered(false)
//                     if (!isHovered) {
//                       setIsHovered(false)
//                     }
//                   }}
//                 >
//                   {item.icon}
//                   <span className="ml-2">{item.label}</span>
//                 </Button>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </>
//   )
// }
