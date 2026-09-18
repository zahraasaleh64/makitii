import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../lib/api'
import PriceTag from '../components/PriceTag'
import Spinner from '../components/Spinner'
import EmptyState from '../components/EmptyState'
import WhatsAppButton from '../components/WhatsAppButton'
import { conditionBadgeClass, conditionLabel, formatPublishedDate } from '../lib/listing'

export default function ProductDetail() {
  const { t } = useTranslation()
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    setActiveImage(0)
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Spinner />

  if (error || !product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          title={t('productDetail.notFoundTitle')}
          description={t('productDetail.notFoundDescription')}
          action={
            <Link to="/produits" className="text-sm font-semibold text-makitii-green hover:underline">
              ← {t('productDetail.backToListings')}
            </Link>
          }
        />
      </div>
    )
  }

  const images = product.images?.length ? product.images : []
  const store = product.store
  const isService = product.type === 'service'
  const targetNumber = store?.whatsapp_number || store?.phone
  const condLabel = conditionLabel(product.condition, t)
  const publishedLabel = formatPublishedDate(product.created_at, t)
  const formattedPrice = Math.round(Number(product.price))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  const whatsappMessage = isService
    ? t('productDetail.whatsappServiceMessage', { storeName: store?.name || '', name: product.name, price: formattedPrice })
    : t('productDetail.whatsappProductMessage', { storeName: store?.name || '', name: product.name, price: formattedPrice })

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="mb-6 text-sm text-neutral-400">
        <Link to="/produits" className="hover:text-makitii-green">{t('navbar.allListings')}</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-600">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100">
            {condLabel && (
              <span
                className={`absolute bottom-3 left-3 z-10 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold shadow-sm ${conditionBadgeClass(product.condition)}`}
              >
                {condLabel}
              </span>
            )}
            {images.length > 0 ? (
              <img src={images[activeImage]?.url} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-neutral-300">
                <svg viewBox="0 0 24 24" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 12 3l9 4.5M3 7.5v9L12 21m-9-13.5L12 12m0 9 9-4.5v-9M12 12l9-4.5M12 12v9" />
                </svg>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                    index === activeImage ? 'border-makitii-green' : 'border-transparent'
                  }`}
                >
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {product.category?.name && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-makitii-green-light px-2.5 py-1 text-xs font-medium text-makitii-green-dark">
                {product.category.name}
              </span>
            )}
            {product.type === 'service' && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                {t('productDetail.serviceOffering')}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-neutral-800 sm:text-3xl">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
            {product.location && (
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25S4.5 18 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {product.location}
              </span>
            )}
            {publishedLabel && (
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {t('productCard.publishedOn', { date: publishedLabel })}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <PriceTag price={product.price} className="text-2xl" />
            {product.negotiable && (
              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-500">
                {t('productCard.negotiable')}
              </span>
            )}
          </div>

          {product.description && (
            <p className="mt-5 whitespace-pre-line text-neutral-600">{product.description}</p>
          )}

          {store && (
            <Link
              to={`/boutiques/${store.slug}`}
              className="mt-6 flex items-center gap-3 rounded-xl border border-neutral-100 p-3 transition hover:border-makitii-green"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-makitii-green to-makitii-green-dark text-lg font-black text-white shadow-sm">
                {store.logo_url ? (
                  <img src={store.logo_url} alt={store.name} className="h-full w-full object-cover" />
                ) : (
                  <span>{store.name?.[0]?.toUpperCase() || 'M'}</span>
                )}
              </div>
              <div>
                <p className="text-sm text-neutral-400">
                  {isService ? t('productDetail.providerFreelancer') : t('jobDetail.postedBy')}
                </p>
                <p className="font-semibold text-neutral-800">{store.name}</p>
              </div>
            </Link>
          )}

          {/* CONTACT */}
          <div className="mt-6 space-y-3 rounded-2xl border border-neutral-100 bg-neutral-50/60 p-4">
            <WhatsAppButton number={targetNumber} message={whatsappMessage} fullWidth>
              {t('productDetail.contactSeller')}
            </WhatsAppButton>
            <p className="text-center text-[11px] text-neutral-400">
              💡 {t('productDetail.safetyTip')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
