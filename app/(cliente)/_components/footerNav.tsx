"use client"
import { useRouter } from 'next/navigation';
import { CalendarIcon, FileTextIcon, PawPrintIcon, UserIcon, PlusCircleIcon, BellIcon, LogOutIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"

export const FooterNav = () => {
	const router = useRouter();

	return (
		<footer className="shadow-md p-4 fixed bottom-0 left-0 right-0">
        <nav className="flex justify-center items-baseline">
          {[{ icon: <UserIcon />, label: 'Perfil', route: '/cliente/perfil' },
            { icon: <PawPrintIcon />, label: 'Mascotas', route: '/cliente/mascotas' },
            { icon: <CalendarIcon />, label: 'Citas', route: '/cliente/citasmedicas' }]
            .map((tab) => (
              <Button
                key={tab.route}
                variant="secondary"
                className="mx-2 flex flex-col items-center w-1/3 bg-transparent"
                onClick={() => router.push(tab.route)}
              >
                <div className="flex items-center">
                  {tab.icon}
                </div>
                <span className="text-xs mt-1">{tab.label}</span>
              </Button>
          ))}
        </nav>
      </footer>
	);
};