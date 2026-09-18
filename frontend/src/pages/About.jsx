import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import logoFull from '../assets/logo-full.svg'

export default function About() {
  const { t } = useTranslation()

  const values = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-makitii-green" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.678 3.5h12.644a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
        </svg>
      ),
      titleKey: 'about.pillar1.title',
      descriptionKey: 'about.pillar1.description',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-makitii-yellow" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
        </svg>
      ),
      titleKey: 'about.pillar2.title',
      descriptionKey: 'about.pillar2.description',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-makitii-green-dark" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      ),
      titleKey: 'about.pillar3.title',
      descriptionKey: 'about.pillar3.description',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-makitii-red" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-1.074-.717c.026-.84.28-1.782.74-2.573C3.606 16.275 3 14.237 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      ),
      titleKey: 'about.pillar4.title',
      descriptionKey: 'about.pillar4.description',
    },
  ]

  const stats = [
    { number: '100+', labelKey: 'about.stat1' },
    { number: '1 000+', labelKey: 'about.stat2' },
    { number: '100%', labelKey: 'about.stat3' },
    { number: '24/7', labelKey: 'about.stat4' },
  ]

  return (
    <div className="pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-makitii-green-light/40 via-white to-makitii-yellow/20 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-makitii-green/20 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-makitii-green-dark shadow-sm backdrop-blur">
              {t('about.ourMission')}
            </span>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              {t('about.heroTitle')}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              <strong className="text-neutral-900">Makitii</strong> {t('about.heroDescription')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* STORY & VISION */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal delay={100}>
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-makitii-yellow/30 blur-3xl" />
              <div className="relative rounded-3xl border border-neutral-100 bg-white p-8 shadow-xl">
                <img src={logoFull} alt="Makitii" className="h-16 w-auto" />
                <h3 className="mt-6 text-xl font-bold text-neutral-800">
                  {t('heroSlider.slide1.title')}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {t('about.storyText')}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-xl bg-makitii-green-light px-3 py-1.5 text-xs font-semibold text-makitii-green-dark">
                    📱 {t('about.badgeMobile')}
                  </span>
                  <span className="rounded-xl bg-makitii-yellow/30 px-3 py-1.5 text-xs font-semibold text-makitii-ink">
                    ⚡ {t('about.badgeCommission')}
                  </span>
                  <span className="rounded-xl bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700">
                    🇬🇳 {t('about.badgeMadeFor')}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-makitii-green">
                {t('about.whyMakitii')}
              </span>
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                {t('about.whySubtitle')}
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                {t('about.whyText1')}
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                {t('about.whyText2')}
              </p>
              <div className="pt-2">
                <Link
                  to="/devenir-vendeur"
                  className="inline-flex items-center gap-2 rounded-full bg-makitii-green px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-makitii-green-dark hover:shadow-lg"
                >
                  {t('about.joinVendorCommunity')} →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 4 PILLARS */}
        <Reveal as="section" className="mt-20">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-makitii-green">
              {t('about.ourPillars')}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">
              {t('about.pillarsSubtitle')}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-makitii-green/30 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-50 shadow-inner">
                  {val.icon}
                </div>
                <h3 className="font-bold text-neutral-800">{t(val.titleKey)}</h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">{t(val.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* STATS */}
        <Reveal as="section" className="mt-20 rounded-3xl bg-neutral-900 px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((st, i) => (
              <div key={i}>
                <p className="text-3xl font-extrabold text-makitii-yellow sm:text-4xl">{st.number}</p>
                <p className="mt-2 text-sm text-neutral-300">{t(st.labelKey)}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA BANNER */}
        <Reveal as="section" className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-r from-makitii-green via-makitii-green to-makitii-green-dark p-8 text-white shadow-xl sm:p-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-2xl font-bold sm:text-3xl">{t('about.ctaTitle')}</h3>
              <p className="mt-2 max-w-xl text-sm text-emerald-100">
                {t('about.ctaText')}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                to="/devenir-vendeur"
                className="rounded-full bg-makitii-yellow px-6 py-3 text-sm font-bold text-makitii-ink shadow-md transition hover:scale-105"
              >
                {t('navbar.becomeVendor')}
              </Link>
              <Link
                to="/contact"
                className="rounded-full bg-white/20 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/30"
              >
                {t('about.contactUsCta')}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
