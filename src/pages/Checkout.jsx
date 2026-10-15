import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { money } from '../utils/format'

export default function Checkout() {
  const { items, total, dispatch } = useShop()
  const [f, setF] = useState({ name: '', phone: '', address: '', pay: 'cash' })
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (f.name.trim().length < 2) er.name = 'Ismingizni kiriting'
    if (!/^\+?998\d{9}$/.test(f.phone.replace(/[\s-]/g, ''))) er.phone = 'Telefon formati: +998901234567'
    if (f.address.trim().length < 5) er.address = 'Manzilni to\'liq yozing'
    setErrors(er)
    if (Object.keys(er).length) return
    setOrder({ id: Date.now().toString().slice(-6), total })
    dispatch({ type: 'clear' })
  }

  if (order) return (
    <div className="panel center">
      <h1>Buyurtma qabul qilindi</h1>
      <p>Buyurtma raqami: <b>#{order.id}</b>. Summa: {money(order.total)}. Operator tez orada bog'lanadi.</p>
      <Link className="btn primary" to="/">Katalogga qaytish</Link>
    </div>
  )
  if (!items.length) return <p>Savat bo'sh. <Link to="/">Katalogga qaytish</Link></p>

  return (
    <div className="two">
      <form className="panel form" onSubmit={submit} noValidate>
        <h1>Buyurtma</h1>
        <label>Ism<input value={f.name} onChange={set('name')} aria-invalid={!!errors.name} />{errors.name && <em>{errors.name}</em>}</label>
        <label>Telefon<input value={f.phone} onChange={set('phone')} placeholder="+998 90 123 45 67" aria-invalid={!!errors.phone} />{errors.phone && <em>{errors.phone}</em>}</label>
        <label>Manzil<textarea rows="3" value={f.address} onChange={set('address')} aria-invalid={!!errors.address} />{errors.address && <em>{errors.address}</em>}</label>
        <label>To'lov usuli
          <select value={f.pay} onChange={set('pay')}><option value="cash">Naqd</option><option value="card">Karta</option></select>
        </label>
        <button className="primary">Tasdiqlash</button>
      </form>
      <aside className="panel">
        <h2>Buyurtmangiz</h2>
        <ul className="mini">{items.map(({ product: p, qty }) => <li key={p.id}><span>{p.name} × {qty}</span><b>{money(p.price * qty)}</b></li>)}</ul>
        <div className="total"><span>Jami:</span><strong>{money(total)}</strong></div>
      </aside>
    </div>
  )
}
