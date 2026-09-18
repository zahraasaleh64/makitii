import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function JobCard({ job }) {
  const { t } = useTranslation()
  const store = job.store

  return (
    <Link
      to={`/emplois/${job.id}`}
      className="group flex flex-col justify-between rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-makitii-green/30 hover:shadow-lg"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-makitii-green to-makitii-green-dark font-extrabold text-white shadow-sm">
              {store?.logo_url ? (
                <img src={store.logo_url} alt={store.name} className="h-full w-full object-cover" />
              ) : (
                <span>{store?.name?.[0]?.toUpperCase() || 'M'}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="line-clamp-1 text-xs font-medium text-neutral-400">
                {store?.name || t('jobCard.company')}
              </p>
              <h3 className="line-clamp-1 font-semibold text-neutral-800 transition group-hover:text-makitii-green-dark">
                {job.title}
              </h3>
            </div>
          </div>
          {job.contract_type && (
            <span className="shrink-0 rounded-full bg-makitii-green-light px-2.5 py-1 text-xs font-semibold text-makitii-green-dark">
              {job.contract_type}
            </span>
          )}
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-neutral-500">
          {job.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500">
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          {job.location || store?.city || t('jobCard.defaultCountry')}
        </span>
        <span className="font-semibold text-makitii-green transition group-hover:translate-x-0.5">
          {t('jobCard.viewOffer')} →
        </span>
      </div>
    </Link>
  )
}
