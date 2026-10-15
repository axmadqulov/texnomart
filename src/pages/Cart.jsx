import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { money } from '../utils/format'
import { Thumb } from '../components/ProductCard'

export default function Cart() {
  const { items, total, dispatch } = useShop()
  if (!items.length) return <><h1>Savat</h1><p className="muted">Savat bo'sh. <Link to="/">Xarid qilishni boshlang</Link></p></>
  return (
    <>
      <h1>Savat</h1>
      <ul className="lines">
        {items.map(({ product: p, qty }) => (
          <li key={p.id}>
            <Thumb p={p} />
            <div className="grow"><Link to={`/mahsulot/${p.id}`}>{p.name}</Link><div className="muted">{money(p.price)}</div></div>
            <div className="qty">
              <button aria-label="Kamaytirish" onClick={() => dispatch({ type: 'qty', id: p.id, qty: qty - 1 })}>−</button>
              <span>{qty}</span>
              <button aria-label="Ko'paytirish" onClick={() => dispatch({ type: 'qty', id: p.id, qty: qty + 1 })}>+</button>
            </div>
            <strong className="sum">{money(p.price * qty)}</strong>
            <button className="ghost" aria-label="O'chirish" onClick={() => dispatch({ type: 'qty', id: p.id, qty: 0 })}>×</button>
          </li>
        ))}
      </ul>
      <div className="total"><span>Jami:</span><strong>{money(total)}</strong><Link className="btn primary" to="/buyurtma">Buyurtma berish</Link></div>
    </>
  )
}
