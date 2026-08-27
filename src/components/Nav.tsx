import { useEffect, useState, type MouseEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { BrandMark } from './BrandMark'
import { useLocale } from '../i18n/LocaleContext'
import { LangSwitch } from '../i18n/LangSwitch'

const ease = [0.22, 1, 0.36, 1] as const

export function Nav() {
  const { pathname } = useLocation()
  const { locale, t } = useLocale()
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoverReveal, setHoverReveal] = useState(false)
  const onHome = pathname === '/'

  const scrollY = useMotionValue(0)
  useEffect(() => {
    const sync = () => scrollY.set(window.scrollY)
    sync()
    window.addEventListener('scroll', sync, { passive: true })
    return () => window.removeEventListener('scroll', sync)
  }, [scrollY])

  // Shrink with the first-scene cut (one light swipe ≈ one viewport)
  const logoScale = useTransform(scrollY, (y) => {
    if (reduceMotion || !onHome) return 1
    const span = Math.max(280, window.innerHeight * 0.72)
    const t = Math.min(1, Math.max(0, y / span))
    return 1 - t * 0.74
  })

  const links = [
    { to: '/collections', label: t('nav.collections') },
    { to: '/films', label: t('nav.films') },
    { to: '/stores', label: t('nav.stores') },
    { to: '/services', label: t('nav.services') },
    { to: '/brand', label: t('nav.brand') },
  ]

  useEffect(() => {
    setOpen(false)
    setHoverReveal(false)
  }, [pathname, locale])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    let ticking = false

    const update = () => {
      setScrolled(window.scrollY > 48)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goHomeTop = (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false)
    if (pathname === '/') {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }

  const atHomeTop = onHome && !scrolled
  const frosted = scrolled || !onHome || open || (atHomeTop && hoverReveal)
  const classes = [
    'nav',
    open ? 'is-open' : '',
    onHome ? 'is-home' : '',
    frosted ? 'is-frost' : 'is-over-hero',
    atHomeTop ? 'is-home-top' : '',
    atHomeTop && hoverReveal ? 'is-reveal' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header
      className={classes}
      onMouseEnter={() => {
        if (atHomeTop) setHoverReveal(true)
      }}
      onMouseLeave={() => setHoverReveal(false)}
    >
      {/* Wider top hit area so hover can summon the bar like Miu Miu */}
      {atHomeTop ? <div className="nav-hover-zone" aria-hidden /> : null}

      <div className="nav-inner">
        <motion.div
          className="nav-brand-slot"
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.05 }}
        >
          <Link
            to="/"
            className="nav-brand"
            aria-label={t('nav.home')}
            onClick={goHomeTop}
          >
            {onHome ? (
              <motion.span
                className="nav-brand-scale"
                style={{ scale: logoScale }}
              >
                <BrandMark size="hero" />
              </motion.span>
            ) : (
              <BrandMark size="nav" />
            )}
          </Link>
        </motion.div>

        <nav className="nav-menu" aria-label={locale === 'zh' ? '主导航' : 'Main'}>
          <ul className="nav-links">
            {links.map((link, index) => (
              <motion.li
                key={link.to}
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease,
                  delay: reduceMotion ? 0 : 0.1 + index * 0.06,
                }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>

        <motion.div
          className="nav-tools"
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease,
            delay: reduceMotion ? 0 : 0.34,
          }}
        >
          <LangSwitch />
          <button
            className="nav-toggle"
            type="button"
            aria-label={open ? t('nav.close') : t('nav.open')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </motion.div>
      </div>
    </header>
  )
}
