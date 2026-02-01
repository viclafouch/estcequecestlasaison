/* eslint-disable */
import * as React from 'react'
import {
  type SpringOptions,
  useInView,
  type UseInViewOptions,
  useMotionValue,
  useSpring
} from 'motion/react'

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

const CountingNumber = ({
  ref,
  number,
  fromNumber,
  padStart = false,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  decimalSeparator = '.',
  transition = { stiffness: 90, damping: 50 },
  decimalPlaces = 0,
  className,
  ...props
}: CountingNumberProps) => {
  const localRef = React.useRef<HTMLSpanElement>(null)
  React.useImperativeHandle(ref as any, () => {
    return localRef.current as HTMLSpanElement
  })

  const numberStr = number.toString()
  const decimals =
    typeof decimalPlaces === 'number'
      ? decimalPlaces
      : numberStr.includes('.')
        ? (numberStr.split('.')[1]?.length ?? 0)
        : 0

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
        let formatted =
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.round(latest).toString()

        if (decimals > 0) {
          formatted = formatted.replace('.', decimalSeparator)
        }

        if (padStart) {
          const finalIntLength = Math.floor(Math.abs(number)).toString().length
          const [intPart, fracPart] = formatted.split(decimalSeparator)
          const paddedInt = intPart?.padStart(finalIntLength, '0') ?? ''
          formatted = fracPart
            ? `${paddedInt}${decimalSeparator}${fracPart}`
            : paddedInt
        }

        localRef.current.textContent = formatted
      }
    })

    return () => {
      return unsubscribe()
    }
  }, [springVal, decimals, padStart, number, decimalSeparator])

  const startNumber = fromNumber ?? number
  const finalIntLength = Math.floor(Math.abs(number)).toString().length
  const initialText = padStart
    ? Math.floor(Math.abs(startNumber)).toString().padStart(finalIntLength, '0') +
      (decimals > 0 ? decimalSeparator + startNumber.toFixed(decimals).split('.')[1] : '')
    : decimals > 0
      ? startNumber.toFixed(decimals).replace('.', decimalSeparator)
      : Math.round(startNumber).toString()

  return (
    <span
      className={className}
      data-slot="counting-number"
      ref={localRef}
      {...(props as any)}
    >
      {initialText}
    </span>
  )
}

export { CountingNumber, type CountingNumberProps }
export default CountingNumber
