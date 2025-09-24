import { createRoot } from 'react-dom/client'
import App from './app/App'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContexts'
import {UserProvider} from './contexts/LoginedUserContexts'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
   <QueryClientProvider client={queryClient}>
      <AuthProvider>
         <UserProvider>
         <BrowserRouter>
            <App />   
         </BrowserRouter>
         </UserProvider>
      </AuthProvider>
   </QueryClientProvider>,
)
