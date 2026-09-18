import { useTranslation } from 'react-i18next'

export default function Pagination({ meta, onPageChange }) {
  const { t } = useTranslation()
  if (!meta || meta.last_page <= 1) return null

  const pages = Array.from({ length: meta.last_page }, (_, i) => i + 1)
  const current = meta.current_page

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
        className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 transition disabled:opacity-40 hover:border-makitii-green hover:text-makitii-green"
      >
        {t('common.previous')}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-10 w-10 rounded-lg text-sm font-semibold transition ${
            page === current
              ? 'bg-makitii-green text-white'
              : 'border border-neutral-200 text-neutral-600 hover:border-makitii-green hover:text-makitii-green'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={current >= meta.last_page}
        onClick={() => onPageChange(current + 1)}
        className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 transition disabled:opacity-40 hover:border-makitii-green hover:text-makitii-green"
      >
        {t('common.next')}
      </button>
    </nav>
  )
}
