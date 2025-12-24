import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./src/Features/cart/cartSlice";

const store = configureStore({ reducer: { cart: cartReducer } });
export default store;
