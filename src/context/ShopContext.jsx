import { createContext, useContext, useEffect, useReducer } from 'react'
import { products } from '../data/products'

const Ctx = createContext(null)
const KEY = 'texnodokon.state'

function reducer(s, a) {
  switch (a.type) {
    case 'add': return { ...s, cart: { ...s.cart, [a.id]: (s.cart[a.id] || 0) + 1 } }
    case 'qty': {
      const cart = { ...s.cart }
      if (a.qty <= 0) delete cart[a.id]
      else cart[a.id] = Math.min(a.qty, 99)
      return { ...s, cart }
    }
    case 'clear': return { ...s, cart: {} }
    case 'fav': return { ...s, favs: s.favs.includes(a.id) ? s.favs.filter((x) => x !== a.id) : [...s.favs, a.id] }
    default: return s
  }
}
const init = () => {
  try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r) } catch {}
  return { cart: {}, favs: [] }
}

export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(state)) } catch {} }, [state])
  const items = Object.entries(state.cart)
    .map(([id, qty]) => ({ product: products.find((p) => p.id === Number(id)), qty }))
    .filter((i) => i.product)
  const count = items.reduce((a, i) => a + i.qty, 0)
  const total = items.reduce((a, i) => a + i.qty * i.product.price, 0)
  return <Ctx.Provider value={{ ...state, items, count, total, dispatch }}>{children}</Ctx.Provider>
}
export const useShop = () => useContext(Ctx)
