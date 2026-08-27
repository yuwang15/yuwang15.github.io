export type Locale = 'zh' | 'en'

export type LocalizedString = {
  zh: string
  en: string
}

export function pick(locale: Locale, value: LocalizedString | string): string {
  if (typeof value === 'string') return value
  return value[locale]
}

export const STORAGE_KEY = 'syw-locale'
