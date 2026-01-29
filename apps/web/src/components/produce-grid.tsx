import type { Month, Produce } from '@estcequecestlasaison/shared'
import { ProduceCard } from './produce-card'

type ProduceGridProps = {
  produceList: Produce[]
  month: Month
}

export const ProduceGrid = ({ produceList, month }: ProduceGridProps) => {
  if (produceList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-gray-500">Aucun résultat trouvé</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {produceList.map((produce) => {
        return <ProduceCard key={produce.id} produce={produce} month={month} />
      })}
    </div>
  )
}
