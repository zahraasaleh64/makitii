import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CategoryIcon from '../lib/categoryIcons.jsx'

export default function CategoryGrid({ categories }) {
  const { t } = useTranslation()
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          to={`/produits?category_id=${cat.id}`}
          className="group flex flex-col items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-3 py-[22px] text-center transition duration-200 hover:-translate-y-0.5 hover:border-makitii-green/40 hover:shadow-sm"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-makitii-green-light text-makitii-green-dark transition duration-200 group-hover:bg-makitii-green group-hover:text-white">
            <CategoryIcon slug={cat.icon || cat.slug} className="h-[22px] w-[22px]" strokeWidth="1.7" />
          </div>
          <div>
            <p className="line-clamp-2 text-sm font-bold text-neutral-800">{cat.name}</p>
            <p className="mt-0.5 text-xs text-neutral-400">
              {t('categoryGrid.listingCount', { count: cat.listings_count ?? 0 })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
