import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getProductStockAndPrice } from "../../services/apiProducts";
import type { RootState } from "../../../store";

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  selectedPlatform: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  status: "idle" | "loading" | "error";
}

const initialState: CartState = {
  items: [],
  isCartOpen: false,
  status: "idle",
};

export const addItemWithStockCheck = createAsyncThunk<
  { in_stock: boolean; price: number },
  CartItem,
  { rejectValue: string }
>(
  "cart/addItemWithStockCheck",
  async (product, { dispatch, rejectWithValue }) => {
    try {
      const latestData = await getProductStockAndPrice(product.id);

      if (!latestData.in_stock) {
        return rejectWithValue("Out of stock! Someone was faster than you.");
      }

      dispatch(addToCart({ ...product, price: latestData.price }));

      return latestData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

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
    addToCart: (state, action: PayloadAction<CartItem>) => {
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
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string | number; selectedPlatform: string }>,
    ) => {
      const { id, selectedPlatform } = action.payload;
      state.items = state.items.filter(
        (i) => !(i.id === id && i.selectedPlatform === selectedPlatform),
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    increaseItemQuantity(
      state,
      action: PayloadAction<{ id: string | number; selectedPlatform: string }>,
    ) {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedPlatform === action.payload.selectedPlatform,
      );
      if (item) item.quantity++;
    },
    decreaseItemQuantity(
      state,
      action: PayloadAction<{ id: string | number; selectedPlatform: string }>,
    ) {
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

  extraReducers: (builder) => {
    builder
      .addCase(addItemWithStockCheck.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemWithStockCheck.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addItemWithStockCheck.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const selectIsCartOpen = (state: RootState) => state.cart.isCartOpen;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartStatus = (state: RootState) => state.cart.status;

export const getTotalCartPrice = createSelector(
  [selectCartItems],
  (items: CartItem[]) =>
    items
      .filter(
        (item: CartItem) => typeof item.price === "number" && item.price > 0,
      )
      .reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0,
      ),
);

export const getTotalCartQuantity = createSelector(
  [selectCartItems],
  (items: CartItem[]) => {
    return items.reduce((acc: number, item: CartItem) => {
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
