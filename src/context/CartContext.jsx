import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'patched-cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (item) => {
    setItems((prev) => {
      const key = item.lineId || `${item.kind || 'item'}-${item.id}-${item.color || ''}-${item.finish || ''}`
      const existing = prev.find((p) => p.lineId === key)
      if (item.kind === 'subscription') {
        if (existing) return prev
        return [...prev, { ...item, qty: 1, lineId: key }]
      }
      if (existing) {
        const nextQty = existing.qty + item.qty
        const capped = item.maxQty != null ? Math.min(nextQty, item.maxQty) : nextQty
        return prev.map((p) => (p.lineId === key ? { ...p, qty: capped } : p))
      }
      return [...prev, { ...item, lineId: key }]
    })
    setOpen(true)
  }

  const updateQty = (lineId, qty) => {
    setItems((prev) =>
      prev.flatMap((p) => {
        if (p.lineId !== lineId) return [p]
        if (qty < 1) return []
        if (p.kind === 'subscription') return [p]
        const capped = p.maxQty != null ? Math.min(qty, p.maxQty) : qty
        return [{ ...p, qty: capped }]
      }),
    )
  }

  const removeItem = (lineId) => setItems((prev) => prev.filter((p) => p.lineId !== lineId))
  const clear = () => setItems([])

  const count = items.reduce((n, i) => n + i.qty, 0)
  const total = items.reduce((n, i) => n + i.price * i.qty, 0)
  const hasSubscriptionItem = items.some((i) => i.kind === 'subscription')

  const value = useMemo(
    () => ({ items, open, setOpen, addItem, updateQty, removeItem, clear, count, total, hasSubscriptionItem }),
    [items, open],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
