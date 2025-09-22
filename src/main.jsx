import { createRoot } from 'react-dom/client'
import App from './app/App'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContexts'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
   <QueryClientProvider client={queryClient}>
      <AuthProvider>
         <BrowserRouter>
            <App />   
         </BrowserRouter>
      </AuthProvider>
   </QueryClientProvider>,
)
