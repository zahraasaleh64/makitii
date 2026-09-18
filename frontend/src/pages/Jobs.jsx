import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../lib/api'
import JobCard from '../components/JobCard'
import Pagination from '../components/Pagination'
import Spinner from '../components/Spinner'
import EmptyState from '../components/EmptyState'

export default function Jobs() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [jobs, setJobs] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const page = Number(searchParams.get('page') || 1)

  useEffect(() => {
    setLoading(true)
    const params = { page }
    if (searchParams.get('search')) params.search = searchParams.get('search')

    api
      .get('/jobs', { params })
      .then((res) => {
        setJobs(res.data.data)
        setMeta(res.data.meta)
      })
      .finally(() => setLoading(false))
  }, [page, searchParams])

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">{t('jobsPage.title')}</h1>
        <p className="mt-1 text-neutral-500">
          {t('jobsPage.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSearchSubmit} className="mb-8 flex gap-2">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('jobsPage.searchPlaceholder')}
          className="w-full max-w-md rounded-full border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-makitii-green"
        />
        <button
          type="submit"
          className="rounded-full bg-makitii-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-makitii-green-dark"
        >
          {t('common.search')}
        </button>
      </form>

      {loading ? (
        <Spinner />
      ) : jobs.length === 0 ? (
        <EmptyState
          title={t('jobsPage.emptyTitle')}
          description={t('jobsPage.emptyDescription')}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <Pagination meta={meta} onPageChange={(p) => updateParams({ page: p })} />
        </>
      )}
    </div>
  )
}
