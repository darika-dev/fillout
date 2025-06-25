import type { ComponentType, SVGProps } from 'react'

export type NewPage = {
  label: string
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  isDraggable: boolean
}

export type PageItem = NewPage & {
  id: string
}
