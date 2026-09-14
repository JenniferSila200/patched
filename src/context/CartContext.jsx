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
      const key = `${item.id}-${item.color}-${item.finish}`
      const existing = prev.find((p) => `${p.id}-${p.color}-${p.finish}` === key)
      if (existing) {
        return prev.map((p) =>
          `${p.id}-${p.color}-${p.finish}` === key
            ? { ...p, qty: p.qty + item.qty }
            : p,
        )
      }
      return [...prev, { ...item, lineId: key }]
    })
    setOpen(true)
  }

  const updateQty = (lineId, qty) => {
    setItems((prev) =>
      qty < 1 ? prev.filter((p) => p.lineId !== lineId) : prev.map((p) => (p.lineId === lineId ? { ...p, qty } : p)),
    )
  }

  const removeItem = (lineId) => setItems((prev) => prev.filter((p) => p.lineId !== lineId))
  const clear = () => setItems([])

  const count = items.reduce((n, i) => n + i.qty, 0)
  const total = items.reduce((n, i) => n + i.price * i.qty, 0)

  const value = useMemo(
    () => ({ items, open, setOpen, addItem, updateQty, removeItem, clear, count, total }),
    [items, open],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
