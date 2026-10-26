import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import products from "./products";
import { addToCart, removeFromCart } from "./store";

// Fallback image if product image fails to load
const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16"> <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/> </svg>'
  );

function handleImageError(e) {
  e.target.onerror = null;
  e.target.src = FALLBACK_IMAGE;
}

// Header component shows store name and cart count
function Header() {
  const count = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  return (
    <div className="header">
      <div className="wrap flex">
        <div className="left logo">
          <span>WAMD Electronics</span>
        </div>
        <div className="right">
          <span className="button tag" status="on"> 
          Cart : {count}</span>
        </div>
      </div>
      <div className="line bottom"></div> 
    </div>
  );
}

// Product card component with add to cart button
function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="item">
      <div className="thumb">
        <img src={product.image} alt={product.name} onError={handleImageError} />
      </div>
      <div className="actions">
        <div className="title">{product.name}</div>
        <div className="price">${product.price.toFixed(2)}</div>
        <h2>
          <span className="button small tag" onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </span>
        </h2>
      </div>
      <div className="line"></div>
    </div>
  );
}

// Cart component shows items, remove buttons, and total
function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="right">
      <div className="card cart">
        <div className="title">Shopping Cart</div>
        {items.length === 0 && <div className="empty">Your cart is empty.</div>}
        {items.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} onError={handleImageError} />
            <div className="cart-info">
              <strong>{item.name}</strong>
              <span>
                ${item.price.toFixed(2)} × {item.quantity}
              </span>
            </div>
            <span className="button small" onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </span>
            <div className="line"></div>
          </div>
        ))}
        <div className="total">Total: ${total.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState("");

  const visibleProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="wrap main">
        <div className="page">
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="feed">
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {visibleProducts.length === 0 && <div className="empty center">No product found.</div>}
        </div>
        <Cart />
      </div>
    </>
  );
}
