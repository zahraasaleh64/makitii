import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import { getErrorMessage } from '../lib/api'
import logo from '../assets/logo.png'

export default function Login() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const user = await login(form.email, form.password)
      const from = location.state?.from?.pathname
      if (from) {
        navigate(from, { replace: true })
      } else {
        navigate(user.role === 'admin' ? '/admin' : '/tableau-de-bord', { replace: true })
      }
    } catch (err) {
      setError(getErrorMessage(err, t('login.invalidCredentials')))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link to="/">
            <img src={logo} alt="Makitii" className="h-12 w-auto" />
          </Link>
          <h1 className="mt-6 text-xl font-bold text-neutral-800">{t('navbar.login')}</h1>
          <p className="mt-1 text-sm text-neutral-500">{t('login.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-makitii-red">{error}</div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">{t('login.emailLabel')}</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-makitii-green"
              placeholder={t('login.emailPlaceholder')}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">{t('login.passwordLabel')}</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-makitii-green"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-makitii-green py-3 font-semibold text-white transition hover:bg-makitii-green-dark disabled:opacity-60"
          >
            {submitting ? t('login.loggingIn') : t('login.submit')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          {t('login.noStoreYet')}{' '}
          <Link to="/devenir-vendeur" className="font-semibold text-makitii-green hover:underline">
            {t('login.createVendorAccount')}
          </Link>
        </p>
      </div>
    </div>
  )
}
