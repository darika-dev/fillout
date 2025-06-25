'use client'

import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { TabsList } from '@radix-ui/react-tabs'
import type { FC } from 'react'
import { useState } from 'react'

import { Plus } from '@/app/components/icons'
import { Button } from '@/app/components/ui/Button'
import { Separator } from '@/app/components/ui/Separator'

import { newPage } from './constants'
import { NavItem } from './NavItem'
import type { PageItem } from './types'

type PageNavBarProps = {
  pages: PageItem[]
  setPages: (pages: PageItem[] | ((prev: PageItem[]) => PageItem[])) => void
  activePage: string
  onTabChange: (id: string) => void
}

export const PageNavBar: FC<PageNavBarProps> = ({ pages, setPages, activePage, onTabChange }) => {
  const [draggingPage, setDraggingPage] = useState<PageItem | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleAddPage = (afterId?: string) => {
    const newItem = { ...newPage, id: Date.now().toString() }
    const newPages = [...pages]
    if (afterId) {
      const index = newPages.findIndex((page) => page.id === afterId)
      newPages.splice(index + 1, 0, newItem)
    } else {
      const index = newPages.findIndex((page) => !page.isDraggable)
      if (index < 0) {
        newPages.push(newItem)
      } else {
        newPages.splice(index, 0, newItem)
      }
    }

    setPages(newPages)
  }

  const handleDeletePage = (id: string) => {
    const newPages = pages.filter((page) => page.id !== id)

    if (newPages.length === 0) return

    const deletedIndex = pages.findIndex((page) => page.id === id)
    const newActiveId = newPages[Math.min(deletedIndex, newPages.length - 1)].id

    setPages(newPages)
    onTabChange(newActiveId)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const page = pages.find((page) => page.id === event.active.id)
    setDraggingPage(page ? page : null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id === over?.id) return

    const oldIndex = pages.findIndex((page) => page.id === active.id)
    let newIndex = pages.findIndex((page) => page.id === over?.id)

    const overPage = pages.find((page) => page.id === over?.id)

    if (overPage && !overPage.isDraggable) {
      newIndex = newIndex - 1
    }

    if (oldIndex === -1 || newIndex === -1) return

    setPages((prevPages: PageItem[]) => {
      return arrayMove(prevPages, oldIndex, newIndex)
    })

    setDraggingPage(null)
  }

  const handleSetPageFirst = (id: string) => {
    const oldIndex = pages.findIndex((page) => page.id === id)

    setPages((prevPages) => {
      return arrayMove(prevPages, oldIndex, 0)
    })
  }

  return (
    <TabsList asChild>
      <nav className="flex items-center justify-start overflow-auto -m-4 p-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={pages}>
            {pages.map((page) => {
              return (
                <div key={page.id} className="relative flex items-center justify-center">
                  <NavItem
                    page={page}
                    isActive={activePage === page.id}
                    isFirst={page.id === pages[0].id}
                    handleDeletePage={() => handleDeletePage(page.id)}
                    handleSetPageFirst={() => handleSetPageFirst(page.id)}
                  />
                  <Separator onClick={page.isDraggable ? () => handleAddPage(page.id) : undefined} />
                </div>
              )
            })}
          </SortableContext>

          <DragOverlay>
            {draggingPage && (
              <NavItem
                page={draggingPage}
                isActive={activePage === draggingPage.id}
                isFirst={draggingPage.id === pages[0].id}
              />
            )}
          </DragOverlay>
        </DndContext>

        <Button onClick={() => handleAddPage()}>
          <Plus className="w-4 h-4" />
          <div>Add page</div>
        </Button>
      </nav>
    </TabsList>
  )
}
