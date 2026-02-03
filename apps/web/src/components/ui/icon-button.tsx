import { tv, type VariantProps } from 'tailwind-variants'

export const iconButtonVariants = tv({
  base: 'flex shrink-0 items-center justify-center rounded-full',
  variants: {
    size: {
      sm: 'size-8',
      md: 'size-10',
      lg: 'size-12'
    },
    variant: {
      ghost:
        'transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      'ghost-muted':
        'transition-colors text-gray-400 hover:bg-gray-100 hover:text-gray-600',
      outline:
        'transition-colors border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40',
      elevated: 'transition-colors bg-white shadow-sm hover:bg-gray-100'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

type IconButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof iconButtonVariants>

export const IconButton = ({
  size,
  variant,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={iconButtonVariants({
        size,
        variant,
        class: ['focus-ring', className]
      })}
      {...props}
    />
  )
}
