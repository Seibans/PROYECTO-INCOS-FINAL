'use client'

import * as React from 'react'
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface User {
  id: number
  nombreCompleto: string
  email: string
  image: string | null
  ci: string | null
  celular: string | null
  rol: string
}

interface UserSelectProps {
  users: User[]
  onSelect: (userId: number | undefined) => void
  value?: number
}

export function UserSelect({ users, onSelect, value }: UserSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)

  const selectedUser = users.find(user => user.id === value)

  const filteredUsers = React.useMemo(() => {
    return users.filter(user => {
      const searchLower = searchTerm.toLowerCase()
      return user.nombreCompleto.toLowerCase().includes(searchLower) ||
             user.email.toLowerCase().includes(searchLower) ||
             (user.ci && user.ci.toLowerCase().includes(searchLower)) ||
             (user.celular && user.celular.toLowerCase().includes(searchLower)) ||
             user.rol.toLowerCase().includes(searchLower)
    })
  }, [users, searchTerm])

  const handleToggle = () => setIsOpen(!isOpen)

  const handleSelect = (userId: number) => {
    onSelect(userId)
    setIsOpen(false)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(undefined)
  }

  React.useEffect(() => {
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
        {selectedUser ? (
          <div className="flex items-center gap-2 max-w-[220px] sm:max-w-full">
            <Avatar className="h-6 w-6">
              <AvatarImage src={selectedUser.image || undefined} alt={selectedUser.nombreCompleto} />
              <AvatarFallback>{selectedUser.nombreCompleto.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="truncate">{selectedUser.nombreCompleto}</span>
          </div>
        ) : (
          "Seleccionar usuario (opcional)"
        )}
        {selectedUser ? (
          <X className="h-4 w-4 opacity-50 hover:opacity-100" onClick={handleRemove} />
        ) : (
          <Search className="h-4 w-4 opacity-50" />
        )}
      </Button>
      {isOpen && (
        <div className="absolute top-0 z-10 w-full mt-1 bg-popover text-popover-foreground shadow-md rounded-md border">
          <div className="flex p-2">
            <Search className='mt-1 mr-2'/>
            <Input
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8"
            />
          </div>
          <ScrollArea className="h-[250px] overflow-y-auto w-full">
            {filteredUsers.length === 0 ? (
              <div className="py-2 px-2 text-sm text-muted-foreground text-center">
                No se encontraron resultados.
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 p-2 hover:bg-accent cursor-pointer w-full"
                  onClick={() => handleSelect(user.id)}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={user.image || undefined} alt={user.nombreCompleto} />
                    <AvatarFallback>{user.nombreCompleto.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-grow w-[1px]">
                    <p className="text-sm font-medium truncate">{user.nombreCompleto}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="text-xs text-right flex-shrink-0 mr-2">
                    {user.ci && <p className="truncate">{user.ci}</p>}
                    {user.celular && <p className="truncate">{user.celular}</p>}
                    <p className="truncate">{user.rol}</p>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
















// 'use client'

// import * as React from 'react'
// import { Search, X } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// interface User {
//   id: number
//   nombreCompleto: string
//   email: string
//   image: string | null
//   ci: string | null
//   celular: string | null
//   rol: string
// }

// interface UserSelectProps {
//   users: User[]
//   onSelect: (userId: number | undefined) => void
//   value?: number
// }

// export function UserSelect({ users, onSelect, value }: UserSelectProps) {
//   const [isOpen, setIsOpen] = React.useState(false)
//   const [searchTerm, setSearchTerm] = React.useState("")
//   const containerRef = React.useRef<HTMLDivElement>(null)
//   const dropdownRef = React.useRef<HTMLDivElement>(null)

//   const selectedUser = users.find(user => user.id === value)

//   const filteredUsers = React.useMemo(() => {
//     return users.filter(user => {
//       const searchLower = searchTerm.toLowerCase()
//       return user.nombreCompleto.toLowerCase().includes(searchLower) ||
//              user.email.toLowerCase().includes(searchLower) ||
//              (user.ci && user.ci.toLowerCase().includes(searchLower)) ||
//              (user.celular && user.celular.toLowerCase().includes(searchLower)) ||
//              user.rol.toLowerCase().includes(searchLower)
//     })
//   }, [users, searchTerm])

//   const handleToggle = () => setIsOpen(!isOpen)

//   const handleSelect = (userId: number) => {
//     onSelect(userId)
//     setIsOpen(false)
//   }

//   const handleRemove = (e: React.MouseEvent) => {
//     e.stopPropagation()
//     onSelect(undefined)
//   }

//   React.useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//         setIsOpen(false)
//       }
//     }

//     const handleResize = () => {
//       if (dropdownRef.current && containerRef.current) {
//         const containerRect = containerRef.current.getBoundingClientRect()
//         const viewportHeight = window.innerHeight
//         const maxHeight = viewportHeight - containerRect.bottom - 10 // 10px de margen
//         dropdownRef.current.style.maxHeight = `${Math.max(100, Math.min(300, maxHeight))}px`
//       }
//     }

//     document.addEventListener('mousedown', handleOutsideClick)
//     window.addEventListener('resize', handleResize)

//     handleResize()

//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick)
//       window.removeEventListener('resize', handleResize)
//     }
//   }, [isOpen])

//   return (
//     <div className="relative w-full" ref={containerRef}>
//       <Button
//         type="button"
//         variant="outline"
//         role="combobox"
//         aria-expanded={isOpen}
//         className="w-full justify-between"
//         onClick={handleToggle}
//       >
//         <div className="flex items-center gap-2 w-full overflow-hidden">
//           {selectedUser ? (
//             <>
//               <Avatar className="h-6 w-6 flex-shrink-0">
//                 <AvatarImage src={selectedUser.image || undefined} alt={selectedUser.nombreCompleto} />
//                 <AvatarFallback>{selectedUser.nombreCompleto.charAt(0)}</AvatarFallback>
//               </Avatar>
//               <span className="truncate">{selectedUser.nombreCompleto}</span>
//             </>
//           ) : (
//             <span className="truncate">Seleccionar usuario (opcional)</span>
//           )}
//         </div>
//         {selectedUser ? (
//           <X className="h-4 w-4 flex-shrink-0 opacity-50 hover:opacity-100" onClick={handleRemove} />
//         ) : (
//           <Search className="h-4 w-4 flex-shrink-0 opacity-50" />
//         )}
//       </Button>
//       {isOpen && (
//         <div ref={dropdownRef} className="absolute z-10 w-full mt-1 bg-popover text-popover-foreground shadow-md rounded-md border overflow-hidden">
//           <div className="p-2">
//             <Input
//               placeholder="Buscar usuario..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="h-8"
//             />
//           </div>
//           <div className="overflow-y-auto">
//             {filteredUsers.length === 0 ? (
//               <div className="py-2 px-2 text-sm text-muted-foreground text-center">
//                 No se encontraron resultados.
//               </div>
//             ) : (
//               filteredUsers.map((user) => (
//                 <div
//                   key={user.id}
//                   className="flex items-center gap-2 p-2 hover:bg-accent cursor-pointer"
//                   onClick={() => handleSelect(user.id)}
//                 >
//                   <Avatar className="h-8 w-8 flex-shrink-0">
//                     <AvatarImage src={user.image || undefined} alt={user.nombreCompleto} />
//                     <AvatarFallback>{user.nombreCompleto.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                   <div className="flex flex-col flex-grow min-w-0">
//                     <p className="text-sm font-medium truncate">{user.nombreCompleto}</p>
//                     <p className="text-xs text-muted-foreground truncate">{user.email}</p>
//                   </div>
//                   <div className="text-xs text-right flex-shrink-0">
//                     {user.ci && <p className="truncate">{user.ci}</p>}
//                     {user.celular && <p className="truncate">{user.celular}</p>}
//                     <p className="truncate">{user.rol}</p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }