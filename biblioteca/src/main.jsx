import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthenticationContextProvider } from './components/services/auth/AuthContextProvider.jsx'
import { ThemeContextProvider } from './components/services/theme/ThemeContextProvider.jsx'
import TranslateContextProvider from './components/services/translation/TranslateContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <TranslateContextProvider>

        <AuthenticationContextProvider>
          <App />
        </AuthenticationContextProvider>
      </TranslateContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
