import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PriceTag from './PriceTag'
import { conditionBadgeClass, conditionLabel, formatPublishedDate } from '../lib/listing'

export default function ProductCard({ product }) {
  const { t } = useTranslation()
  const primaryImage = product.images?.[0]?.url
  const condLabel = conditionLabel(product.condition, t)
  const publishedLabel = formatPublishedDate(product.created_at, t)

  return (
    <Link
      to={`/produits/${product.id}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-200 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        {product.featured && (
          <span className="absolute left-2.5 top-2.5 z-10 inline-flex items-center rounded-full bg-makitii-yellow px-2.5 py-1 text-[11px] font-bold text-makitii-ink shadow-sm">
            {t('productCard.featured')}
          </span>
        )}
        {condLabel && (
          <span
            className={`absolute bottom-2.5 left-2.5 z-10 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold shadow-sm ${conditionBadgeClass(product.condition)}`}
          >
            {condLabel}
          </span>
        )}
        {product.type === 'service' && (
          <div className="absolute right-2.5 top-2.5 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[11px] font-bold text-neutral-800 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-makitii-green/50"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-makitii-green"></span>
              </span>
              {t('productCard.service')}
            </span>
          </div>
        )}
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-300">
            <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 12 3l9 4.5M3 7.5v9L12 21m-9-13.5L12 12m0 9 9-4.5v-9M12 12l9-4.5M12 12v9" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        {product.category?.name && (
          <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-makitii-green-dark">
            {product.category.name}
          </p>
        )}
        <h3 className="mt-0.5 line-clamp-2 h-10 text-sm font-semibold leading-5 text-neutral-800 group-hover:text-makitii-green-dark">
          {product.name}
        </h3>

        <div className="mt-1.5 flex flex-col gap-0.5 text-xs text-neutral-400">
          {product.location && (
            <span className="flex items-center gap-1 truncate">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25S4.5 18 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {product.location}
            </span>
          )}
          {publishedLabel && (
            <span className="flex items-center gap-1 truncate">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {t('productCard.publishedOn', { date: publishedLabel })}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2.5">
          <PriceTag price={product.price} />
          {product.negotiable && (
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-500">
              {t('productCard.negotiable')}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
