import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'
import StoreCard from '../components/StoreCard'
import ProductCard from '../components/ProductCard'
import JobCard from '../components/JobCard'
import Spinner from '../components/Spinner'
import CategoryGrid from '../components/CategoryGrid'
import Reveal from '../components/Reveal'

const WHY_MAKITII_KEYS = ['messaging', 'verifiedSellers', 'publicReviews', 'freshListings', 'madeForGuinea', 'mobileFirst']

const WHY_ART_ICONS = [
  <path key="tag" strokeLinecap="round" strokeLinejoin="round" d="M4 4h7l9 9-7 7-9-9V4Zm3.5 3.5v0" />,
  <path key="car" strokeLinecap="round" strokeLinejoin="round" d="M4 16v3h3v-3M17 16v3h3v-3M3 16h18v-3.2a2 2 0 0 0-.4-1.2l-2.2-3A3 3 0 0 0 16 7H8a3 3 0 0 0-2.4 1.2l-2.2 3A2 2 0 0 0 3 12.4V16Zm3.5-3h11" />,
  <path key="phone" strokeLinecap="round" strokeLinejoin="round" d="M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2.5 15h3" />,
  <path key="home" strokeLinecap="round" strokeLinejoin="round" d="M4 11 12 4l8 7M6 10v9h12v-9M10 19v-5h4v5" />,
  <path key="shop" strokeLinecap="round" strokeLinejoin="round" d="M4 8.5 5.5 4h13L20 8.5M4 8.5v11h16v-11M4 8.5h16M9.5 12v5.5h5V12" />,
  <path key="bag" strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h12l1 12.75a1.5 1.5 0 0 1-1.5 1.5H6.5a1.5 1.5 0 0 1-1.5-1.5L6 7.5Zm2.5 0v-1.5a3.5 3.5 0 1 1 7 0v1.5" />,
]

const HOW_IT_WORKS_KEYS = ['step1', 'step2', 'step3', 'step4']

function SectionHead({ title, to, seeAllLabel }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-xl font-bold text-neutral-800 sm:text-2xl">{title}</h2>
      {to && (
        <Link
          to={to}
          className="rounded-md border border-neutral-200 px-4 py-[7px] text-[13px] font-medium text-neutral-600 transition hover:border-makitii-green hover:text-makitii-green"
        >
          {seeAllLabel}
        </Link>
      )}
    </div>
  )
}

export default function Home() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const [categories, setCategories] = useState([])
  const [stores, setStores] = useState([])
  const [products, setProducts] = useState([])
  const [services, setServices] = useState([])
  const [jobs, setJobs] = useState([])
  const [stats, setStats] = useState({ listings: null, sellers: null })
  const [loading, setLoading] = useState(true)

  const postAdLink = !user ? '/devenir-vendeur' : user.role === 'vendor' ? '/tableau-de-bord/produits/nouveau' : '/tableau-de-bord'
  const numberLocale = i18n.language?.startsWith('en') ? 'en-US' : 'fr-FR'

  useEffect(() => {
    let mounted = true

    Promise.all([
      api.get('/categories'),
      api.get('/stores'),
      api.get('/products', { params: { type: 'product' } }),
      api.get('/products', { params: { type: 'service' } }),
      api.get('/jobs'),
    ])
      .then(([catRes, storeRes, productRes, serviceRes, jobRes]) => {
        if (!mounted) return
        setCategories(catRes.data.data || [])
        setStores(storeRes.data.data || [])
        setProducts(productRes.data.data || [])
        setServices(serviceRes.data.data || [])
        setJobs(jobRes.data.data || [])
        const productsTotal = productRes.data.meta?.total ?? productRes.data.data?.length ?? 0
        const servicesTotal = serviceRes.data.meta?.total ?? serviceRes.data.data?.length ?? 0
        setStats({
          listings: productsTotal + servicesTotal,
          sellers: storeRes.data.meta?.total ?? storeRes.data.data?.length ?? null,
        })
      })
      .catch((err) => {
        console.error('Home page load error:', err)
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  const featured = [...products, ...services]
    .sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1))
    .slice(0, 4)

  return (
    <div>
      {/* HERO */}
      <section
        className="relative isolate overflow-hidden"
        style={{ background: 'linear-gradient(120deg, #0F5F22, #1B7A2C 42%, #D8A900)' }}
      >
        {/* Décor : cercles + vague + carrés aux couleurs du drapeau, comme sur makitii.com */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1440 560"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <circle cx="180" cy="120" r="240" fill="#ffffff" opacity="0.06" />
          <circle cx="1290" cy="470" r="300" fill="#ffffff" opacity="0.05" />
          <path d="M0 470 Q 360 380 720 470 T 1440 470 V560 H0Z" fill="#ffffff" opacity="0.07" />
          <g opacity="0.16">
            <rect x="1040" y="60" width="70" height="46" rx="6" fill="#ce1126" />
            <rect x="1130" y="60" width="70" height="46" rx="6" fill="#fcd116" />
            <rect x="1220" y="60" width="70" height="46" rx="6" fill="#ffffff" />
          </g>
        </svg>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.16] px-3.5 py-1.5 text-[12.5px] font-semibold text-white">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="m12 4 2.5 5.2 5.5.8-4 4 1 5.5-5-2.7-5 2.7 1-5.5-4-4 5.5-.8L12 4Z"/></svg>
              {t('home.badge')}
            </span>
            <h1 className="mt-4 text-[32px] font-semibold leading-[1.15] text-white sm:text-[40px] lg:text-[46px]">
              {t('home.heroTitle')}
            </h1>
            <p className="mt-4 max-w-xl text-sm text-white/85 sm:text-base">
              {t('home.heroSubtitle')}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to={postAdLink}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-makitii-yellow px-[30px] py-[14px] text-[15px] font-medium text-makitii-ink transition hover:brightness-95 active:scale-[0.98]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                {t('home.postFreeAd')}
              </Link>
              <a
                href="#categories"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 px-[30px] py-[14px] text-[15px] font-medium text-white transition hover:bg-white/10 active:scale-[0.98]"
              >
                {t('home.browseCategories')}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  {stats.listings != null ? `${stats.listings.toLocaleString(numberLocale)}+` : '—'}
                </p>
                <p className="text-xs font-medium text-white/70">{t('home.listingsOnline')}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  {stats.sellers != null ? stats.sellers.toLocaleString(numberLocale) : '—'}
                </p>
                <p className="text-xs font-medium text-white/70">{t('home.activeSellers')}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white sm:text-3xl">{categories.length || 12}</p>
                <p className="text-xs font-medium text-white/70">{t('home.categoriesLabel')}</p>
              </div>
            </div>
          </Reveal>

          {featured.length > 0 && (
            <Reveal delay={100} className="grid grid-cols-2 gap-4">
              {featured.map((item, i) => (
                <Reveal key={item.id} delay={i * 60}>
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* CATEGORIES */}
        {categories.length > 0 && (
          <Reveal as="section" id="categories" className="mb-16 scroll-mt-24">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold uppercase tracking-tight text-neutral-800 sm:text-[26px]">
                {t('home.browseByCategory')}
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                {t('home.categoriesSubtitle', { count: categories.length })}
              </p>
            </div>
            <CategoryGrid categories={categories} />
          </Reveal>
        )}

        {/* WHY MAKITII */}
        <Reveal as="section" className="mb-16 rounded-2xl bg-neutral-50 px-6 py-12 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-5 text-2xl font-semibold uppercase tracking-tight text-neutral-700 sm:text-[26px]">
                {t('home.whyMakitii')}
              </h2>
              <div className="space-y-4">
                {WHY_MAKITII_KEYS.map((key) => (
                  <div key={key} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-makitii-green-light text-makitii-green-dark">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-semibold text-neutral-800">{t(`home.why.${key}.title`)}</h3>
                      <p className="text-sm text-neutral-500">{t(`home.why.${key}.description`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              aria-hidden="true"
              className="hidden rounded-lg p-[34px] lg:block"
              style={{ background: 'linear-gradient(135deg, #37B8C4, #2B96A8)' }}
            >
              <div className="grid grid-cols-3 gap-[18px]">
                {WHY_ART_ICONS.map((path, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-md bg-white/90"
                    style={{ color: '#1D7F8C' }}
                  >
                    <svg viewBox="0 0 24 24" className="h-[30px] w-[30px]" fill="none" stroke="currentColor" strokeWidth="1.4">
                      {path}
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* HOW IT WORKS */}
        <Reveal as="section" className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold uppercase tracking-tight text-neutral-800 sm:text-[26px]">
              {t('home.howItWorks')}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS_KEYS.map((key, i) => (
              <Reveal key={key} delay={i * 80} className="rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-makitii-green-light text-lg font-extrabold text-makitii-green-dark">
                  {i + 1}
                </div>
                <h3 className="font-bold text-neutral-800">{t(`home.steps.${key}.title`)}</h3>
                <p className="mt-1.5 text-sm text-neutral-500">{t(`home.steps.${key}.description`)}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {/* STORES */}
            <Reveal as="section" className="mb-14">
              <SectionHead title={t('home.featuredStores')} to="/boutiques" seeAllLabel={t('common.seeAll')} />
              {stores.length === 0 ? (
                <p className="text-sm text-neutral-500">{t('home.noStoresAvailable')}</p>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {stores.slice(0, 8).map((store, i) => (
                    <Reveal key={store.id} delay={i * 60} className="h-full">
                      <StoreCard store={store} />
                    </Reveal>
                  ))}
                </div>
              )}
            </Reveal>

            {/* RECENT LISTINGS */}
            <Reveal as="section" className="mb-14">
              <SectionHead title={t('home.recentListings')} to="/produits?type=product" seeAllLabel={t('common.seeAll')} />
              {products.length === 0 ? (
                <p className="text-sm text-neutral-500">{t('home.noListingsAvailable')}</p>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {products.slice(0, 8).map((product, i) => (
                    <Reveal key={product.id} delay={i * 50} className="h-full">
                      <ProductCard product={product} />
                    </Reveal>
                  ))}
                </div>
              )}
            </Reveal>

            {/* SERVICES & FREELANCE */}
            {services.length > 0 && (
              <Reveal as="section" className="mb-14">
                <SectionHead title={t('footer.servicesAndFreelance')} to="/produits?type=service" seeAllLabel={t('common.seeAll')} />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {services.slice(0, 8).map((service, i) => (
                    <Reveal key={service.id} delay={i * 50} className="h-full">
                      <ProductCard product={service} />
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            )}

            {/* RECENT JOB OFFERS */}
            {jobs.length > 0 && (
              <Reveal as="section" className="mb-6">
                <SectionHead title={t('home.recentJobOffers')} to="/emplois" seeAllLabel={t('common.seeAll')} />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {jobs.slice(0, 4).map((job, i) => (
                    <Reveal key={job.id} delay={i * 60} className="h-full">
                      <JobCard job={job} />
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            )}
          </>
        )}
      </div>

      {/* CLOSING CTA */}
      <Reveal as="section" className="bg-makitii-green-light/60">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h2 className="text-xl font-bold text-neutral-800 sm:text-2xl">
            {t('home.closingTitle')}
          </h2>
          <p className="mt-2 text-sm text-neutral-500">{t('home.closingSubtitle')}</p>
          <Link
            to={postAdLink}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-makitii-green px-[30px] py-[14px] text-[15px] font-medium text-white shadow-sm transition hover:bg-makitii-green-dark active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t('home.postMyAd')}
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
