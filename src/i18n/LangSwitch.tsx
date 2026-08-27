import { useLocale } from '../i18n/LocaleContext'
import type { Locale } from '../i18n/types'

const options: { id: Locale; label: string }[] = [
  { id: 'zh', label: '中' },
  { id: 'en', label: 'EN' },
]

export function LangSwitch() {
  const { locale, setLocale, t } = useLocale()

  return (
    <div className="lang-switch" role="group" aria-label={t('nav.lang')}>
      {options.map((opt, index) => (
        <span key={opt.id} className="lang-switch-item">
          {index > 0 ? <span className="lang-switch-sep" aria-hidden>/</span> : null}
          <button
            type="button"
            className={locale === opt.id ? 'is-active' : undefined}
            aria-pressed={locale === opt.id}
            onClick={() => setLocale(opt.id)}
          >
            {opt.label}
          </button>
        </span>
      ))}
    </div>
  )
}
