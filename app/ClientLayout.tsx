'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Define the routes where the header should not be displayed
  const noHeaderRoutes = ['/suggestions'];

  // Check if the current route is in the noHeaderRoutes array
  const showHeader = !noHeaderRoutes.includes(pathname);

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
}
