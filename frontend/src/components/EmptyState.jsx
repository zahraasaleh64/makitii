import { useTranslation } from 'react-i18next'

export default function EmptyState({ title, description, action }) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white/60 px-6 py-16 text-center">
      <h3 className="text-lg font-semibold text-neutral-700">{title || t('emptyState.defaultTitle')}</h3>
      {description && <p className="mt-2 max-w-md text-sm text-neutral-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
