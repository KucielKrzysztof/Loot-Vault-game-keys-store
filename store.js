import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./src/Features/cart/cartSlice";

const cartPersistConfig = {
  key: "loot-vault/cart",
  storage,
  blacklist: ["isCartOpen", "status"],
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
