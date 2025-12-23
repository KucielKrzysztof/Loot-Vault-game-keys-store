import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const alreadyInCart = state.items.find((i) => i.id === product.id);
      if (alreadyInCart) {
        alreadyInCart.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    clearCart: () => initialState,
  },
});

export const selectCartItems = (state) => state.cart.items;

export const getTotalCartPrice = createSelector([selectCartItems], (items) =>
  items
    .filter((item) => typeof item.price === "number" && item.price > 0)
    .reduce((sum, item) => sum + item.price * item.quantity, 0),
);

export const getTotalCartQuantity = createSelector(
  [selectCartItems],
  (items) => {
    return items.reduce((acc, item) => {
      return acc + (item.quantity || 0);
    }, 0);
  },
);

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
