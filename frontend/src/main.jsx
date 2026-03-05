import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.jsx'

// VITE_CLERK_PUBLISHABLE_KEY is read automatically from .env / .env.local
// Do NOT pass publishableKey as a prop — ClerkProvider picks it up via the env var
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>,
)
