import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-makitii-green">404</h1>
      <p className="mt-3 text-lg text-neutral-600">{t('notFound.description')}</p>
      <Link to="/" className="mt-6 rounded-full bg-makitii-green px-6 py-3 font-semibold text-white hover:bg-makitii-green-dark">
        {t('errorBoundary.backHome')}
      </Link>
    </div>
  )
}
