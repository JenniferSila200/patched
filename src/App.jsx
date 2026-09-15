import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { StoreProvider } from './context/StoreContext.jsx'
import Header, { Footer } from './components/Header.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Product from './pages/Product.jsx'
import About from './pages/About.jsx'
import Checkout from './pages/Checkout.jsx'
import Drops from './pages/Drops.jsx'
import Club from './pages/Club.jsx'
import Account from './pages/Account.jsx'
import Community from './pages/Community.jsx'

export default function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <BrowserRouter>
          <a className="skip" href="#root">Skip to content</a>
          <Header />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/drops" element={<Drops />} />
            <Route path="/drops/:id" element={<Drops />} />
            <Route path="/club" element={<Club />} />
            <Route path="/account" element={<Account />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </StoreProvider>
  )
}
