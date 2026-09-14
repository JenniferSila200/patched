export function Shape({ type, color, className = '' }) {
  const common = {
    fill: color,
    className: `glow ${className}`,
  }

  if (type === 'star') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
        <path {...common} d="M24 2 29.4 18.6 46 24 29.4 29.4 24 46 18.6 29.4 2 24 18.6 18.6Z" />
      </svg>
    )
  }
  if (type === 'circle') {
    return (
      <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
        <circle {...common} cx="21" cy="21" r="16" />
      </svg>
    )
  }
  if (type === 'wave') {
    return (
      <svg width="72" height="28" viewBox="0 0 72 28" aria-hidden="true">
        <path
          {...common}
          d="M4 18c8-12 12-12 20 0s12 12 20 0 12-12 20 0"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (type === 'bang') {
    return (
      <svg width="22" height="52" viewBox="0 0 22 52" aria-hidden="true">
        <rect {...common} x="7" y="0" width="8" height="34" rx="4" />
        <circle {...common} cx="11" cy="46" r="5.5" />
      </svg>
    )
  }
  return (
    <svg width="18" height="52" viewBox="0 0 18 52" aria-hidden="true">
      <rect {...common} x="3" y="0" width="12" height="52" rx="6" />
    </svg>
  )
}

export function IconStick() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M20 4 24 16 36 20 24 24 20 36 16 24 4 20 16 16Z" />
    </svg>
  )
}

export function IconIron() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 22c8-12 12-12 16 0s12 12 16 0" strokeLinecap="round" />
    </svg>
  )
}

export function IconRepeat() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M10 18a10 10 0 0 1 16-7l2 2" strokeLinecap="round" />
      <path d="M30 22a10 10 0 0 1-16 7l-2-2" strokeLinecap="round" />
      <path d="M26 8h6v6M8 26v6h6" strokeLinecap="round" />
    </svg>
  )
}
