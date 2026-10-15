import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { money } from '../utils/format'

export function Thumb({ p, big }) {
  return (
    <div className={big ? 'thumb big' : 'thumb'} style={{ '--h': p.hue }} aria-hidden="true">{p.icon}</div>
  )
}
export default function ProductCard({ p }) {
  const { favs, dispatch } = useShop()
  const fav = favs.includes(p.id)
  return (
    <article className="card">
      <button className={fav ? 'heart on' : 'heart'} aria-pressed={fav}
        aria-label={fav ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo\'shish'}
        onClick={() => dispatch({ type: 'fav', id: p.id })}>{fav ? '♥' : '♡'}</button>
      <Link to={`/mahsulot/${p.id}`}><Thumb p={p} /><h3>{p.name}</h3></Link>
      <p className="muted">{p.cat} · ★ {p.rating}</p>
      <div className="buy">
        <strong>{money(p.price)}</strong>
        <button className="primary" onClick={() => dispatch({ type: 'add', id: p.id })}>Savatga</button>
      </div>
    </article>
  )
}
