import { IconCalendar } from './calendar'
import { IconCarrot } from './carrot'
import { IconGlobeShowingEuropeAfrica } from './globe-showing-europe-africa'
import { IconRedApple } from './red-apple'

const ICON_MAP = {
  calendar: IconCalendar,
  carrot: IconCarrot,
  globe: IconGlobeShowingEuropeAfrica,
  'red-apple': IconRedApple
}

export type AvailableIconName = keyof typeof ICON_MAP

type ProduceIconProps = {
  name: AvailableIconName
  className?: string
}

export const ProduceIcon = ({ name, className }: ProduceIconProps) => {
  const IconComponent = ICON_MAP[name]

  return <IconComponent className={className} />
}
