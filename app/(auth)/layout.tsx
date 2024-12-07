import Logo from '@/components/Logo';
import { ModeToggle } from '@/components/ModeToggle';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b-4 border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ModeToggle />
        </div>
      </nav>
      <main className="flex w-full flex-grow items-center justify-center">{children}</main>
    </div>
  );
}

export default Layout;