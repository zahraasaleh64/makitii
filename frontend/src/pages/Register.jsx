import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import api, { getErrorMessage } from '../lib/api'
import logo from '../assets/logo.png'

const initialState = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  phone: '',
  store_type: 'business',
  store_name: '',
  category_id: '',
  whatsapp_number: '',
  city: '',
  address: '',
  description: '',
}

export default function Register() {
  const { t } = useTranslation()
  const { register } = useAuth()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data.data))
  }, [])

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.password_confirmation) {
      setError(t('register.passwordMismatch'))
      return
    }

    setSubmitting(true)
    try {
      await register({
        ...form,
        category_id: form.category_id || null,
      })
      navigate('/tableau-de-bord', { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, t('register.registrationFailed')))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 flex flex-col items-center text-center">
        <Link to="/">
          <img src={logo} alt="Makitii" className="h-12 w-auto" />
        </Link>
        <h1 className="mt-6 text-xl font-bold text-neutral-800">{t('register.title')}</h1>
        <p className="mt-1 max-w-md text-sm text-neutral-500">
          {t('register.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
        {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-makitii-red">{error}</div>}

        <fieldset className="space-y-4">
          <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-makitii-green-dark">
            {t('register.profileType')}
          </legend>

          <div className="grid gap-3 sm:grid-cols-2">
            <label
              className={`flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-4 transition ${
                form.store_type === 'business' ? 'border-makitii-green bg-makitii-green-light/40' : 'border-neutral-200'
              }`}
            >
              <span className="flex items-center gap-2 font-semibold text-neutral-800">
                <input
                  type="radio"
                  name="store_type"
                  value="business"
                  checked={form.store_type === 'business'}
                  onChange={update('store_type')}
                  className="h-4 w-4 text-makitii-green focus:ring-makitii-green"
                />
                {t('register.storeOrBusiness')}
              </span>
              <span className="text-xs text-neutral-500">{t('register.storeOrBusinessDescription')}</span>
            </label>

            <label
              className={`flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-4 transition ${
                form.store_type === 'individual' ? 'border-makitii-green bg-makitii-green-light/40' : 'border-neutral-200'
              }`}
            >
              <span className="flex items-center gap-2 font-semibold text-neutral-800">
                <input
                  type="radio"
                  name="store_type"
                  value="individual"
                  checked={form.store_type === 'individual'}
                  onChange={update('store_type')}
                  className="h-4 w-4 text-makitii-green focus:ring-makitii-green"
                />
                {t('register.individualOrProvider')}
              </span>
              <span className="text-xs text-neutral-500">{t('register.individualOrProviderDescription')}</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-makitii-green-dark">
            {t('register.yourInformation')}
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t('register.fullName')} required value={form.name} onChange={update('name')} />
            <Field label={t('register.phone')} value={form.phone} onChange={update('phone')} placeholder="+224 6XX XX XX XX" />
          </div>

          <Field type="email" label={t('login.emailLabel')} required value={form.email} onChange={update('email')} />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field type="password" label={t('login.passwordLabel')} required value={form.password} onChange={update('password')} />
            <Field
              type="password"
              label={t('register.confirmPassword')}
              required
              value={form.password_confirmation}
              onChange={update('password_confirmation')}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-makitii-green-dark">
            {form.store_type === 'individual' ? t('register.yourActivity') : t('register.yourStore')}
          </legend>

          <Field
            label={form.store_type === 'individual' ? t('register.activityName') : t('register.storeName')}
            required
            value={form.store_name}
            onChange={update('store_name')}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">{t('register.category')}</label>
              <select
                value={form.category_id}
                onChange={update('category_id')}
                className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-makitii-green"
              >
                <option value="">{t('register.select')}</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <Field
              label={t('register.whatsappNumber')}
              required
              value={form.whatsapp_number}
              onChange={update('whatsapp_number')}
              placeholder="+224 6XX XX XX XX"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t('register.city')} value={form.city} onChange={update('city')} />
            <Field label={t('register.address')} value={form.address} onChange={update('address')} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">{t('register.description')}</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={update('description')}
              className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-makitii-green"
              placeholder={t('register.descriptionPlaceholder')}
            />
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-makitii-green py-3 font-semibold text-white transition hover:bg-makitii-green-dark disabled:opacity-60"
        >
          {submitting ? t('register.creating') : form.store_type === 'individual' ? t('register.createMyProfile') : t('register.createMyStore')}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        {t('register.alreadyRegistered')}{' '}
        <Link to="/connexion" className="font-semibold text-makitii-green hover:underline">
          {t('register.logIn')}
        </Link>
      </p>
    </div>
  )
}

function Field({ label, type = 'text', required, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-neutral-700">
        {label} {required && <span className="text-makitii-red">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-makitii-green"
      />
    </div>
  )
}
