import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../lib/api'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import Spinner from '../components/Spinner'
import EmptyState from '../components/EmptyState'
import Reveal from '../components/Reveal'

export default function Products() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const categoryId = searchParams.get('category_id') ? Number(searchParams.get('category_id')) : null
  const type = searchParams.get('type') || null
  const condition = searchParams.get('condition') || null
  const page = Number(searchParams.get('page') || 1)

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data.data || []))
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = { page }
    if (categoryId) params.category_id = categoryId
    if (type) params.type = type
    if (condition) params.condition = condition
    if (searchParams.get('search')) params.search = searchParams.get('search')

    api
      .get('/products', { params })
      .then((res) => {
        setProducts(res.data.data || [])
        setMeta(res.data.meta || null)
      })
      .finally(() => setLoading(false))
  }, [categoryId, type, condition, page, searchParams])

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        next.delete(key)
      } else {
        next.set(key, value)
      }
    })
    if (!('page' in updates)) next.delete('page')
    setSearchParams(next)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    updateParams({ search })
  }

  const clearAllFilters = () => {
    setSearch('')
    setSearchParams({})
  }

  const activeCategory = categories.find((c) => c.id === categoryId)
  const hasActiveFilters = Boolean(categoryId || type || condition || searchParams.get('search'))

  const typeOptions = [
    { val: null, label: t('productsPage.allCatalog') },
    { val: 'product', label: t('productsPage.physicalProducts') },
    { val: 'service', label: t('footer.servicesAndFreelance') },
  ]

  const conditionOptions = [
    { val: null, label: t('productsPage.allConditions') },
    { val: 'neuf', label: t('condition.new') },
    { val: 'comme_neuf', label: t('condition.likeNew') },
    { val: 'occasion', label: t('condition.used') },
  ]

  return (
    <div className="pb-16">
      {/* HERO / SEARCH HEADER */}
      <section className="bg-gradient-to-br from-makitii-green-light/30 via-white to-makitii-yellow/20 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-makitii-green/20 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-makitii-green-dark shadow-sm backdrop-blur">
                {t('navbar.allListings')}
              </span>
              <h1 className="mt-3 text-3xl font-extrabold text-neutral-900 sm:text-4xl">
                {t('productsPage.heroTitle')}
              </h1>
              <p className="mt-2 text-sm text-neutral-600 sm:text-base">
                {t('productsPage.heroSubtitle')}
              </p>

              {/* SEARCH BAR */}
              <form onSubmit={handleSearchSubmit} className="mt-6 flex max-w-lg items-center gap-2">
                <div className="relative flex-1">
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t('productsPage.searchPlaceholder')}
                    className="w-full rounded-full border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none transition focus:border-makitii-green focus:ring-2 focus:ring-makitii-green/20"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-makitii-green px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-makitii-green-dark"
                >
                  {t('common.search')}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MAIN CONTENT WITH SIDEBAR */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* MOBILE FILTER TOGGLE BUTTON */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFilterOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-makitii-green" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            {t('productsPage.filtersAndCategories')} {hasActiveFilters && '•'}
          </button>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs font-semibold text-makitii-red hover:underline"
            >
              {t('productsPage.clearAll')}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* SIDEBAR FILTERS */}
          <aside
            className={`w-full shrink-0 lg:block lg:w-64 xl:w-72 ${
              mobileFilterOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="sticky top-24 space-y-6 rounded-3xl border border-neutral-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h3 className="font-bold text-neutral-800">{t('productsPage.filters')}</h3>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-makitii-red transition hover:underline"
                  >
                    {t('productsPage.clearAll')}
                  </button>
                )}
              </div>

              {/* TYPE FILTER */}
              <div>
                <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {t('productsPage.offerType')}
                </h4>
                <div className="space-y-1">
                  {typeOptions.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        updateParams({ type: item.val })
                        setMobileFilterOpen(false)
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition ${
                        type === item.val
                          ? 'bg-makitii-green-light font-bold text-makitii-green-dark'
                          : 'text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {type === item.val && <span className="text-makitii-green">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* CONDITION FILTER */}
              <div>
                <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {t('productsPage.condition')}
                </h4>
                <div className="space-y-1">
                  {conditionOptions.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        updateParams({ condition: item.val })
                        setMobileFilterOpen(false)
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition ${
                        condition === item.val
                          ? 'bg-makitii-green-light font-bold text-makitii-green-dark'
                          : 'text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {condition === item.val && <span className="text-makitii-green">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* CATEGORIES SIDEBAR LIST */}
              <div>
                <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {t('productsPage.categories')}
                </h4>
                <div className="max-h-80 space-y-1 overflow-y-auto pr-1">
                  <button
                    type="button"
                    onClick={() => {
                      updateParams({ category_id: null })
                      setMobileFilterOpen(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                      categoryId === null
                        ? 'bg-makitii-green font-bold text-white shadow-sm'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{t('common.allCategories')}</span>
                    {categoryId === null && <span>✓</span>}
                  </button>

                  {categories.map((cat) => {
                    const isSelected = categoryId === cat.id
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          updateParams({ category_id: cat.id })
                          setMobileFilterOpen(false)
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                          isSelected
                            ? 'bg-makitii-green font-bold text-white shadow-sm'
                            : 'text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {cat.icon_url && (
                            <img
                              src={cat.icon_url}
                              alt=""
                              className="h-4 w-4 shrink-0 rounded-full object-cover"
                            />
                          )}
                          <span className="truncate">{cat.name}</span>
                        </div>
                        {isSelected && <span className="ml-2 shrink-0">✓</span>}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCTS GRID */}
          <main className="min-w-0 flex-1">
            {/* ACTIVE FILTERS BAR */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-neutral-800">
                  {t('storeCard.itemCount', { count: meta?.total ?? products.length })}
                </span>

                {/* Filter tags */}
                {activeCategory && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-makitii-green-light px-3 py-1 text-xs font-semibold text-makitii-green-dark">
                    {t('productsPage.categoryTag', { name: activeCategory.name })}
                    <button
                      type="button"
                      onClick={() => updateParams({ category_id: null })}
                      className="ml-1 text-makitii-green-dark hover:text-makitii-red"
                    >
                      ✕
                    </button>
                  </span>
                )}

                {type && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                    {t('productsPage.typeTag', { type: type === 'service' ? t('productsPage.services') : t('productsPage.products') })}
                    <button
                      type="button"
                      onClick={() => updateParams({ type: null })}
                      className="ml-1 hover:text-makitii-red"
                    >
                      ✕
                    </button>
                  </span>
                )}

                {condition && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
                    {t('productsPage.conditionTag', { condition: condition === 'neuf' ? t('condition.new') : condition === 'comme_neuf' ? t('condition.likeNew') : t('condition.used') })}
                    <button
                      type="button"
                      onClick={() => updateParams({ condition: null })}
                      className="ml-1 hover:text-makitii-red"
                    >
                      ✕
                    </button>
                  </span>
                )}

                {searchParams.get('search') && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                    "{searchParams.get('search')}"
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('')
                        updateParams({ search: null })
                      }}
                      className="ml-1 hover:text-makitii-red"
                    >
                      ✕
                    </button>
                  </span>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-makitii-green hover:underline"
                >
                  {t('productsPage.resetAll')}
                </button>
              )}
            </div>

            {loading ? (
              <Spinner />
            ) : products.length === 0 ? (
              <EmptyState
                title={t('productsPage.noItemsFound')}
                description={t('productsPage.noItemsDescription')}
                action={
                  hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="mt-3 rounded-full bg-makitii-green px-5 py-2 text-xs font-semibold text-white transition hover:bg-makitii-green-dark"
                    >
                      {t('productsPage.clearAllFilters')}
                    </button>
                  )
                }
              />
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="mt-8">
                  <Pagination meta={meta} onPageChange={(p) => updateParams({ page: p })} />
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
