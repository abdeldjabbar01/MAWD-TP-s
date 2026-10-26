import { configureStore, createSlice } from "@reduxjs/toolkit";

// Cart slice: holds the state and the actions that modify it.
// state.items = [{ id, name, price, image, quantity }, ...]
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    // Add a product; if it is already in the cart, increase its quantity
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 }); // Redux Toolkit allows this "mutating" syntax
      }
    },
    // Remove a product completely, using its id
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

// The Redux store
const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export default store;
