"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type SideBarItemProps = {
  item: {
    label: string;
    icon: LucideIcon;
    href: string;
  };
};

export function SideBarItem({ item }: SideBarItemProps) {
  const pathname = usePathname();
  const rutaActiva = pathname === item.href;

  return (
    <Link
      href={item.href}
      passHref
      key={item.label} // Asegúrate de incluir la key aquí
      className={cn(
        `flex items-center gap-x-2 text-sm mt-2 light:text-slate-700 dark:text-white hover:bg-slate-300/20 rounded-lg py-2 px-4`,
        rutaActiva && 'bg-slate-400/20'
      )}
    >
      <item.icon strokeWidth={1} className="w-5 h-5" />
      <p>{item.label}</p>
    </Link>
  );
}
