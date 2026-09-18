import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../../lib/api'
import Spinner from '../../components/Spinner'
import EmptyState from '../../components/EmptyState'
import PriceTag from '../../components/PriceTag'
import Pagination from '../../components/Pagination'

export default function AdminProducts() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const page = Number(searchParams.get('page') || 1)

  const load = () => {
    setLoading(true)
    const params = { page }
    if (searchParams.get('search')) params.search = searchParams.get('search')
    api.get('/admin/products', { params }).then((res) => {
      setProducts(res.data.data)
      setMeta(res.data.meta)
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchParams])

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) next.delete(key)
      else next.set(key, value)
    })
    if (!('page' in updates)) next.delete('page')
    setSearchParams(next)
  }

  const handleDelete = async (id) => {
    if (!window.confirm(t('adminProducts.confirmDelete'))) return
    await api.delete(`/admin/products/${id}`)
    load()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-800">{t('adminProducts.title')}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateParams({ search })
        }}
        className="flex gap-2"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('adminProducts.searchPlaceholder')}
          className="w-full max-w-sm rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-makitii-green"
        />
        <button type="submit" className="rounded-full bg-makitii-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-makitii-green-dark">
          {t('common.search')}
        </button>
      </form>

      {loading ? (
        <Spinner />
      ) : products.length === 0 ? (
        <EmptyState title={t('adminProducts.noProducts')} />
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-neutral-100 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
                <tr>
                  <th className="px-4 py-3">{t('adminProducts.product')}</th>
                  <th className="px-4 py-3">{t('cart.store')}</th>
                  <th className="px-4 py-3">{t('adminProducts.price')}</th>
                  <th className="px-4 py-3 text-right">{t('adminStores.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3 font-medium text-neutral-800">{product.name}</td>
                    <td className="px-4 py-3 text-neutral-500">{product.store?.name}</td>
                    <td className="px-4 py-3"><PriceTag price={product.price} /></td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" onClick={() => handleDelete(product.id)} className="font-medium text-makitii-red hover:underline">
                        {t('common.delete')}
                      </button>
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
