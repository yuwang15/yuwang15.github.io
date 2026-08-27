import { brandFilms } from '../data/campaigns'
import { useLocale } from '../i18n/LocaleContext'

export function Films() {
  const { t, L } = useLocale()

  return (
    <div className="page">
      <div className="container">
        <header className="editorial-header editorial-header--tight">
          <h1>{t('films.title')}</h1>
          <p className="lede">{t('films.lede')}</p>
        </header>

        <div className="brand-films-grid films-page-grid">
          {brandFilms.map((film) => (
            <article key={film.slug} className="brand-film-card">
              <div className="brand-film-media">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={film.poster}
                >
                  <source src={film.src} type="video/mp4" />
                </video>
              </div>
              <div className="brand-film-copy">
                <h3>{L(film.title)}</h3>
                <p className="campaign-video-summary">{L(film.summary)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
