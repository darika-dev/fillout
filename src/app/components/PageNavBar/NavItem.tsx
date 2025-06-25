'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { TabsTrigger } from '@radix-ui/react-tabs'
import classNames from 'classnames'
import type { FC } from 'react'
import { useState } from 'react'

import { Clipboard, Copy, Delete, Flag, Menu, PencilLine } from '@/app/components/icons'
import { Button } from '@/app/components/ui/Button'

import type { PageItem } from './types'

type NavItemProps = {
  page: PageItem
  isActive: boolean
  isFirst: boolean
  handleDeletePage?: () => void
  handleSetPageFirst?: () => void
}

export const NavItem: FC<NavItemProps> = ({
  page,
  isActive,
  isFirst,
  handleDeletePage,
  handleSetPageFirst,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: page.id })

  const style = {
    transform: CSS.Transform.toString(transform)?.replace(/scaleX\([^)]+\)\s*/, ''),
    transition,
  }

  const itemClassName =
    'relative flex items-center gap-1.5 cursor-pointer select-none px-3 py-1.5 text-sm outline-none transition-colors hover:bg-disabled/15'

  const handleChange = (event: boolean) => {
    if (event) {
      return
    } else {
      setDropdownOpen(event)
    }
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={handleChange}>
      {!isActive ? (
        <TabsTrigger value={page.id} asChild>
          <Button
            variant={'gray'}
            className="group"
            ref={setNodeRef}
            style={style}
            {...(page.isDraggable ? { ...attributes, ...listeners } : {})}
          >
            {page.icon && (
              <span className={'text-muted group-focus:text-info'}>
                <page.icon className="w-5 h-5" />
              </span>
            )}
            <span>{page.label}</span>
          </Button>
        </TabsTrigger>
      ) : (
        <>
          <DropdownMenuTrigger asChild>
            <div
              className="bg-white border-1 border-bgAlt shadow-button relative inline-flex cursor-pointer items-center justify-center gap-1.5 tracking-tight whitespace-nowrap h-8 py-2 px-2.5 rounded-lg text-sm"
              ref={setNodeRef}
              style={style}
              {...(page.isDraggable ? { ...attributes, ...listeners } : {})}
            >
              {page.icon && (
                <span className="text-info">
                  <page.icon className="w-5 h-5" />
                </span>
              )}
              <span>{page.label}</span>
              <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className="-mr-2.5" onClick={() => setDropdownOpen(true)}>
                  <Menu className="w-4 h-4 text-disabled" />
                </Button>
              </DropdownMenuTrigger>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent
              className={classNames(
                'z-50 min-w-[13.5rem] overflow-hidden rounded-2xl border border-slate-200 bg-white',
                'data-[state="open"]:animate-(--animate-in)',
                'data-[state="closed"]:animate-out',
              )}
              align="start"
              sideOffset={9}
              collisionPadding={15}
            >
              <div className="py-2 px-3 bg-bgSubtitle border-b-1 border-bgAlt">Settings</div>
              <DropdownMenuGroup className="py-1.5">
                <DropdownMenuItem
                  className={classNames(
                    itemClassName,
                    isFirst || !page.isDraggable ? 'pointer-events-none text-muted' : '',
                  )}
                  onClick={handleSetPageFirst}
                >
                  <Flag
                    className={classNames(
                      'w-4 h-4',
                      isFirst || !page.isDraggable ? 'text-muted' : 'text-primary',
                    )}
                  />
                  <span>Set as first page</span>
                </DropdownMenuItem>
                <DropdownMenuItem className={itemClassName}>
                  <PencilLine className="w-4 h-4 text-disabled" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem className={itemClassName}>
                  <Clipboard className="w-4 h-4 text-disabled" />
                  <span>Copy</span>
                </DropdownMenuItem>
                <DropdownMenuItem className={itemClassName}>
                  <Copy className="w-4 h-4 text-disabled" />
                  <span>Duplicate</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-3 h-[1px] my-1.5 bg-bgAlt" />
                <DropdownMenuItem className={itemClassName} onClick={handleDeletePage}>
                  <Delete className="w-4 h-4 text-danger" />
                  <span className="text-danger">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </>
      )}
    </DropdownMenu>
  )
}
