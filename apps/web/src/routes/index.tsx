import { createFileRoute } from '@tanstack/react-router'

const Home = () => {
  return <div>Hello world</div>
}

export const Route = createFileRoute('/')({
  component: Home
})
