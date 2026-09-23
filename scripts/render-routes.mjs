// Called by prerender-seo.py: prints {origin, routes, html: {path: markup}} as JSON.
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const entry = pathToFileURL(resolve(import.meta.dirname, '../dist-ssr/entry-server.js'))
const { render, seoRoutes, SITE_ORIGIN } = await import(entry.href)

const routes = seoRoutes()
const html = {}
for (const route of routes) html[route.path] = render(route.path)

process.stdout.write(JSON.stringify({ origin: SITE_ORIGIN, routes, html }))
