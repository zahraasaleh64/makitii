import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CategoryIcon from '../lib/categoryIcons.jsx'

export default function StoreCard({ store }) {
  const { t } = useTranslation()
  return (
    <Link
      to={`/boutiques/${store.slug}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-200 hover:shadow-xl"
    >
      {/* COVER BANNER */}
      <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-gradient-to-br from-makitii-green via-makitii-green-dark to-neutral-900">
        {store.cover_url ? (
          <img
            src={store.cover_url}
            alt=""
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-makitii-green to-makitii-green-dark opacity-90" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Floating city tag on cover */}
        {store.city && (
          <div className="absolute right-3 top-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-md">
              <svg viewBox="0 0 24 24" className="h-3 w-3 text-makitii-yellow" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {store.city}
            </span>
          </div>
        )}
      </div>

      {/* CARD BODY */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-0">
        {/* LOGO AVATAR ROW (Overlaps the cover without clipping) */}
        <div className="-mt-7 mb-2.5 flex items-end justify-between">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-white bg-white shadow-md transition-transform duration-300 group-hover:scale-105">
            {store.logo_url ? (
              <img src={store.logo_url} alt={store.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-makitii-green to-makitii-green-dark text-xl font-black text-white shadow-inner">
                {store.name?.[0]?.toUpperCase() || 'M'}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pb-0.5">
            {store.type === 'individual' ? (
              <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-600/20">
                {t('storeCard.freelance')}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                {t('storeCard.business')}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-bold text-neutral-800 transition group-hover:text-makitii-green">
            {store.name}
          </h3>
        </div>

        {store.category?.name && (
          <div className="mt-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500">
              {store.category.icon && (
                <CategoryIcon slug={store.category.icon} className="h-3 w-3" />
              )}
              {store.category.name}
            </span>
          </div>
        )}

        <p className="mt-2 line-clamp-2 h-8 text-xs leading-relaxed text-neutral-500">
          {store.description || t('storeCard.defaultDescription')}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-3 text-xs">
          <span className="font-medium text-neutral-500">
            {typeof store.products_count === 'number'
              ? t('storeCard.itemCount', { count: store.products_count })
              : t('storeCard.activeCatalog')}
          </span>
          <span className="font-semibold text-makitii-green transition group-hover:translate-x-0.5">
            {t('storeCard.visit')} →
          </span>
        </div>
      </div>
    </Link>
  )
}
