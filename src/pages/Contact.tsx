import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { brandFilms } from '../data/campaigns'
import { useLocale } from '../i18n/LocaleContext'

type FormState = {
  name: string
  email: string
  phone: string
  message: string
}

const empty: FormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

const emailOk = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

const phoneOk = (value: string) => {
  const digits = value.replace(/[\s()-]/g, '')
  return /^(\+?\d{6,15})$/.test(digits)
}

export function Contact() {
  const { t } = useLocale()
  const film = brandFilms[0]
  const [form, setForm] = useState<FormState>(empty)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const onChange =
    (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }))
      if (error) setError('')
    }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    const name = form.name.trim()
    const email = form.email.trim()
    const phone = form.phone.trim()
    const message = form.message.trim()

    if (!name) {
      setError(t('contact.error.name'))
      return
    }
    if (!message) {
      setError(t('contact.error.message'))
      return
    }
    if (!email && !phone) {
      setError(t('contact.error.reach'))
      return
    }
    if (email && !emailOk(email)) {
      setError(t('contact.error.email'))
      return
    }
    if (phone && !phoneOk(phone)) {
      setError(t('contact.error.phone'))
      return
    }

    setSent(true)
  }

  return (
    <section className="contact-split">
      <div className="contact-media" aria-hidden="true">
        <video
          className="contact-video"
          autoPlay
          muted
          loop
          playsInline
          poster={film.poster}
        >
          <source src={film.src} type="video/mp4" />
        </video>
        <div className="contact-media-veil" />
      </div>

      <div className="contact-panel">
        <div className="contact-panel-inner">
          {sent ? (
            <div className="contact-done">
              <p className="contact-kicker">{t('contact.title')}</p>
              <h1>{t('contact.thanks')}</h1>
              <p className="contact-done-copy">{t('contact.thanksCopy')}</p>
              <Link className="btn" to="/">
                {t('contact.back')}
              </Link>
            </div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <p className="contact-kicker">{t('contact.title')}</p>

              <label className="contact-field">
                <span>
                  {t('contact.name')}
                  <em aria-hidden>*</em>
                </span>
                <input
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={onChange('name')}
                  required
                />
              </label>

              <label className="contact-field">
                <span>
                  {t('contact.email')}
                  <i>{t('contact.optional')}</i>
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={onChange('email')}
                />
              </label>

              <label className="contact-field">
                <span>
                  {t('contact.phone')}
                  <i>{t('contact.optional')}</i>
                </span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={onChange('phone')}
                />
              </label>

              <label className="contact-field contact-field--area">
                <span>
                  {t('contact.message')}
                  <em aria-hidden>*</em>
                </span>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={onChange('message')}
                  required
                />
              </label>

              <p className="contact-rule">{t('contact.rule')}</p>

              {error ? (
                <p className="contact-error" role="alert">
                  {error}
                </p>
              ) : null}

              <button className="btn contact-submit" type="submit">
                {t('contact.send')}
              </button>

              <Link className="contact-store-link" to="/stores">
                {t('contact.bookStore')}
              </Link>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
