import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'

function formatPrice(val) {
  return new Intl.NumberFormat('fr-FR').format(val || 0)
}

export default function FloatingCart() {
  const { t } = useTranslation()
  const { totalItems, totalPrice, openCart, addedNotice, setAddedNotice } = useCart()

  return (
    <>
      {/* TOAST NOTIFICATION ON ADD TO CART */}
      {addedNotice && (
        <div className="fixed bottom-24 right-4 z-40 max-w-sm rounded-2xl border border-makitii-green/20 bg-white p-4 shadow-2xl backdrop-blur-md animate-slide-up sm:bottom-6 sm:right-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-makitii-green text-white">
              ✓
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-neutral-800">{t('floatingCart.addedToCart')}</h4>
              <p className="line-clamp-1 text-xs text-neutral-500">{addedNotice.name}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAddedNotice(null)
                    openCart()
                  }}
                  className="rounded-full bg-makitii-green px-3 py-1 text-[11px] font-bold text-white shadow-sm transition hover:bg-makitii-green-dark"
                >
                  {t('floatingCart.viewMyCart', { count: totalItems })} →
                </button>
                <button
                  type="button"
                  onClick={() => setAddedNotice(null)}
                  className="text-[11px] text-neutral-400 hover:text-neutral-700"
                >
                  {t('floatingCart.continue')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING CART BUTTON (visible when cart has items) */}
      {totalItems > 0 && (
        <button
          type="button"
          onClick={openCart}
          aria-label={t('floatingCart.openCart')}
          className="fixed bottom-6 right-4 z-40 flex items-center gap-2.5 rounded-full bg-neutral-900 px-4 py-3 text-white shadow-2xl ring-2 ring-white/40 backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-neutral-800 active:scale-95 sm:bottom-6 sm:right-6"
        >
          <div className="relative flex items-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-makitii-yellow" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="absolute -right-2 -top-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-makitii-green px-1 text-[10px] font-extrabold text-white shadow">
              {totalItems}
            </span>
          </div>
          <div className="text-left text-xs">
            <p className="font-bold leading-none text-white">{t('floatingCart.cart')}</p>
            <p className="text-[10px] font-medium text-neutral-300 leading-tight mt-0.5">
              {formatPrice(totalPrice)} GNF
            </p>
          </div>
        </button>
      )}
    </>
  )
}
