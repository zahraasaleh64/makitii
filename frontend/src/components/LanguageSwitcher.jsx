import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher({ className = '' }) {
  const { i18n } = useTranslation()
  const current = i18n.language?.startsWith('en') ? 'en' : 'fr'

  const switchTo = (lng) => {
    if (lng !== current) i18n.changeLanguage(lng)
  }

  return (
    <div className={`inline-flex shrink-0 items-center overflow-hidden rounded-md border border-white/10 text-xs font-semibold ${className}`}>
      <button
        type="button"
        onClick={() => switchTo('fr')}
        aria-pressed={current === 'fr'}
        className={`px-2 py-1 transition ${current === 'fr' ? 'bg-white text-makitii-ink' : 'text-neutral-300 hover:text-white'}`}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => switchTo('en')}
        aria-pressed={current === 'en'}
        className={`px-2 py-1 transition ${current === 'en' ? 'bg-white text-makitii-ink' : 'text-neutral-300 hover:text-white'}`}
      >
        EN
      </button>
    </div>
  )
}
