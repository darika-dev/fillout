import { cva, type VariantProps } from 'class-variance-authority'
import classNames from 'classnames'
import type { ButtonHTMLAttributes, FC } from 'react'

const buttonVariants = cva(
  'relative inline-flex cursor-pointer items-center justify-center gap-1.5 tracking-tight whitespace-nowrap focus-visible:outline-none disabled:pointer-events-none transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-white border-1 border-bgAlt shadow-button hover:bg-disabled/35 hover:border-disabled/35 hover:shadow-none hover:text-primaryHover focus:bg-white focus:text-text focus:border-primary focus:shadow-buttonActive active:bg-white active:border-primary active:shadow-buttonActive',
        gray: 'bg-disabled/15 border-1 border-disabled/15 text-primaryHover hover:bg-disabled/35 hover:border-disabled/35 focus:bg-white focus:text-text focus:border-primary focus:shadow-buttonActive active:bg-white active:border-primary active:shadow-buttonActive',
        ghost:
          'text-disabled hover:bg-disabled/35 hover:border-disabled/35 focus:bg-white focus:text-text focus:border-primary focus:shadow-buttonActive active:bg-white active:border-primary active:shadow-buttonActive',
      },
      size: {
        small: 'h-5 w-5 rounded text-sm',
        regular: 'h-8 py-2 px-2.5 rounded-lg text-sm',
        rounded: 'h-4 w-4 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'regular',
    },
  },
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  ref?: (node: HTMLElement | null) => void
}

export const Button: FC<ButtonProps> = ({ className, variant, size, ...props }) => {
  return <button className={classNames(buttonVariants({ variant, size, className }))} {...props} />
}
