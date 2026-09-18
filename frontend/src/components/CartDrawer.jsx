import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'

function formatPrice(val) {
  const num = Math.round(Number(val) || 0)
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export default function CartDrawer() {
  const { t } = useTranslation()
  const {
    isOpen,
    closeCart,
    totalItems,
    totalPrice,
    cartByStore,
    updateQuantity,
    removeFromCart,
    clearCart,
    clearStoreCart,
    sendStoreOrderWhatsApp,
  } = useCart()

  const [notes, setNotes] = useState({})

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeCart])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const storeIds = Object.keys(cartByStore || {})

  const handleNoteChange = (storeId, value) => {
    setNotes((prev) => ({ ...prev, [storeId]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* BACKDROP */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        aria-hidden="true"
      />

      {/* DRAWER CONTAINER */}
      <div className="fixed inset-y-0 right-0 z-50 flex max-w-full pl-6 sm:pl-10 pointer-events-none">
        <div className="flex h-full w-screen max-w-md flex-col bg-white shadow-2xl pointer-events-auto animate-slide-in-right">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-makitii-green text-white shadow-sm">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-extrabold text-neutral-900">{t('cart.title')}</h2>
                <p className="text-xs text-neutral-500">
                  {t('cart.itemCount', { count: totalItems })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {totalItems > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-full bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-500 transition hover:bg-red-50 hover:text-makitii-red"
                >
                  {t('cart.clearAll')}
                </button>
              )}
              <button
                type="button"
                onClick={closeCart}
                aria-label={t('cart.close')}
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-800"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {totalItems === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-neutral-100 text-neutral-400">
                  <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-bold text-neutral-800">{t('cart.emptyTitle')}</h3>
                <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-neutral-400">
                  {t('cart.emptyDescription')}
                </p>
                <div className="mt-6 flex w-full max-w-xs flex-col gap-2.5">
                  <Link
                    to="/boutiques"
                    onClick={closeCart}
                    className="w-full rounded-full bg-makitii-green py-2.5 text-center text-xs font-bold text-white shadow-sm transition hover:bg-makitii-green-dark"
                  >
                    {t('cart.exploreStores')}
                  </Link>
                  <Link
                    to="/produits"
                    onClick={closeCart}
                    className="w-full rounded-full bg-neutral-100 py-2.5 text-center text-xs font-semibold text-neutral-700 transition hover:bg-neutral-200"
                  >
                    {t('cart.viewAllListings')}
                  </Link>
                </div>
              </div>
            ) : (
              storeIds.map((storeId) => {
                const group = cartByStore[storeId]
                const store = group.store || { name: t('cart.defaultStoreName'), whatsapp_number: '' }
                const currentNote = notes[storeId] || ''

                return (
                  <div
                    key={storeId}
                    className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50/50 shadow-sm"
                  >
                    {/* STORE HEADER */}
                    <div className="flex items-center justify-between border-b border-neutral-200/60 bg-white px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-makitii-green" />
                        <div>
                          <h4 className="text-xs font-bold text-neutral-800 sm:text-sm">
                            {store.name || t('cart.store')}
                          </h4>
                          {store.city && <p className="text-[10px] text-neutral-400">📍 {store.city}</p>}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => clearStoreCart(store.id || storeId)}
                        className="text-[11px] font-medium text-neutral-400 transition hover:text-makitii-red"
                        title={t('cart.clearThisStore')}
                      >
                        {t('cart.clear')}
                      </button>
                    </div>

                    {/* STORE ITEMS */}
                    <div className="divide-y divide-neutral-100 bg-white px-4">
                      {group.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 py-3">
                          {/* Item Thumbnail */}
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                            {item.image_url ? (
                              <img src={item.image_url} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs font-bold text-neutral-300">
                                📦
                              </div>
                            )}
                          </div>

                          {/* Item Details */}
                          <div className="min-w-0 flex-1">
                            <h5 className="line-clamp-1 text-xs font-semibold text-neutral-800">{item.name}</h5>
                            <p className="mt-0.5 text-xs font-bold text-makitii-green-dark">
                              {formatPrice(item.price)} GNF
                            </p>

                            {/* Quantity Controls */}
                            <div className="mt-2 flex items-center gap-2">
                              <div className="flex items-center rounded-lg border border-neutral-200 bg-neutral-50">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                  className="flex h-6 w-6 items-center justify-center text-xs font-bold text-neutral-600 hover:bg-neutral-200 rounded-l-lg"
                                >
                                  −
                                </button>
                                <span className="w-7 text-center text-xs font-bold text-neutral-800">
                                  {item.quantity || 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                  className="flex h-6 w-6 items-center justify-center text-xs font-bold text-neutral-600 hover:bg-neutral-200 rounded-r-lg"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="text-neutral-400 hover:text-makitii-red p-1"
                                title={t('common.delete')}
                              >
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* STORE CHECKOUT BOX */}
                    <div className="border-t border-neutral-200/60 bg-neutral-50 p-3.5 space-y-3">
                      <input
                        type="text"
                        value={currentNote}
                        onChange={(e) => handleNoteChange(storeId, e.target.value)}
                        placeholder={t('cart.notePlaceholder')}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-makitii-green"
                      />

                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-neutral-500">{t('cart.subtotal', { count: group.totalCount })}</span>
                        <span className="font-extrabold text-neutral-900">{formatPrice(group.total)} GNF</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => sendStoreOrderWhatsApp(group, currentNote)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 px-4 text-xs font-bold text-white shadow-sm transition hover:brightness-95 active:scale-[0.98]"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.93 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.69-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.07.18-.28.36-.23.6-.14.24.09 1.55.73 1.82.87.27.14.45.21.51.32.07.12.07.68-.17 1.37Z" />
                        </svg>
                        {t('cart.sendOrderTo', { name: store.name || t('cart.theStore') })}
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* FOOTER */}
          {totalItems > 0 && (
            <div className="border-t border-neutral-100 bg-white p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-neutral-600">{t('cart.grandTotal')}</span>
                <span className="text-base font-extrabold text-makitii-green-dark">
                  {formatPrice(totalPrice)} GNF
                </span>
              </div>
              <p className="text-center text-[11px] text-neutral-400">
                {t('cart.perStoreNotice')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
