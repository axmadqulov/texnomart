import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { useShop } from './context/ShopContext'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

export default function App() {
  const { count, favs } = useShop()
  return (
    <>
      <header className="bar">
        <Link to="/" className="logo">TexnoDokon</Link>
        <nav>
          <NavLink to="/" end>Katalog</NavLink>
          <NavLink to="/sevimlilar">Sevimlilar{favs.length > 0 && <span className="pill">{favs.length}</span>}</NavLink>
          <NavLink to="/savat">Savat{count > 0 && <span className="pill">{count}</span>}</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/sevimlilar" element={<Catalog onlyFavs />} />
          <Route path="/mahsulot/:id" element={<Product />} />
          <Route path="/savat" element={<Cart />} />
          <Route path="/buyurtma" element={<Checkout />} />
          <Route path="*" element={<p>Sahifa topilmadi. <Link to="/">Bosh sahifa</Link></p>} />
        </Routes>
      </main>
    </>
  )
}
