import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./src/Features/cart/carSlice";

const store = configureStore({ reducer: { cart: cartReducer } });
export default store;
