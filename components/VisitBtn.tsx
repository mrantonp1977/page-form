"use client";

import React from 'react'
import { Button } from './ui/button';

function VisitBtn({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`
  return (
    <Button className="w-[240px]" onClick={() => {window.open(shareLink, "_blank")}}>
      Visit
    </Button>
  )
}

export default VisitBtn
