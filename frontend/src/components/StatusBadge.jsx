import { useTranslation } from 'react-i18next'

const STYLES = {
  pending: 'bg-makitii-yellow/20 text-makitii-yellow-dark',
  approved: 'bg-makitii-green-light text-makitii-green-dark',
  rejected: 'bg-red-50 text-makitii-red',
}

export default function StatusBadge({ status }) {
  const { t } = useTranslation()
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${STYLES[status] || 'bg-neutral-100 text-neutral-600'}`}>
      {t(`common.status.${status}`, status)}
    </span>
  )
}
