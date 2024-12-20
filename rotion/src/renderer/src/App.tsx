import { QueryClientProvider } from '@tanstack/react-query'
import { Routes } from './Routes'
import './styles/global.css'
import { queryClient } from './lib/react-query'

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}
