import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppShell } from './App'
import { LocaleProvider } from './i18n/LocaleContext'

export { seoRoutes, SITE_ORIGIN } from './seo/routes'

/**
 * Build-time render of one route to static markup, so crawlers that do not run
 * JavaScript (Baidu, 360, Sogou, WeChat) read the real page copy and links.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <LocaleProvider>
        <StaticRouter location={url}>
          <AppShell />
        </StaticRouter>
      </LocaleProvider>
    </StrictMode>,
  )
}
