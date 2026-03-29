import React from 'react'
import {
  type SpringOptions,
  useInView,
  type UseInViewOptions,
  useMotionValue,
  useSpring
} from 'motion/react'
import { cn } from '../../lib/cn'

type CountingNumberProps = React.ComponentProps<'span'> & {
  number: number
  fromNumber?: number
  padStart?: boolean
  inView?: boolean
  inViewMargin?: UseInViewOptions['margin']
  inViewOnce?: boolean
  decimalSeparator?: string
  transition?: SpringOptions
  decimalPlaces?: number
}

type FormatNumberParams = {
  value: number
  decimals: number
  decimalSeparator: string
  padStart: boolean
  finalIntLength: number
}

function formatNumber({
  value,
  decimals,
  decimalSeparator,
  padStart,
  finalIntLength
}: FormatNumberParams): string {
  let formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()

  if (decimals > 0) {
    formatted = formatted.replace('.', decimalSeparator)
  }

  if (padStart) {
    const [intPart, fracPart] = formatted.split(decimalSeparator)
    const paddedInt = intPart?.padStart(finalIntLength, '0') ?? ''
    formatted = fracPart
      ? `${paddedInt}${decimalSeparator}${fracPart}`
      : paddedInt
  }

  return formatted
}

const DEFAULT_TRANSITION: SpringOptions = { stiffness: 500, damping: 50 }

const CountingNumber = ({
  ref,
  number,
  fromNumber,
  padStart = false,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  decimalSeparator = '.',
  transition = DEFAULT_TRANSITION,
  decimalPlaces = 0,
  className,
  ...props
}: CountingNumberProps) => {
  const localRef = React.useRef<HTMLSpanElement>(null)
  React.useImperativeHandle(ref as React.Ref<HTMLSpanElement>, () => {
    return localRef.current as HTMLSpanElement
  })

  const finalIntLength = Math.floor(Math.abs(number)).toString().length

  const motionVal = useMotionValue(fromNumber ?? number)
  const springVal = useSpring(motionVal, transition)
  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin
  })
  const isInView = !inView || inViewResult

  React.useEffect(() => {
    if (isInView) {
      motionVal.set(number)
    }
  }, [isInView, number, motionVal])

  React.useEffect(() => {
    const unsubscribe = springVal.on('change', (latest) => {
      if (localRef.current) {
        localRef.current.textContent = formatNumber({
          value: latest,
          decimals: decimalPlaces,
          decimalSeparator,
          padStart,
          finalIntLength
        })
      }
    })

    return () => {
      return unsubscribe()
    }
  }, [springVal, decimalPlaces, padStart, finalIntLength, decimalSeparator])

  const startNumber = fromNumber ?? number
  const initialText = formatNumber({
    value: startNumber,
    decimals: decimalPlaces,
    decimalSeparator,
    padStart,
    finalIntLength
  })

  return (
    <span
      className={cn('tabular-nums', className)}
      data-slot="counting-number"
      ref={localRef}
      {...(props as Record<string, unknown>)}
    >
      {initialText}
    </span>
  )
}

export { CountingNumber, type CountingNumberProps }
export default CountingNumber
