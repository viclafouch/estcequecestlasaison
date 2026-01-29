import { createFileRoute } from '@tanstack/react-router'

const ProductPage = () => {
  const { slug } = Route.useParams()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <p className="text-gray-600">Page produit : {slug} (à implémenter)</p>
    </div>
  )
}

export const Route = createFileRoute('/$slug')({
  component: ProductPage
})
