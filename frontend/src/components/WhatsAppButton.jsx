import { useTranslation } from 'react-i18next'

function buildWhatsAppLink(number, message) {
  const digitsOnly = (number || '').replace(/[^\d]/g, '')
  const text = encodeURIComponent(message || '')
  return `https://wa.me/${digitsOnly}?text=${text}`
}

export default function WhatsAppButton({ number, message, className = '', children, fullWidth = false }) {
  const { t } = useTranslation()
  if (!number) return null

  return (
    <a
      href={buildWhatsAppLink(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white shadow-sm transition hover:brightness-95 active:scale-[0.98] ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.93 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.69-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.07.18-.28.36-.23.6-.14.24.09 1.55.73 1.82.87.27.14.45.21.51.32.07.12.07.68-.17 1.37Z" />
      </svg>
      <span>{children || t('whatsapp.contactOnWhatsApp')}</span>
    </a>
  )
}

export { buildWhatsAppLink }
