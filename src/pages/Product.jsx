import { Link, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { useShop } from '../context/ShopContext'
import { money } from '../utils/format'
import { Thumb } from '../components/ProductCard'
import ProductCard from '../components/ProductCard'

export default function Product() {
  const { id } = useParams()
  const { dispatch } = useShop()
  const p = products.find((x) => x.id === Number(id))
  if (!p) return <p>Mahsulot topilmadi. <Link to="/">Katalogga qaytish</Link></p>
  const similar = products.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 3)
  return (
    <>
      <Link to="/" className="muted">← Katalog</Link>
      <div className="detail">
        <Thumb p={p} big />
        <div>
          <h1>{p.name}</h1>
          <p className="muted">{p.cat} · ★ {p.rating}</p>
          <p>{p.desc}</p>
          <p className="price">{money(p.price)}</p>
          <button className="primary" onClick={() => dispatch({ type: 'add', id: p.id })}>Savatga qo'shish</button>
        </div>
      </div>
      {similar.length > 0 && <><h2>O'xshash mahsulotlar</h2><div className="grid">{similar.map((s) => <ProductCard key={s.id} p={s} />)}</div></>}
    </>
  )
}
