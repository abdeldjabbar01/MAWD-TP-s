# WAMD Electronics Store

**Student name:** ABBA Abdeldjabbar
**Module:** WAMD – TD/TP 2 (ENSTA, SS/IA, 2026)
**Store name:** WAMD Electronics

## Description
A small online electronics store built with React and Redux. Users can browse 5 products,
search them by name, add them to a shopping cart, remove them, and see the cart item count and total price.
There is no backend, database, authentication or payment system (not required for this lab).

## Technologies used
- React 18 (JavaScript, JSX)
- Vite
- Redux Toolkit
- React-Redux
- Plain CSS

## Main React components (all in `src/App.jsx`)
| Component | Role |
|-----------|------|
| `App` | Main page; holds the **local state** (search text) and filters the products |
| `Header` | Store name and number of items in the cart (read from Redux) |
| `ProductCard` | Shows image, name, price and the "Add to Cart" button (receives `product` as a **prop**) |
| `Cart` | Lists cart items, "Remove" buttons and the total price (read from Redux) |

## Redux state managed by the application
Defined in `src/store.js` (cart slice):
```js
state.cart.items = [ { id, name, price, image, quantity }, ... ]
```
- Action `addToCart(product)`: adds the product, or increases its quantity if already in the cart.
- Action `removeFromCart(id)`: removes the product from the cart.
- `Provider` is set in `src/main.jsx`; components use `useSelector` and `useDispatch`.

## Implemented features
- Product catalog (image, name, price)
- Add to cart / remove from cart
- Quantity management
- Cart item count in the header
- Total price
- Product search (local React state)
- Responsive design

## How to run
```bash
npm install
npm run dev
```
Then open http://localhost:5173.
Product images must be placed in `public/images/`: `headphones.jpg`, `smartphone.jpg`, `laptop.jpg`, `smartwatch.jpg`, `keyboard.jpg`.


##
main.jsx starts the app and wraps it in the Redux Provider, and index.html loads it.
store.js creates the Redux store with a cart slice, holding the cart items and the addToCart and removeFromCart actions.
App.jsx holds the components Header (cart count), ProductCard (image, name, price, Add button) and Cart (items, Remove button, total). It reads and updates the store with useSelector and useDispatch, and uses useState for the search box.
products.js has the 5 products, style.css has the design and responsive layout, and the images are in public/images/.