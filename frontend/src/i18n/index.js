import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import fr from './locales/fr.json'

const STORAGE_KEY = 'makitii_lang'

const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
const browserLang = typeof navigator !== 'undefined' ? navigator.language?.slice(0, 2) : 'fr'
const initialLang = stored || (browserLang === 'en' ? 'en' : 'fr')

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: initialLang,
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (lng) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, lng)
    document.documentElement.lang = lng
  } catch {
    // ignore storage errors
  }
})

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLang
}

export default i18n
