import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../../lib/api'
import Spinner from '../../components/Spinner'

export default function AdminDashboard() {
  const { t } = useTranslation()
  const [stats, setStats] = useState(null)
  const [pendingStores, setPendingStores] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = () => {
    setLoading(true)
    Promise.all([
      api.get('/admin/stats'),
      api.get('/admin/stores', { params: { status: 'pending', page: 1 } }),
    ])
      .then(([statsRes, pendingRes]) => {
        setStats(statsRes.data)
        setPendingStores(pendingRes.data.data || [])
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleApprove = async (id) => {
    await api.put(`/admin/stores/${id}/approve`)
    loadData()
  }

  const handleReject = async (id) => {
    const reason = window.prompt(t('storeDetail.rejectReasonPrompt')) || ''
    await api.put(`/admin/stores/${id}/reject`, { reason })
    loadData()
  }

  if (loading) return <Spinner />

  return (
    <div className="space-y-8">
      {/* HEADER GREETING */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl">{t('adminLayout.dashboard')}</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {t('adminDashboard.subtitle')}
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          className="flex w-fit items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 shadow-sm transition hover:bg-neutral-50 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          {t('adminDashboard.refresh')}
        </button>
      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* TOTAL STORES */}
        <Link
          to="/admin/boutiques"
          className="group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">{t('adminDashboard.totalStores')}</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 transition group-hover:bg-makitii-green-light group-hover:text-makitii-green-dark">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72m-13.5 8.65h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-neutral-900">{stats?.stores_total || 0}</p>
          <p className="mt-2 text-xs font-medium text-neutral-500">
            {t('adminDashboard.activeRejected', { active: stats?.stores_approved || 0, rejected: stats?.stores_rejected || 0 })}
          </p>
        </Link>

        {/* PENDING APPROVAL */}
        <Link
          to="/admin/boutiques?status=pending"
          className={`group relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
            (stats?.stores_pending || 0) > 0
              ? 'border-amber-300 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white'
              : 'border-neutral-200/80 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">{t('adminDashboard.pendingApproval')}</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-amber-900">{stats?.stores_pending || 0}</p>
          <p className="mt-2 text-xs font-semibold text-amber-700">
            {(stats?.stores_pending || 0) > 0 ? t('adminDashboard.actionRequired') : t('adminDashboard.noRequestsPending')}
          </p>
        </Link>

        {/* ACTIVE PRODUCTS */}
        <Link
          to="/admin/produits"
          className="group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">{t('adminLayout.productCatalog')}</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 transition group-hover:bg-makitii-green-light group-hover:text-makitii-green-dark">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-neutral-900">{stats?.products_active || stats?.products_total || 0}</p>
          <p className="mt-2 text-xs font-medium text-neutral-500">
            {t('adminDashboard.categoriesRegistered', { count: stats?.categories_total || 0 })}
          </p>
        </Link>
      </div>

      {/* PENDING STORES SECTION (Direct review on dashboard) */}
      <div className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 rounded-full bg-amber-500" />
            <h2 className="text-base font-bold text-neutral-800">
              {t('adminDashboard.pendingStoreRequests', { count: pendingStores.length })}
            </h2>
          </div>
          <Link
            to="/admin/boutiques?status=pending"
            className="text-xs font-semibold text-makitii-green hover:underline"
          >
            {t('adminDashboard.seeAll')} →
          </Link>
        </div>

        <div className="p-6">
          {pendingStores.length === 0 ? (
            <div className="py-8 text-center text-sm text-neutral-400">
              🎉 {t('adminDashboard.allReviewed')}
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {pendingStores.slice(0, 4).map((store) => (
                <div key={store.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-makitii-green to-makitii-green-dark text-lg font-black text-white shadow-sm">
                      {store.name?.[0]?.toUpperCase() || 'M'}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800">{store.name}</h3>
                      <p className="text-xs text-neutral-500">
                        {store.owner?.name} ({store.owner?.email}) · {store.city || t('jobCard.defaultCountry')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center">
                    <Link
                      to={`/boutiques/${store.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:border-makitii-green hover:text-makitii-green"
                    >
                      {t('adminDashboard.view')} ↗
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleApprove(store.id)}
                      className="rounded-xl bg-makitii-green px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-makitii-green-dark active:scale-95"
                    >
                      ✓ {t('adminStores.approve')}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(store.id)}
                      className="rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-red-50 hover:text-makitii-red"
                    >
                      {t('storeDetail.reject')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QUICK SHORTCUTS */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          to="/admin/boutiques"
          className="flex items-center gap-3.5 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm transition hover:border-makitii-green hover:bg-neutral-50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            🏬
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-800">{t('adminDashboard.manageStores')}</h4>
            <p className="text-[11px] text-neutral-400">{t('adminDashboard.manageStoresDescription')}</p>
          </div>
        </Link>

        <Link
          to="/admin/categories"
          className="flex items-center gap-3.5 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm transition hover:border-makitii-green hover:bg-neutral-50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            🏷️
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-800">{t('adminDashboard.manageCategories')}</h4>
            <p className="text-[11px] text-neutral-400">{t('adminDashboard.manageCategoriesDescription')}</p>
          </div>
        </Link>

        <Link
          to="/admin/produits"
          className="flex items-center gap-3.5 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm transition hover:border-makitii-green hover:bg-neutral-50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
            📦
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-800">{t('adminDashboard.globalCatalog')}</h4>
            <p className="text-[11px] text-neutral-400">{t('adminDashboard.globalCatalogDescription')}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
