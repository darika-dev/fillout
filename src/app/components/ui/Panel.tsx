import classNames from 'classnames'
import type { FC, PropsWithChildren } from 'react'

type PanelProps = PropsWithChildren & {
  className?: string
}

export const Panel: FC<PanelProps> = ({ children, className }) => {
  return (
    <div className={classNames('p-4 rounded-xl bg-hover border-1 border-bgAlt', className)}>{children}</div>
  )
}
