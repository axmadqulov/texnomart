# TexnoDokon

Onlayn do'kon (e-commerce) frontendi: React 18, Vite, React Router, Context + useReducer.

## Imkoniyatlar
- Katalog: qidiruv, toifa filtri, saralash (holat URL'da saqlanadi, havolani ulashish mumkin)
- Mahsulot sahifasi va o'xshash mahsulotlar
- Savat: miqdorni o'zgartirish, o'chirish, jami summa
- Sevimlilar ro'yxati
- Buyurtma formasi (validatsiya bilan) va muvaffaqiyat ekrani
- Savat va sevimlilar `localStorage` da saqlanadi, qorong'i rejim tizim sozlamasiga qarab

## Ishga tushirish
```bash
npm install
npm run dev
```

## Struktura
```
src/
  data/products.js        # mahsulotlar ro'yxati
  context/ShopContext.jsx # savat va sevimlilar holati
  pages/                  # Catalog, Product, Cart, Checkout
  components/             # ProductCard, Thumb
```

## Keyingi qadamlar
Haqiqiy backend (Node/Express yoki Firebase), to'lov tizimi (Payme/Click), rasmlar, admin panel.

## GitHub'ga yuklash
```bash
git init && git add . && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/texnodokon.git
git push -u origin main
```
# texnomart
