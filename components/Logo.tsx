import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function Logo() {
  return (
    <Link
      href={'/'}
      className="font-bold text-3xl bg-gradient-to-r from-indigo-600 via-teal-400 to-purple-500 text-transparent bg-clip-text cursor-pointer"
    >
      <div className="flex flex-row items-center justify-center gap-2">
        <BookOpen className="w-8 h-8 stroke-purple-600" />
        PapdevForms 
      </div>
    </Link>
  );
}

export default Logo;
