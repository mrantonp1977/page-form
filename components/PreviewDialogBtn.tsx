import React from 'react'
import { Button } from './ui/button'
import { FullscreenIcon } from 'lucide-react'

function PreviewDialogBtn() {
  return (
    <Button variant={'outline'} className="gap-2">
      <FullscreenIcon className="w-6 h-6" />
      Preview
    </Button>
  )
}

export default PreviewDialogBtn
