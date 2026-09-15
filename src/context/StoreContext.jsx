import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products } from '../data/products.js'
import { drops, getCurrentDrop } from '../data/drops.js'
import { PLAN, addMonth } from '../data/plan.js'

const INV_KEY = 'patched-inventory'
const SUB_KEY = 'patched-subscription'
const REV_KEY = 'patched-reviews'
const STORY_KEY = 'patched-stories'

function read(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value ?? fallback
  } catch {
    return fallback
  }
}

function catalogStock() {
  const next = {}
  products.forEach((p) => {
    if (p.stockInitial != null) next[p.id] = p.stockInitial
  })
  drops.forEach((d) => {
    next[d.id] = d.stockInitial
  })
  return next
}

function mergeInventory(saved) {
  const base = catalogStock()
  if (!saved || typeof saved !== 'object') return base
  return { ...base, ...saved }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [inventory, setInventory] = useState(() => mergeInventory(read(INV_KEY, null)))
  const [subscription, setSubscription] = useState(() => read(SUB_KEY, null))
  const [reviews, setReviews] = useState(() => read(REV_KEY, []))
  const [stories, setStories] = useState(() => read(STORY_KEY, []))

  useEffect(() => {
    localStorage.setItem(INV_KEY, JSON.stringify(inventory))
  }, [inventory])
  useEffect(() => {
    localStorage.setItem(SUB_KEY, JSON.stringify(subscription))
  }, [subscription])
  useEffect(() => {
    localStorage.setItem(REV_KEY, JSON.stringify(reviews))
  }, [reviews])
  useEffect(() => {
    localStorage.setItem(STORY_KEY, JSON.stringify(stories))
  }, [stories])

  const stockOf = (id) => (id in inventory ? inventory[id] : null)
  const isSubscriber = subscription?.status === 'active'

  const canAccessLimited = (product, now = new Date()) => {
    if (!product?.earlyAccessUntil) return true
    if (now >= new Date(product.earlyAccessUntil + 'T23:59:59')) return true
    return isSubscriber
  }

  const subscribe = ({ name, email, address, city, postcode }) => {
    const now = new Date()
    const drop = getCurrentDrop(now)
    const alreadyHasThisDrop = subscription?.assignedDropId && drop && subscription.assignedDropId === drop.id
    let assignedDropId = subscription?.assignedDropId || null
    if (!alreadyHasThisDrop && drop && stockOf(drop.id) > 0) {
      assignedDropId = drop.id
      setInventory((prev) => ({ ...prev, [drop.id]: prev[drop.id] - 1 }))
    } else if (alreadyHasThisDrop) {
      assignedDropId = drop.id
    }
    const next = {
      status: 'active',
      planId: PLAN.id,
      price: PLAN.price,
      name,
      email,
      address,
      city,
      postcode,
      startedAt: now.toISOString(),
      cancelledAt: null,
      renewsOn: addMonth(now).toISOString(),
      assignedDropId,
    }
    setSubscription(next)
    return next
  }

  const cancelSubscription = () => {
    setSubscription((prev) =>
      prev
        ? {
            ...prev,
            status: 'cancelled',
            cancelledAt: new Date().toISOString(),
          }
        : prev,
    )
  }

  const reactivateSubscription = () => {
    setSubscription((prev) =>
      prev
        ? {
            ...prev,
            status: 'active',
            cancelledAt: null,
            renewsOn: addMonth(new Date()).toISOString(),
          }
        : prev,
    )
  }

  const decrementStock = (id, qty) => {
    setInventory((prev) => {
      if (prev[id] == null) return prev
      return { ...prev, [id]: Math.max(0, prev[id] - qty) }
    })
  }

  const addReview = (review) => {
    setReviews((prev) => [
      {
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...review,
      },
      ...prev,
    ])
  }

  const addStory = (story) => {
    setStories((prev) => [
      {
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...story,
      },
      ...prev,
    ])
  }

  const reviewsFor = (productId) => reviews.filter((r) => r.productId === productId)

  const value = useMemo(
    () => ({
      inventory,
      stockOf,
      subscription,
      isSubscriber,
      subscribe,
      cancelSubscription,
      reactivateSubscription,
      canAccessLimited,
      decrementStock,
      reviews,
      reviewsFor,
      addReview,
      stories,
      addStory,
    }),
    [inventory, subscription, reviews, stories],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
