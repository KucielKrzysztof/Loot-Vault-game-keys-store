import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const alreadyInCart = state.items.find(
        (i) =>
          i.id === product.id &&
          i.selectedPlatform === product.selectedPlatform,
      );
      if (alreadyInCart) {
        alreadyInCart.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { id, selectedPlatform } = action.payload;
      state.items = state.items.filter(
        (i) => !(i.id === id && i.selectedPlatform === selectedPlatform),
      );
    },
    clearCart: () => initialState,
    increaseItemQuantity(state, action) {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedPlatform === action.payload.selectedPlatform,
      );
      if (item) item.quantity++;
    },
    decreaseItemQuantity(state, action) {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedPlatform === action.payload.selectedPlatform,
      );
      if (item) {
        item.quantity--;
        if (item.quantity === 0) {
          cartSlice.caseReducers.removeFromCart(state, action);
        }
      }
    },
  },
});

export const selectIsCartOpen = (state) => state.cart.isCartOpen;
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

export const {
  addToCart,
  removeFromCart,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
