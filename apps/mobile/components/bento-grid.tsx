import React from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated'
import { CategoryToggleWidget } from '@/components/category-toggle-widget'
import { LastViewedWidget } from '@/components/last-viewed-widget'
import { MonthWidget } from '@/components/month-widget'
import type { Produce } from '@estcequecestlasaison/shared'

type BentoGridProps = {
  lastViewedSlug: string | null
  fallbackProduce: Produce | undefined
  monthName: string
  isFruitEnabled: boolean
  isVegetableEnabled: boolean
  onFruitToggle: () => void
  onVegetableToggle: () => void
  onMonthPress: () => void
  scrollY: SharedValue<number>
}

const WIDGET_ROW_HEIGHT = 48
const WIDGET_GAP = 6
const GRID_TOTAL_HEIGHT = WIDGET_ROW_HEIGHT * 3 + WIDGET_GAP * 2
const CONTAINER_PADDING_TOP = 8
const CONTAINER_PADDING_BOTTOM = 12
const SCROLL_START_OFFSET = 250
const SCROLL_COLLAPSE_DISTANCE = 80

const LEFT_COLUMN_FADE_DISTANCE = SCROLL_COLLAPSE_DISTANCE * 0.8
const RIGHT_COLUMN_FADE_DISTANCE = SCROLL_COLLAPSE_DISTANCE * 0.5
const LEFT_COLUMN_TRANSLATE_OFFSET = -10
const RIGHT_COLUMN_TRANSLATE_OFFSET = -20

const BENTO_GRID_HEIGHT =
  GRID_TOTAL_HEIGHT + CONTAINER_PADDING_TOP + CONTAINER_PADDING_BOTTOM

export const BentoGrid = React.memo(
  ({
    lastViewedSlug,
    fallbackProduce,
    monthName,
    isFruitEnabled,
    isVegetableEnabled,
    onFruitToggle,
    onVegetableToggle,
    onMonthPress,
    scrollY
  }: BentoGridProps) => {
    const containerStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          scrollY.value,
          [SCROLL_START_OFFSET, SCROLL_START_OFFSET + SCROLL_COLLAPSE_DISTANCE],
          [BENTO_GRID_HEIGHT, 0],
          Extrapolation.CLAMP
        )
      }
    })

    const leftColumnStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          scrollY.value,
          [
            SCROLL_START_OFFSET,
            SCROLL_START_OFFSET + LEFT_COLUMN_FADE_DISTANCE
          ],
          [1, 0],
          Extrapolation.CLAMP
        ),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              [
                SCROLL_START_OFFSET,
                SCROLL_START_OFFSET + LEFT_COLUMN_FADE_DISTANCE
              ],
              [0, LEFT_COLUMN_TRANSLATE_OFFSET],
              Extrapolation.CLAMP
            )
          }
        ]
      }
    })

    const rightColumnStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          scrollY.value,
          [
            SCROLL_START_OFFSET,
            SCROLL_START_OFFSET + RIGHT_COLUMN_FADE_DISTANCE
          ],
          [1, 0],
          Extrapolation.CLAMP
        ),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              [
                SCROLL_START_OFFSET,
                SCROLL_START_OFFSET + RIGHT_COLUMN_FADE_DISTANCE
              ],
              [0, RIGHT_COLUMN_TRANSLATE_OFFSET],
              Extrapolation.CLAMP
            )
          }
        ]
      }
    })

    return (
      <Animated.View style={[styles.collapsible, containerStyle]}>
        <View className="px-1.5 pt-2 pb-3">
          <View className="flex-row gap-3">
            <Animated.View style={[styles.leftColumn, leftColumnStyle]}>
              <LastViewedWidget
                slug={lastViewedSlug}
                fallbackProduce={fallbackProduce}
              />
            </Animated.View>
            <Animated.View style={[styles.rightColumn, rightColumnStyle]}>
              <CategoryToggleWidget
                label="Fruits"
                icon="nutrition-outline"
                isEnabled={isFruitEnabled}
                onToggle={onFruitToggle}
              />
              <CategoryToggleWidget
                label="Légumes"
                icon="leaf-outline"
                isEnabled={isVegetableEnabled}
                onToggle={onVegetableToggle}
              />
              <MonthWidget monthName={monthName} onPress={onMonthPress} />
            </Animated.View>
          </View>
        </View>
      </Animated.View>
    )
  }
)

const styles = StyleSheet.create({
  // Combined with Reanimated animated style via style prop
  collapsible: {
    overflow: 'hidden'
  },
  // Combined with Reanimated animated style; height uses computed constant
  leftColumn: {
    flex: 1,
    height: GRID_TOTAL_HEIGHT
  },
  // Combined with Reanimated animated style; height/gap use computed constants
  rightColumn: {
    flex: 1,
    gap: WIDGET_GAP,
    height: GRID_TOTAL_HEIGHT
  }
})
