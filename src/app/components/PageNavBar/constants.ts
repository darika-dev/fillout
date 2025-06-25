import { Check, DocumentIcon, Info } from '@/app/components/icons'

import { NewPage, PageItem } from './types'

export const initialPages: PageItem[] = [
  { id: 'info', label: 'Info', icon: Info, isDraggable: true },
  { id: 'details', label: 'Details', icon: DocumentIcon, isDraggable: true },
  { id: 'other', label: 'Other', icon: DocumentIcon, isDraggable: true },
  { id: 'ending', label: 'Ending', icon: Check, isDraggable: false },
]

export const newPage: NewPage = { label: 'New Page', icon: DocumentIcon, isDraggable: true }
