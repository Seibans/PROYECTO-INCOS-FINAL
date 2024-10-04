// "use client";
// import React from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { LucideIcon } from 'lucide-react';
// import { cn } from '@/lib/utils';

// type SideBarItemProps = {
//   item: {
//     label: string;
//     icon: LucideIcon;
//     href: string;
//   };
// };

// export function SideBarItem({ item }: SideBarItemProps) {
//   const pathname = usePathname();
//   const rutaActiva = pathname === item.href;

//   return (
//     <Link
//       href={item.href}
//       // passHref
//       key={item.label}
//       className={cn(
//         `flex items-center gap-x-2 text-sm mt-2 light:text-slate-700 dark:text-white hover:bg-slate-300/20 rounded-lg py-2 px-4`,
//         rutaActiva && 'bg-orange-300 dark:bg-orange-600 hover:bg-slate-300/20'
//       )}
//     >
//       <item.icon strokeWidth={1} className="w-5 h-5" />
//       <p>{item.label}</p>
//     </Link>
//   );
// }

"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type SideBarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
  className?: string;
  exact?: boolean;
};

export function SideBarItem({ icon: Icon, label, href, className, exact = false }: SideBarItemProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href) && href !== '/admin';

  return (
    <Link
      href={href}
      className={cn(
        `flex items-center gap-x-2 text-sm mt-2 light:text-slate-700 dark:text-white hover:bg-slate-300/20 rounded-lg py-2 px-4 w-full`,
        isActive && 'bg-orange-300 dark:bg-orange-600 hover:bg-orange-400 dark:hover:bg-orange-700',
        className
      )}
    >
      <Icon strokeWidth={1} className="w-5 h-5" />
      <p className="flex-grow">{label}</p>
    </Link>
  );
}