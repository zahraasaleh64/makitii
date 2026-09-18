import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.svg'

export default function DashboardHeader({ title, subtitle, onToggleMobileMenu, isVendor = false }) {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/connexion')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Left: Brand + Mobile Toggle + Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label={t('dashboardHeader.openNavMenu')}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-2.5">
            <Link to={isVendor ? '/tableau-de-bord' : '/admin'} className="flex items-center gap-2 transition hover:opacity-90">
              <img src={logo} alt="Makitii" className="h-8 w-auto sm:h-9" />
            </Link>
            <span
              className={`hidden sm:inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ring-1 ${
                isVendor
                  ? 'bg-amber-50 text-amber-800 ring-amber-600/20'
                  : 'bg-emerald-50 text-emerald-800 ring-emerald-600/20'
              }`}
            >
              {isVendor ? t('dashboardHeader.vendorSpace') : t('navbar.administration')}
            </span>
          </div>
        </div>

        {/* Right: Public Site Link + User Profile + Logout */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Public Storefront Link */}
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-makitii-green hover:bg-white hover:text-makitii-green sm:px-4 sm:py-2"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-makitii-green" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            <span className="hidden sm:inline">{t('dashboardHeader.viewPublicSite')}</span>
            <span className="sm:hidden">{t('dashboardHeader.site')}</span>
          </Link>

          {/* User info */}
          <div className="hidden items-center gap-2.5 border-l border-neutral-200 pl-3 md:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-makitii-green to-makitii-green-dark text-xs font-black text-white shadow-sm">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="text-left">
              <p className="line-clamp-1 max-w-[130px] text-xs font-bold text-neutral-800">{user?.name}</p>
              <p className="text-[10px] text-neutral-400 capitalize">{user?.role === 'admin' ? t('dashboardHeader.administrator') : t('dashboardHeader.vendor')}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            title={t('dashboardHeader.logOut')}
            className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition hover:bg-red-50 hover:text-makitii-red sm:px-3.5 sm:py-2"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            <span className="hidden sm:inline">{t('navbar.logout')}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
