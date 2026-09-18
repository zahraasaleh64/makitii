import { useTranslation } from 'react-i18next'

export default function PriceTag({ price, className = '' }) {
  const { i18n } = useTranslation()
  const locale = i18n.language?.startsWith('en') ? 'en-US' : 'fr-FR'
  const formatted = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(price || 0)
  return (
    <span className={`font-bold text-makitii-green-dark ${className}`}>
      {formatted} <span className="text-sm font-semibold">GNF</span>
    </span>
  )
}
