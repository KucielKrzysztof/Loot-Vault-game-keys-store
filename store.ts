import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./src/Features/cart/cartSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
});

const cartPersistConfig = {
  key: "loot-vault/cart",
  storage,
  blacklist: ["isCartOpen", "status"],
};

const persistedReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
