import { IconBanana } from './banana'
import { IconCalendar } from './calendar'
import { IconCarrot } from './carrot'
import { IconCherries } from './cherries'
import { IconChestnut } from './chestnut'
import { IconCucumber } from './cucumber'
import { IconEarOfCorn } from './ear-of-corn'
import { IconEggplant } from './eggplant'
import { IconGlobeShowingEuropeAfrica } from './globe-showing-europe-africa'
import { IconGrapes } from './grapes'
import { IconHotPepper } from './hot-pepper'
import { IconJackOLantern } from './jack-o-lantern'
import { IconKiwiFruit } from './kiwi-fruit'
import { IconLemon } from './lemon'
import { IconMelon } from './melon'
import { IconMushroom } from './mushroom'
import { IconPeach } from './peach'
import { IconPear } from './pear'
import { IconPotato } from './potato'
import { IconRedApple } from './red-apple'
import { IconRoastedSweetPotato } from './roasted-sweet-potato'
import { IconStrawberry } from './strawberry'
import { IconTangerine } from './tangerine'
import { IconTomato } from './tomato'
import { IconWatermelon } from './watermelon'

const ICON_MAP = {
  banana: IconBanana,
  calendar: IconCalendar,
  carrot: IconCarrot,
  cherries: IconCherries,
  chestnut: IconChestnut,
  cucumber: IconCucumber,
  'ear-of-corn': IconEarOfCorn,
  eggplant: IconEggplant,
  globe: IconGlobeShowingEuropeAfrica,
  grapes: IconGrapes,
  'hot-pepper': IconHotPepper,
  'jack-o-lantern': IconJackOLantern,
  'kiwi-fruit': IconKiwiFruit,
  lemon: IconLemon,
  melon: IconMelon,
  mushroom: IconMushroom,
  peach: IconPeach,
  pear: IconPear,
  potato: IconPotato,
  'red-apple': IconRedApple,
  'roasted-sweet-potato': IconRoastedSweetPotato,
  strawberry: IconStrawberry,
  tangerine: IconTangerine,
  tomato: IconTomato,
  watermelon: IconWatermelon
}

export type AvailableIconName = keyof typeof ICON_MAP

export function matchIsAvailableIcon(name: string): name is AvailableIconName {
  return name in ICON_MAP
}

type ProduceIconProps = {
  name: AvailableIconName
  className?: string
}

export const ProduceIcon = ({ name, className }: ProduceIconProps) => {
  const IconComponent = ICON_MAP[name]

  return <IconComponent className={className} />
}
