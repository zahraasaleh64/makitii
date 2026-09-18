import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import api from '../lib/api'
import logo from '../assets/logo.svg'
import LanguageSwitcher from './LanguageSwitcher'

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition hover:text-makitii-green ${isActive ? 'text-makitii-green' : 'text-neutral-600'}`

export default function Navbar() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data.data || [])).catch(() => {})
  }, [])

  const handleLogout = async () => {
    await logout()
    setOpen(false)
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (categoryId) params.set('category_id', categoryId)
    navigate(`/produits${params.toString() ? `?${params.toString()}` : ''}`)
    setOpen(false)
  }

  const dashboardLink = user?.role === 'admin' ? '/admin' : '/tableau-de-bord'
  const postAdLink = !user ? '/devenir-vendeur' : user.role === 'vendor' ? '/tableau-de-bord/produits/nouveau' : '/tableau-de-bord'
  const quickCategories = categories.slice(0, 4)

  return (
    <>
      {/* TOPBAR — dark utility bar, hidden on scroll */}
      <div className="hidden bg-makitii-ink text-neutral-300 md:block">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-2 text-sm">
          <p className="shrink-0 text-xs text-neutral-400">
            {t('navbar.tagline')} <span className="font-semibold text-white">{t('navbar.taglineHighlight')}</span>.
          </p>

          <form onSubmit={handleSearch} className="ml-auto flex max-w-md flex-1 items-stretch overflow-hidden rounded-md border border-white/10 bg-white/5">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('common.searchPlaceholder')}
              className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder:text-neutral-400 outline-none"
            />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="shrink-0 border-x border-white/10 bg-transparent px-2 text-xs text-neutral-300 outline-none"
            >
              <option value="" className="text-neutral-900">{t('common.allCategories')}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id} className="text-neutral-900">{c.name}</option>
              ))}
            </select>
            <button type="submit" className="shrink-0 bg-white px-3 text-xs font-semibold text-makitii-ink transition hover:bg-neutral-200">
              {t('common.search')}
            </button>
          </form>

          <div className="flex shrink-0 items-center gap-4 text-xs font-medium">
            {user ? (
              <>
                <Link to={dashboardLink} className="transition hover:text-white">
                  {user.role === 'admin' ? t('navbar.administration') : t('navbar.myDashboard')}
                </Link>
                <button type="button" onClick={handleLogout} className="transition hover:text-white">
                  {t('navbar.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/connexion" className="transition hover:text-white">{t('navbar.login')}</Link>
                <Link to="/devenir-vendeur" className="transition hover:text-white">{t('navbar.signUp')}</Link>
              </>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* HEADER — always visible */}
      <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white shadow-[0_2px_14px_rgba(0,0,0,0.09)]">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-4 py-3">
          <Link to="/" className="flex shrink-0 items-center gap-2 transition hover:opacity-80">
            <img src={logo} alt="Makitii" className="h-10 w-auto" />
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            <Link to="/produits" className="text-[14.5px] font-medium text-neutral-600 transition hover:text-makitii-green">
              {t('common.allCategories')}
            </Link>
            {quickCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/produits?category_id=${cat.id}`}
                className="text-[14.5px] font-medium text-neutral-600 transition hover:text-makitii-green"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="ml-auto hidden max-w-xs flex-1 items-center rounded-md border border-neutral-200 bg-neutral-50 px-3 sm:flex">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('common.searchPlaceholder')}
              className="w-full bg-transparent px-2 py-2 text-sm outline-none"
            />
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:ml-0">
            <Link
              to={postAdLink}
              className="hidden items-center gap-1.5 rounded-md bg-makitii-green px-[22px] py-[11px] text-sm font-medium text-white shadow-sm transition hover:bg-makitii-green-dark active:scale-[0.98] sm:inline-flex"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
              {t('navbar.postAd')}
            </Link>
            <Link
              to={postAdLink}
              aria-label={t('navbar.postAd')}
              className="flex h-10 w-10 items-center justify-center rounded-md bg-makitii-green text-white shadow-sm transition hover:bg-makitii-green-dark active:scale-95 sm:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50"
              onClick={() => setOpen((v) => !v)}
              aria-label={t('navbar.openMenu')}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* SEARCH — mobile only */}
        <form onSubmit={handleSearch} className="border-t border-neutral-100 px-4 py-2.5 sm:hidden">
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('common.searchPlaceholder')}
              className="w-full rounded-md border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-makitii-green focus:bg-white focus:ring-2 focus:ring-makitii-green/20"
            />
          </div>
        </form>

        {open && (
          <div className="border-t border-neutral-100 bg-white px-4 py-4">
            <div className="mx-auto flex max-w-6xl flex-col gap-3">
              <NavLink to="/" className={navLinkClass} end onClick={() => setOpen(false)}>
                {t('navbar.home')}
              </NavLink>
              <NavLink to="/produits" className={navLinkClass} onClick={() => setOpen(false)}>
                {t('navbar.allListings')}
              </NavLink>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/produits?category_id=${cat.id}`}
                  className="text-sm font-medium text-neutral-600 transition hover:text-makitii-green"
                  onClick={() => setOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <hr className="border-neutral-100" />
              <NavLink to="/boutiques" className={navLinkClass} onClick={() => setOpen(false)}>
                {t('navbar.stores')}
              </NavLink>
              <NavLink to="/emplois" className={navLinkClass} onClick={() => setOpen(false)}>
                {t('navbar.jobs')}
              </NavLink>
              <NavLink to="/a-propos" className={navLinkClass} onClick={() => setOpen(false)}>
                {t('navbar.about')}
              </NavLink>
              <NavLink to="/contact" className={navLinkClass} onClick={() => setOpen(false)}>
                {t('navbar.contact')}
              </NavLink>

              <hr className="border-neutral-100" />

              {user ? (
                <>
                  <Link to={dashboardLink} className="text-sm font-medium text-neutral-600" onClick={() => setOpen(false)}>
                    {user.role === 'admin' ? t('navbar.administration') : t('navbar.myDashboard')}
                  </Link>
                  <button type="button" onClick={handleLogout} className="text-left text-sm font-medium text-makitii-red">
                    {t('navbar.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/connexion" className="text-sm font-medium text-neutral-600" onClick={() => setOpen(false)}>
                    {t('navbar.login')}
                  </Link>
                  <Link
                    to="/devenir-vendeur"
                    className="w-fit rounded-md bg-makitii-green px-4 py-2 text-sm font-semibold text-white"
                    onClick={() => setOpen(false)}
                  >
                    {t('navbar.becomeVendor')}
                  </Link>
                </>
              )}
              <div className="pt-1">
                <LanguageSwitcher className="!border-neutral-200 !text-neutral-500 [&_button]:!text-neutral-500 [&_button[aria-pressed=true]]:!bg-makitii-ink [&_button[aria-pressed=true]]:!text-white" />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
