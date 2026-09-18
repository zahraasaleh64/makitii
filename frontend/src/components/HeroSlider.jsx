import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import iconLogo from '../assets/icon.png'

const SLIDES = [
  {
    id: 'postez-vendez-achetez',
    gradient: 'from-makitii-green via-makitii-green to-makitii-green-dark',
    blob: 'bg-makitii-yellow/20',
    titleKey: 'heroSlider.slide1.title',
    textKey: 'heroSlider.slide1.text',
    primary: { labelKey: 'heroSlider.exploreStores', to: '/boutiques', style: 'light' },
    secondary: { labelKey: 'navbar.becomeVendor', to: '/devenir-vendeur', style: 'yellow' },
  },
  {
    id: 'boutiques-pres-de-chez-vous',
    gradient: 'from-makitii-red via-makitii-red to-makitii-red-dark',
    blob: 'bg-white/10',
    titleKey: 'heroSlider.slide2.title',
    textKey: 'heroSlider.slide2.text',
    primary: { labelKey: 'heroSlider.viewStores', to: '/boutiques', style: 'light' },
    secondary: { labelKey: 'heroSlider.viewProducts', to: '/produits', style: 'yellow' },
  },
  {
    id: 'vendez-sur-whatsapp',
    gradient: 'from-makitii-yellow-dark via-makitii-yellow-dark to-makitii-red-dark',
    blob: 'bg-white/10',
    titleKey: 'heroSlider.slide3.title',
    textKey: 'heroSlider.slide3.text',
    primary: { labelKey: 'navbar.becomeVendor', to: '/devenir-vendeur', style: 'light' },
    secondary: { labelKey: 'heroSlider.exploreStores', to: '/boutiques', style: 'yellow' },
  },
]

const AUTOPLAY_MS = 5500

function CtaButton({ item, t }) {
  const base = 'rounded-full px-6 py-3 font-semibold shadow-lg transition hover:scale-105'
  const styles = {
    light: 'bg-white text-makitii-green-dark',
    yellow: 'bg-makitii-yellow text-makitii-ink',
  }
  return (
    <Link to={item.to} className={`${base} ${styles[item.style]}`}>
      {t(item.labelKey)}
    </Link>
  )
}

export default function HeroSlider() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(null)

  const goTo = useCallback((i) => {
    setIndex((i + SLIDES.length) % SLIDES.length)
  }, [])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) {
      if (delta < 0) next()
      else prev()
    }
    touchStartX.current = null
  }

  return (
    <section
      className="relative overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label={t('heroSlider.ariaLabel')}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative h-[560px] sm:h-[520px] md:h-[560px]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== index}
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-opacity duration-700 ease-in-out ${
              i === index ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}
          >
            <div
              className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full ${slide.blob} animate-blob`}
            />
            <div className="pointer-events-none absolute -bottom-16 left-1/4 h-56 w-56 rounded-full bg-white/5 animate-blob" />

            <div
              className={`relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-8 px-4 text-center transition-all duration-700 ${
                i === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <img src={iconLogo} alt="" className="h-20 w-auto animate-float drop-shadow-lg" />
              <h1
                className="text-4xl text-white md:text-6xl"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                {t(slide.titleKey)}
              </h1>
              <p className="max-w-xl text-balance text-white/90">{t(slide.textKey)}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <CtaButton item={slide.primary} t={t} />
                <CtaButton item={slide.secondary} t={t} />
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label={t('heroSlider.prevSlide')}
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/35 md:left-6"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label={t('heroSlider.nextSlide')}
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/35 md:right-6"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={t('heroSlider.goToSlide', { number: i + 1 })}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-7 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
