import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATEGORIES, products } from '../data/products'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'

export default function Catalog({ onlyFavs }) {
  const [sp, setSp] = useSearchParams()
  const { favs } = useShop()
  const q = sp.get('q') || '', cat = sp.get('cat') || 'all', sort = sp.get('sort') || 'pop'
  const set = (k, v) => { const n = new URLSearchParams(sp); v && v !== 'all' ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }) }
  const list = useMemo(() => {
    const out = products.filter((p) =>
      (!onlyFavs || favs.includes(p.id)) && (cat === 'all' || p.cat === cat) && p.name.toLowerCase().includes(q.toLowerCase()))
    const by = { pop: (a, b) => b.rating - a.rating, asc: (a, b) => a.price - b.price, desc: (a, b) => b.price - a.price }
    return out.sort(by[sort])
  }, [q, cat, sort, onlyFavs, favs])
  return (
    <>
      <h1>{onlyFavs ? 'Sevimlilar' : 'Mahsulotlar'}</h1>
      <div className="filters">
        <input type="search" placeholder="Mahsulot qidirish..." value={q} onChange={(e) => set('q', e.target.value)} />
        <select value={cat} onChange={(e) => set('cat', e.target.value)}>
          <option value="all">Barcha toifalar</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => set('sort', e.target.value)}>
          <option value="pop">Mashhur</option><option value="asc">Arzonroq</option><option value="desc">Qimmatroq</option>
        </select>
      </div>
      {list.length === 0 && <p className="muted">{onlyFavs ? 'Hali sevimli mahsulot yo\'q.' : 'Hech narsa topilmadi.'}</p>}
      <div className="grid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </>
  )
}
