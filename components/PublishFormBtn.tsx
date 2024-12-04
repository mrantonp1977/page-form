import React from 'react'
import { Button } from './ui/button'
import { BookCheck } from 'lucide-react'

function PublishFormBtn() {
  return (
    <Button className="gap-2 text-white bg-gradient-to-r from-violet-600 to bg-cyan-600">
      <BookCheck className="size-4" />
      Publish
    </Button>
  )
}

export default PublishFormBtn
