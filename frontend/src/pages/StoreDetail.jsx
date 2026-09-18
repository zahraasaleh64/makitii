import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import api from '../lib/api'
import ProductCard from '../components/ProductCard'
import JobCard from '../components/JobCard'
import Spinner from '../components/Spinner'
import EmptyState from '../components/EmptyState'
import WhatsAppButton from '../components/WhatsAppButton'
import Reveal from '../components/Reveal'
import CategoryIcon from '../lib/categoryIcons.jsx'

export default function StoreDetail() {
  const { t } = useTranslation()
  const { slug } = useParams()
  const { user } = useAuth()
  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])
  const [jobs, setJobs] = useState([])
  const [activeTab, setActiveTab] = useState('all') // 'all', 'products', 'services', 'jobs'
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const loadStore = () => {
    setLoading(true)
    setError(false)
    api
      .get(`/stores/${slug}`)
      .then((res) => {
        setStore(res.data.store)
        setProducts(res.data.products || [])
        setJobs(res.data.jobs || [])
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadStore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const handleAdminApprove = async () => {
    if (!store?.id) return
    setActionLoading(true)
    try {
      await api.put(`/admin/stores/${store.id}/approve`)
      loadStore()
    } finally {
      setActionLoading(false)
    }
  }

  const handleAdminReject = async () => {
    if (!store?.id) return
    const reason = window.prompt(t('storeDetail.rejectReasonPrompt')) || ''
    setActionLoading(true)
    try {
      await api.put(`/admin/stores/${store.id}/reject`, { reason })
      loadStore()
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) return <Spinner />

  if (error || !store) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          title={t('storeDetail.notFoundTitle')}
          description={t('storeDetail.notFoundDescription')}
          action={
            <Link to="/boutiques" className="text-sm font-semibold text-makitii-green hover:underline">
              ← {t('storeDetail.backToStores')}
            </Link>
          }
        />
      </div>
    )
  }

  const physicalProducts = products.filter((p) => p.type !== 'service')
  const services = products.filter((p) => p.type === 'service')

  // Filter items by active tab and internal search
  const filteredProducts = products.filter((p) => {
    if (activeTab === 'products' && p.type === 'service') return false
    if (activeTab === 'services' && p.type !== 'service') return false
    if (search.trim()) {
      return p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
    }
    return true
  })

  const filteredJobs = jobs.filter((j) => {
    if (search.trim()) {
      return j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.description?.toLowerCase().includes(search.toLowerCase())
    }
    return true
  })

  const isFreelance = store.type === 'individual'
  const targetNumber = store.whatsapp_number || store.phone
  const whatsappMessage = isFreelance
    ? t('storeDetail.whatsappFreelanceMessage', { name: store.name })
    : t('storeDetail.whatsappStoreMessage', { name: store.name })

  return (
    <div className="pb-16">
      {/* BREADCRUMB */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-400">
          <Link to="/" className="hover:text-makitii-green">{t('navbar.home')}</Link>
          <span>/</span>
          <Link to="/boutiques" className="hover:text-makitii-green">{t('navbar.stores')}</Link>
          <span>/</span>
          <span className="truncate font-medium text-neutral-700">{store.name}</span>
        </nav>
      </div>

      {/* ADMIN OR OWNER STATUS NOTICE IF NOT APPROVED */}
      {store.status !== 'approved' && (
        <div className="mx-auto max-w-6xl px-4 pt-4">
          <div className="flex flex-col gap-4 rounded-3xl border border-amber-300 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-lg font-bold text-white shadow-sm">
                🛡️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-amber-950">{t('storeDetail.moderationTitle')}</h3>
                  <span className="rounded-full bg-amber-200/80 px-2 py-0.5 text-[11px] font-bold text-amber-900 capitalize">
                    {t('storeDetail.statusLabel', { status: store.status === 'pending' ? t('common.status.pending') : t('common.status.rejected') })}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-amber-800">
                  {store.status === 'pending'
                    ? t('storeDetail.pendingNotice')
                    : t('storeDetail.rejectedNotice')}
                </p>
              </div>
            </div>

            {user?.role === 'admin' && (
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={handleAdminApprove}
                  className="rounded-xl bg-makitii-green px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-makitii-green-dark active:scale-95 disabled:opacity-50"
                >
                  ✓ {t('storeDetail.approveStore')}
                </button>
                {store.status !== 'rejected' && (
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={handleAdminReject}
                    className="rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-red-50 hover:text-makitii-red active:scale-95 disabled:opacity-50"
                  >
                    {t('storeDetail.reject')}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* BANNER & HEADER */}
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm">
          {/* COVER BANNER */}
          <div className="relative h-44 w-full overflow-hidden bg-gradient-to-r from-makitii-green via-makitii-green-dark to-neutral-900 sm:h-56">
            {store.cover_url ? (
              <img
                src={store.cover_url}
                alt=""
                className="h-full w-full object-cover opacity-85"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-makitii-green to-makitii-green-dark opacity-90" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* City Tag on banner */}
            {store.city && (
              <div className="absolute right-4 top-4 z-10">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  📍 {store.city}
                </span>
              </div>
            )}
          </div>

          {/* STORE PROFILE INFO ROW */}
          <div className="relative px-6 pb-6 pt-4">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              {/* Logo + Title + Badges */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Logo Avatar */}
                <div className="-mt-16 sm:-mt-20 relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md sm:h-28 sm:w-28">
                  {store.logo_url ? (
                    <img src={store.logo_url} alt={store.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-makitii-green to-makitii-green-dark text-3xl sm:text-4xl font-black text-white shadow-inner">
                      {store.name?.[0]?.toUpperCase() || 'M'}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl">
                      {store.name}
                    </h1>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                      ✓ {t('storeDetail.verified')}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    {store.type === 'individual' ? (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 font-semibold text-amber-700 ring-1 ring-amber-600/20">
                        {t('storeDetail.freelanceIndependent')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                        {t('storeDetail.businessStore')}
                      </span>
                    )}

                    {store.category?.name && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 font-medium text-neutral-700">
                        {store.category.icon && (
                          <CategoryIcon slug={store.category.icon} className="h-3.5 w-3.5" />
                        )}
                        {store.category.name}
                      </span>
                    )}

                    {store.address && (
                      <span className="text-neutral-500">
                        📍 {store.address}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 pt-2 sm:pt-0">
                <WhatsAppButton number={targetNumber} message={whatsappMessage}>
                  {isFreelance ? t('storeDetail.contactFreelanceWhatsApp') : t('storeDetail.contactStoreWhatsApp')}
                </WhatsAppButton>
              </div>
            </div>

            {/* DESCRIPTION */}
            {store.description && (
              <div className="mt-6 border-t border-neutral-100 pt-4 text-sm leading-relaxed text-neutral-600">
                <p>{store.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CATALOG SECTION */}
      <div className="mx-auto max-w-6xl px-4 pt-10">
        {/* TABS & SEARCH BAR */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* TABS */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                activeTab === 'all'
                  ? 'bg-makitii-green text-white shadow-sm'
                  : 'bg-white text-neutral-600 ring-1 ring-neutral-200 hover:ring-makitii-green'
              }`}
            >
              {t('storeDetail.tabAll', { count: products.length + jobs.length })}
            </button>

            {physicalProducts.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeTab === 'products'
                    ? 'bg-makitii-green text-white shadow-sm'
                    : 'bg-white text-neutral-600 ring-1 ring-neutral-200 hover:ring-makitii-green'
                }`}
              >
                {t('storeDetail.tabProducts', { count: physicalProducts.length })}
              </button>
            )}

            {services.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('services')}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeTab === 'services'
                    ? 'bg-makitii-green text-white shadow-sm'
                    : 'bg-white text-neutral-600 ring-1 ring-neutral-200 hover:ring-makitii-green'
                }`}
              >
                {t('storeDetail.tabServices', { count: services.length })}
              </button>
            )}

            {jobs.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('jobs')}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeTab === 'jobs'
                    ? 'bg-makitii-green text-white shadow-sm'
                    : 'bg-white text-neutral-600 ring-1 ring-neutral-200 hover:ring-makitii-green'
                }`}
              >
                {t('storeDetail.tabJobs', { count: jobs.length })}
              </button>
            )}
          </div>

          {/* INTERNAL SEARCH */}
          <div className="relative w-full max-w-xs">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('storeDetail.searchInStore')}
              className="w-full rounded-full border border-neutral-200 bg-white py-2 pl-9 pr-4 text-xs shadow-sm outline-none transition focus:border-makitii-green focus:ring-1 focus:ring-makitii-green"
            />
            <svg
              viewBox="0 0 24 24"
              className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>

        {/* CONTENT GRID */}
        {activeTab === 'jobs' ? (
          filteredJobs.length === 0 ? (
            <EmptyState
              title={t('storeDetail.noJobsTitle')}
              description={t('storeDetail.noJobsDescription')}
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={{ ...job, store }} />
              ))}
            </div>
          )
        ) : (
          <>
            {filteredProducts.length === 0 && filteredJobs.length === 0 ? (
              <EmptyState
                title={t('storeDetail.noItemsTitle')}
                description={t('storeDetail.noItemsDescription')}
              />
            ) : (
              <div className="space-y-10">
                {/* PRODUCTS / SERVICES GRID */}
                {filteredProducts.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={{ ...product, store }} />
                    ))}
                  </div>
                )}

                {/* JOBS SECTION IF ACTIVE TAB IS ALL */}
                {activeTab === 'all' && filteredJobs.length > 0 && (
                  <Reveal as="section" className="border-t border-neutral-100 pt-8">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-neutral-800">
                        {t('storeDetail.jobsFromStore', { name: store.name, count: filteredJobs.length })}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {filteredJobs.map((job) => (
                        <JobCard key={job.id} job={{ ...job, store }} />
                      ))}
                    </div>
                  </Reveal>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
