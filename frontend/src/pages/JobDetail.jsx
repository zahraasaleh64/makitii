import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../lib/api'
import Spinner from '../components/Spinner'
import EmptyState from '../components/EmptyState'
import WhatsAppButton from '../components/WhatsAppButton'

export default function JobDetail() {
  const { t } = useTranslation()
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    api
      .get(`/jobs/${id}`)
      .then((res) => setJob(res.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Spinner />

  if (error || !job) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          title={t('jobDetail.notFoundTitle')}
          description={t('jobDetail.notFoundDescription')}
          action={
            <Link to="/emplois" className="text-sm font-semibold text-makitii-green hover:underline">
              ← {t('jobDetail.backToJobs')}
            </Link>
          }
        />
      </div>
    )
  }

  const store = job.store
  const whatsappMessage = t('jobDetail.whatsappMessage', { storeName: store?.name || '', jobTitle: job.title })

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-6 text-sm text-neutral-400">
        <Link to="/emplois" className="hover:text-makitii-green">{t('navbar.jobs')}</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-600">{job.title}</span>
      </nav>

      <div className="rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          {job.contract_type && (
            <span className="rounded-full bg-makitii-green-light px-3 py-1 text-xs font-medium text-makitii-green-dark">
              {job.contract_type}
            </span>
          )}
          {job.location && (
            <span className="text-sm text-neutral-500">📍 {job.location}</span>
          )}
        </div>

        <h1 className="mt-3 text-2xl font-bold text-neutral-800 sm:text-3xl">{job.title}</h1>

        {store && (
          <Link
            to={`/boutiques/${store.slug}`}
            className="mt-5 flex items-center gap-3 rounded-xl border border-neutral-100 p-3 transition hover:border-makitii-green"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-makitii-green to-makitii-green-dark text-lg font-black text-white shadow-sm">
              {store.logo_url ? (
                <img src={store.logo_url} alt={store.name} className="h-full w-full object-cover" />
              ) : (
                <span>{store.name?.[0]?.toUpperCase() || 'M'}</span>
              )}
            </div>
            <div>
              <p className="text-sm text-neutral-400">{t('jobDetail.postedBy')}</p>
              <p className="font-semibold text-neutral-800">{store.name}</p>
            </div>
          </Link>
        )}

        <p className="mt-6 whitespace-pre-line text-neutral-600">{job.description}</p>

        <div className="mt-8">
          <WhatsAppButton number={store?.whatsapp_number || store?.phone} message={whatsappMessage} fullWidth>
            {t('jobDetail.applyOnWhatsApp')}
          </WhatsAppButton>
          <p className="mt-2 text-center text-xs text-neutral-400">
            {t('jobDetail.redirectNotice', { name: store?.name })}
          </p>
        </div>
      </div>
    </div>
  )
}
