import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LocaleProvider } from './i18n/LocaleContext'
import './styles/fonts.css'
import './styles/global.css'

const spaRedirect = sessionStorage.getItem('syw-spa-redirect')
if (spaRedirect) {
  sessionStorage.removeItem('syw-spa-redirect')
  window.history.replaceState(null, '', spaRedirect)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
)
