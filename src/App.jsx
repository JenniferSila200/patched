import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Header, { Footer } from './components/Header.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Product from './pages/Product.jsx'
import About from './pages/About.jsx'
import Checkout from './pages/Checkout.jsx'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <a className="skip" href="#root">Skip to content</a>
        <Header />
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  )
}
