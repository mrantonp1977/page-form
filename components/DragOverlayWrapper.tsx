import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React from 'react'
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement'
import { ElementsType, FormElements } from './FormElements'

function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = React.useState<Active | null>(null)
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel: () => {
      setDraggedItem(null)
    },
    onDragEnd: () => {
      setDraggedItem(null)
    }
  })

  if (!draggedItem) return null;
    

  let node = <div>Drag me!</div>

  const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]}/>
  }

  return (
    <DragOverlay>
      {node}
    </DragOverlay>
  )
}

export default DragOverlayWrapper
