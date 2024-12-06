import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center px-4 !bg-slate-950">
        {children}
      </div>
    </>
  );
}

export default layout;
