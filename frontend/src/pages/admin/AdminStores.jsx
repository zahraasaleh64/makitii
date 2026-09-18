import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../../lib/api'
import Spinner from '../../components/Spinner'
import EmptyState from '../../components/EmptyState'
import StatusBadge from '../../components/StatusBadge'
import Pagination from '../../components/Pagination'

export default function AdminStores() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const status = searchParams.get('status') || ''
  const page = Number(searchParams.get('page') || 1)

  const TABS = [
    { key: '', label: t('adminStores.tabAll') },
    { key: 'pending', label: t('common.status.pending') },
    { key: 'approved', label: t('common.status.approved') },
    { key: 'rejected', label: t('common.status.rejected') },
  ]

  const [stores, setStores] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    const params = { page }
    if (status) params.status = status
    api.get('/admin/stores', { params }).then((res) => {
      setStores(res.data.data)
      setMeta(res.data.meta)
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page])

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) next.delete(key)
      else next.set(key, value)
    })
    if (!('page' in updates)) next.delete('page')
    setSearchParams(next)
  }

  const handleApprove = async (id) => {
    await api.put(`/admin/stores/${id}/approve`)
    load()
  }

  const handleReject = async (id) => {
    const reason = window.prompt(t('storeDetail.rejectReasonPrompt')) || ''
    await api.put(`/admin/stores/${id}/reject`, { reason })
    load()
  }

  const handleDelete = async (id) => {
    if (!window.confirm(t('adminStores.confirmDelete'))) return
    await api.delete(`/admin/stores/${id}`)
    load()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-800">{t('navbar.stores')}</h1>

      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => updateParams({ status: tab.key })}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              status === tab.key
                ? 'bg-makitii-green text-white'
                : 'bg-white text-neutral-600 ring-1 ring-neutral-200 hover:ring-makitii-green'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner />
      ) : stores.length === 0 ? (
        <EmptyState title={t('adminStores.noStores')} description={t('adminStores.noStoresMatch')} />
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-neutral-100 bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
                <tr>
                  <th className="px-4 py-3">{t('cart.store')}</th>
                  <th className="px-4 py-3">{t('adminStores.owner')}</th>
                  <th className="px-4 py-3">{t('adminLayout.productCatalog')}</th>
                  <th className="px-4 py-3">{t('adminStores.status')}</th>
                  <th className="px-4 py-3 text-right">{t('adminStores.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {stores.map((store) => (
                  <tr key={store.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-neutral-800">{store.name}</p>
                      <p className="text-xs text-neutral-400">
                        {store.type === 'individual' ? t('adminStores.individual') : t('adminStores.business')}
                        {store.city ? ` · ${store.city}` : ''}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      <p>{store.owner?.name}</p>
                      <p className="text-xs text-neutral-400">{store.owner?.email}</p>
                    </td>
                    <td className="px-4 py-3">{store.products_count}</td>
                    <td className="px-4 py-3"><StatusBadge status={store.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap justify-end gap-3">
                        {store.status !== 'approved' && (
                          <button type="button" onClick={() => handleApprove(store.id)} className="font-semibold text-makitii-green hover:underline">
                            {t('adminStores.approve')}
                          </button>
                        )}
                        {store.status !== 'rejected' && (
                          <button type="button" onClick={() => handleReject(store.id)} className="font-semibold text-amber-600 hover:underline">
                            {t('storeDetail.reject')}
                          </button>
                        )}
                        <Link
                          to={`/boutiques/${store.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-neutral-600 hover:text-makitii-green hover:underline"
                        >
                          {t('adminDashboard.view')} ↗
                        </Link>
                        <button type="button" onClick={() => handleDelete(store.id)} className="font-semibold text-makitii-red hover:underline">
                          {t('common.delete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination meta={meta} onPageChange={(p) => updateParams({ page: p })} />
        </>
      )}
    </div>
  )
}
