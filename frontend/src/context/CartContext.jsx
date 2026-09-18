import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import i18n from '../i18n'

const CartContext = createContext(null)

const CART_STORAGE_KEY = 'makitii_cart_v1'

function formatPrice(val) {
  const num = Math.round(Number(val) || 0)
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function cleanWhatsAppNumber(number) {
  return (number || '').replace(/[^\d]/g, '')
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isOpen, setIsOpen] = useState(false)
  const [addedNotice, setAddedNotice] = useState(null) // Toast notice when item is added

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error('Erreur sauvegarde panier:', e)
    }
  }, [items])

  const addToCart = (product, quantity = 1, fallbackStore = null) => {
    const store = product.store || fallbackStore
    const primaryImage = product.images?.[0]?.url || product.primary_image_url || null

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id)
      if (existingIndex > -1) {
        const next = [...prevItems]
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        }
        return next
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            type: product.type || 'product',
            image_url: primaryImage,
            store: store
              ? {
                  id: store.id,
                  name: store.name,
                  slug: store.slug,
                  whatsapp_number: store.whatsapp_number || store.phone || '',
                  city: store.city || '',
                }
              : null,
            quantity: Math.max(1, quantity),
          },
        ]
      }
    })

    // Show temporary banner / notice
    setAddedNotice({
      name: product.name,
      storeName: store?.name || i18n.t('cart.store'),
      quantity,
    })
    setTimeout(() => {
      setAddedNotice(null)
    }, 3500)
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    )
  }

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setItems([])
  }

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const toggleCart = () => setIsOpen((v) => !v)

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
  }, [items])

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0)
  }, [items])

  // Group cart items by store safely
  const cartByStore = useMemo(() => {
    const groups = {}
    items.forEach((item) => {
      const storeId = item.store?.id ? String(item.store.id) : 'default'
      if (!groups[storeId]) {
        groups[storeId] = {
          store: item.store || { id: 'default', name: i18n.t('cart.defaultStoreName'), whatsapp_number: '' },
          items: [],
          total: 0,
          totalCount: 0,
        }
      }
      const qty = Number(item.quantity) || 1
      const prc = Number(item.price) || 0
      groups[storeId].items.push(item)
      groups[storeId].total += prc * qty
      groups[storeId].totalCount += qty
    })
    return groups
  }, [items])

  const clearStoreCart = (storeId) => {
    setItems((prev) =>
      prev.filter((item) => {
        const itemStoreId = item.store?.id ? String(item.store.id) : 'default'
        return itemStoreId !== String(storeId)
      })
    )
  }

  const sendStoreOrderWhatsApp = (storeGroup, note = '') => {
    const { store, items, total, totalCount } = storeGroup
    const number = cleanWhatsAppNumber(store?.whatsapp_number || store?.phone)

    if (!number) {
      alert(i18n.t('cart.whatsappNumberMissing', { name: store?.name || i18n.t('cart.theStore') }))
      return
    }

    const lines = [
      i18n.t('cart.waGreeting', { name: store?.name || i18n.t('cart.theStore') }),
      i18n.t('cart.waIntro'),
      '',
      i18n.t('cart.waOrderHeading', { count: totalCount }),
      ...items.map(
        (it) => `- *${it.quantity}x* ${it.name} : ${formatPrice(Number(it.price) * Number(it.quantity))} GNF`
      ),
      '',
      i18n.t('cart.waTotal', { total: formatPrice(total) }),
    ]

    if (note && note.trim()) {
      lines.push('', i18n.t('cart.waNote', { note: note.trim() }))
    }

    lines.push('', i18n.t('cart.waClosing'))

    const message = lines.join('\n')
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        cartByStore,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        clearStoreCart,
        sendStoreOrderWhatsApp,
        addedNotice,
        setAddedNotice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
