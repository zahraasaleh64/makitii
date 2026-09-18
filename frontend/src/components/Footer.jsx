import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoFull from '../assets/logo-full.svg'
import api from '../lib/api'
import Reveal from './Reveal'

export default function Footer() {
  const { t } = useTranslation()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data.data || [])).catch(() => {})
  }, [])

  return (
    <Reveal as="footer" className="mt-16 border-t border-neutral-100 bg-makitii-ink">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <img src={logoFull} alt="Makitii" className="h-12 w-auto brightness-0 invert" />
            <p className="mt-3 max-w-xs text-sm text-white/60">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">{t('footer.discover')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/produits" className="transition hover:text-makitii-yellow">{t('navbar.allListings')}</Link></li>
              <li><Link to="/boutiques" className="transition hover:text-makitii-yellow">{t('footer.allStores')}</Link></li>
              <li><Link to="/produits?type=service" className="transition hover:text-makitii-yellow">{t('footer.servicesAndFreelance')}</Link></li>
              <li><Link to="/emplois" className="transition hover:text-makitii-yellow">{t('footer.jobOffers')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">{t('footer.popularCategories')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {(categories.length ? categories : []).slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/produits?category_id=${cat.id}`} className="flex items-center gap-1.5 transition hover:text-makitii-yellow">
                    <span aria-hidden="true">→</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Makitii</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/a-propos" className="transition hover:text-makitii-yellow">{t('footer.aboutUs')}</Link></li>
              <li><Link to="/contact" className="transition hover:text-makitii-yellow">{t('footer.contactUs')}</Link></li>
              <li><Link to="/devenir-vendeur" className="transition hover:text-makitii-yellow">{t('navbar.becomeVendor')}</Link></li>
              <li><span className="text-white/40">{t('footer.terms')}</span></li>
              <li><span className="text-white/40">{t('footer.privacy')}</span></li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </Reveal>
  )
}
