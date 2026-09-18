import { useTranslation } from 'react-i18next'
import CategoryIcon from '../lib/categoryIcons.jsx'
export default function CategoryFilter({ categories, activeId, onChange }) {
  const { t } = useTranslation()
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
          !activeId
            ? 'bg-makitii-green text-white shadow-sm'
            : 'bg-white text-neutral-600 ring-1 ring-neutral-200 hover:ring-makitii-green'
        }`}
      >
        {t('common.allCategories')}
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onChange(cat.id)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
            activeId === cat.id
              ? 'bg-makitii-green text-white shadow-sm'
              : 'bg-white text-neutral-600 ring-1 ring-neutral-200 hover:ring-makitii-green'
          }`}
        >
          {cat.icon ? (
            <CategoryIcon slug={cat.icon} className="h-5 w-5 shrink-0" />
          ) : (
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                activeId === cat.id ? 'bg-white/25 text-white' : 'bg-makitii-yellow/30 text-makitii-green-dark'
              }`}
            >
              {cat.name?.[0]}
            </span>
          )}
          {cat.name}
        </button>
      ))}
    </div>
  )
}
