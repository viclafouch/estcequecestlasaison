import { tv } from 'tailwind-variants'

const cardSectionVariants = tv({
  base: 'flex items-center justify-between rounded-2xl px-4 py-3.5'
})

type CardSectionProps = React.ComponentProps<'div'>

export const CardSection = ({ className, ...props }: CardSectionProps) => {
  return (
    <div className={cardSectionVariants({ class: className })} {...props} />
  )
}
