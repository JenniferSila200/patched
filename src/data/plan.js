export const PLAN = {
  id: 'patched-monthly',
  name: 'PATCHED. Club',
  price: 16,
  interval: 'month',
  includes: [
    'A new exclusive colour every month',
    'A new sticker set every month',
    'Access to selected limited editions',
    'Subscriber-only early access when a drop is gated',
  ],
}

export function monthKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

export function parseISODate(value) {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatMonth(value) {
  return parseISODate(value).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

export function addMonth(date) {
  const next = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
  return next
}

export function formatDay(value) {
  const date = value instanceof Date ? value : parseISODate(value)
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
