import { tv } from 'tailwind-variants'

const pillVariants = tv({
  base: 'flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm'
})

type PillProps = React.ComponentProps<'div'>

export const Pill = ({ className, ...props }: PillProps) => {
  return <div className={pillVariants({ class: className })} {...props} />
}
