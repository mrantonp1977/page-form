import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={"/"} className="font-bold text-3xl bg-gradient-to-r from-indigo-600 via-teal-400 to-purple-500 text-transparent bg-clip-text cursor-pointer">
      PageForm
    </Link>
  )
}

export default Logo
