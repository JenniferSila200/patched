import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { useStore } from '../context/StoreContext.jsx'

export default function Header() {
  const { count, setOpen } = useCart()
  const { subscription } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = (to) => {
    setMenu(false)
    if (to) navigate(to)
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <button className="icon-btn menu-btn" type="button" onClick={() => setMenu(true)} aria-label="Open menu">
          Menu
        </button>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/drops">Drops</NavLink>
          <NavLink to="/club">Club</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <NavLink to="/" className="logo">
          PATCHED.
        </NavLink>
        <div className="header-actions">
          <NavLink to={subscription ? '/account' : '/community'} className="icon-btn account-link">
            {subscription ? 'Account' : 'Community'}
          </NavLink>
          <button className="icon-btn cart-btn" type="button" onClick={() => setOpen(true)}>
            Bag
            {count > 0 && <span className="cart-count">{count}</span>}
          </button>
        </div>
      </header>
      <div className={`mobile-nav ${menu ? 'open' : ''}`}>
        <button className="icon-btn" type="button" onClick={() => setMenu(false)}>
          Close
        </button>
        <a href="/" onClick={(e) => { e.preventDefault(); close('/') }}>Home</a>
        <a href="/shop" onClick={(e) => { e.preventDefault(); close('/shop') }}>Shop</a>
        <a href="/drops" onClick={(e) => { e.preventDefault(); close('/drops') }}>Drops</a>
        <a href="/club" onClick={(e) => { e.preventDefault(); close('/club') }}>Club</a>
        <a href="/community" onClick={(e) => { e.preventDefault(); close('/community') }}>Community</a>
        <a href="/about" onClick={(e) => { e.preventDefault(); close('/about') }}>About</a>
        {subscription && (
          <a href="/account" onClick={(e) => { e.preventDefault(); close('/account') }}>Account</a>
        )}
      </div>
    </>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <h4>PATCHED.</h4>
          <p>Reflective patches and stickers for everyday movement. Be seen, your way.</p>
        </div>
        <div>
          <h4>Club</h4>
          <p>
            <Link to="/club">Monthly membership</Link><br />
            <Link to="/drops">Drops</Link><br />
            <Link to="/shop">Limited editions</Link>
          </p>
        </div>
        <div>
          <h4>Together</h4>
          <p>
            <Link to="/community">Community</Link><br />
            <Link to="/about">The story</Link><br />
            Stick · Iron on · Repeat
          </p>
        </div>
        <div>
          <h4>City</h4>
          <p>Designed in the city.<br />Ships EU-wide.</p>
        </div>
      </div>
      <div className="wrap legal">
        <span>© {new Date().getFullYear()} PATCHED.</span>
        <span>Be seen, your way.</span>
      </div>
    </footer>
  )
}
