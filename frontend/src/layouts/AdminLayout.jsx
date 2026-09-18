import { useState, useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DashboardHeader from '../components/DashboardHeader'
import api from '../lib/api'

export default function AdminLayout() {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)
  const location = useLocation()

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Fetch quick stats for badge
  useEffect(() => {
    api.get('/admin/stats').then((res) => {
      setPendingCount(res.data?.stores_pending || 0)
    }).catch(() => {})
  }, [location.pathname])

  const navItems = [
    {
      to: '/admin',
      end: true,
      label: t('adminLayout.dashboard'),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      ),
    },
    {
      to: '/admin/boutiques',
      label: t('adminLayout.storesAndVendors'),
      badge: pendingCount > 0 ? pendingCount : null,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72m-13.5 8.65h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
        </svg>
      ),
    },
    {
      to: '/admin/categories',
      label: t('productsPage.categories'),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
        </svg>
      ),
    },
    {
      to: '/admin/produits',
      label: t('adminLayout.productCatalog'),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      ),
    },
  ]

  const linkClasses = ({ isActive }) =>
    `flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-makitii-green text-white shadow-sm shadow-makitii-green/20'
        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
    }`

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50/70">
      <DashboardHeader onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)} />

      {/* Main Container */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-6 sm:px-6 lg:px-8">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="sticky top-20 rounded-3xl border border-neutral-200/80 bg-white p-4 shadow-sm">
            <div className="mb-3 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-neutral-400">
              {t('adminLayout.adminMenu')}
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className={linkClasses}>
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-extrabold text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            <hr className="my-4 border-neutral-100" />

            <div className="rounded-2xl bg-neutral-50 p-3 text-xs text-neutral-500">
              <p className="font-bold text-neutral-800">{t('adminLayout.platformName')}</p>
              <p className="mt-0.5 text-[11px] text-neutral-400">{t('adminLayout.versionInfo')}</p>
            </div>
          </div>
        </aside>

        {/* MOBILE SIDEBAR MODAL */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-72 bg-white p-5 shadow-2xl animate-slide-in-right">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <span className="font-bold text-neutral-800">{t('adminLayout.adminNavigation')}</span>
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
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

