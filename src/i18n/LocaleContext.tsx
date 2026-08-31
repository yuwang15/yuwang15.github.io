import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { translate } from './messages'
import { type Locale, type LocalizedString, pick } from './types'

type LocaleContextValue = {
  locale: Locale
  t: (key: string, vars?: Record<string, string | number>) => string
  L: (value: LocalizedString | string) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

/**
 * The site presents one bilingual voice rather than two switchable locales, so
 * copy is authored in the `zh` set with English kept inline where it reads as
 * part of the brand. The `en` set is retained for a future standalone build.
 */
const LOCALE: Locale = 'zh'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale: LOCALE,
      t: (key, vars) => translate(LOCALE, key, vars),
      L: (value) => pick(LOCALE, value),
    }),
    [],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
