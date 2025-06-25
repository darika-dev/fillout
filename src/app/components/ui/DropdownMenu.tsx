'use client'

import classNames from 'classnames'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

type DropdownContextType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DropdownContext = createContext<DropdownContextType | null>(null)

const useDropdown = () => {
  const ctx = useContext(DropdownContext)
  if (!ctx) throw new Error('DropdownMenu.* must be used within DropdownMenu')
  return ctx
}

export const DropdownMenu: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className={classNames('relative', className)} ref={ref}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export const DropdownMenuTrigger: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const { setOpen } = useDropdown()
  return (
    <div onClick={() => setOpen((o) => !o)} className={classNames(className, 'cursor-pointer')}>
      {children}
    </div>
  )
}

export const DropdownMenuContent: FC<{
  children: ReactNode
  className?: string
}> = ({ children, className }) => {
  const { open } = useDropdown()
  if (!open) return null

  return (
    <div
      className={classNames(
        'absolute right-0 mt-2 min-w-[10rem] rounded-md border bg-white shadow-md p-1 animate-in fade-in zoom-in',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const DropdownMenuItem: FC<{
  children: ReactNode
  onClick?: () => void
}> = ({ children, onClick }) => {
  const { setOpen } = useDropdown()

  return (
    <button
      onClick={() => {
        onClick?.()
        setOpen(false)
      }}
      className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent transition-colors"
    >
      {children}
    </button>
  )
}
