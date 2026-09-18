import { useState, useEffect } from 'react'
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DashboardHeader from '../components/DashboardHeader'
import { useAuth } from '../context/AuthContext'
import StatusBadge from '../components/StatusBadge'

export default function VendorLayout() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const store = user?.store
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navItems = [
    {
      to: '/tableau-de-bord',
      end: true,
      label: t('vendorLayout.overview'),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      ),
    },
    {
      to: '/tableau-de-bord/boutique',
      label: t('vendorLayout.myStorefront'),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72m-13.5 8.65h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
        </svg>
      ),
    },
    {
      to: '/tableau-de-bord/produits',
      label: t('vendorLayout.myItemsAndServices'),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      ),
    },
    {
      to: '/tableau-de-bord/emplois',
      label: t('vendorLayout.myJobOffers'),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
        </svg>
      ),
    },
  ]

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-makitii-green text-white shadow-sm shadow-makitii-green/20'
        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
    }`

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50/70">
      <DashboardHeader isVendor={true} onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)} />

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-6 sm:px-6 lg:px-8">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="sticky top-20 rounded-3xl border border-neutral-200/80 bg-white p-4 shadow-sm">
            {/* Store Badge Preview */}
            <div className="mb-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-makitii-green to-makitii-green-dark text-sm font-black text-white shadow-inner">
                  {store?.name?.[0]?.toUpperCase() || 'B'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-neutral-800">{store?.name || t('vendorLayout.myStore')}</p>
                  <div className="mt-1">
                    <StatusBadge status={store?.status || 'pending'} />
                  </div>
                </div>
              </div>

              {store?.slug && store?.status === 'approved' && (
                <Link
                  to={`/boutiques/${store.slug}`}
                  className="mt-2.5 flex items-center justify-center gap-1 rounded-xl bg-white py-1.5 text-[11px] font-bold text-makitii-green shadow-xs transition hover:bg-makitii-green hover:text-white"
                >
                  {t('vendorLayout.viewMyPage')} ↗
                </Link>
              )}
            </div>

            <div className="mb-2 px-3 text-[11px] font-extrabold uppercase tracking-wider text-neutral-400">
              {t('vendorLayout.vendorMenu')}
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className={linkClasses}>
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* MOBILE SIDEBAR */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-72 bg-white p-5 shadow-2xl animate-slide-in-right">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <span className="font-bold text-neutral-800">{t('dashboardHeader.vendorSpace')}</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100"
                >
                  ✕
                </button>
              </div>
              <nav className="mt-4 space-y-1.5">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} end={item.end} className={linkClasses}>
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* MAIN VENDOR CONTENT */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

