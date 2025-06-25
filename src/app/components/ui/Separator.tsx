import classNames from 'classnames'
import type { FC } from 'react'

import { Plus } from '@/app/components/icons'
import { Button } from '@/app/components/ui/Button'

type LineProps = {
  className?: string
}

type SeparatorProps = {
  onClick?: () => void
}

const Line: FC<LineProps> = ({ className }) => {
  return (
    <div
      className={classNames(
        className,
        'absolute w-5 h-0.5 [background-image:repeating-linear-gradient(to_right,_#c0c0c0_0px,_#c0c0c0_4px,_transparent_4px,_transparent_8px)]',
      )}
    />
  )
}

export const Separator: FC<SeparatorProps> = ({ onClick }) => {
  return (
    <div
      className={classNames(
        'group relative flex justify-center items-center w-5',
        !!onClick && 'hover:w-14 transition-[width]',
      )}
    >
      <Line className="left-0" />
      {onClick && (
        <>
          <Button
            onClick={onClick}
            size="rounded"
            className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Plus className="w-2 h-2" />
          </Button>
          <Line className="right-0" />
        </>
      )}
    </div>
  )
}
