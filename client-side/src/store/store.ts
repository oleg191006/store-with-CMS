import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart/cart.slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const isClient = typeof window !== "undefined";

const combinedReducers = combineReducers({
  cart: cartSlice.reducer,
});

let mainReducer = combinedReducers;
let persistor;

if (isClient) {
  const { persistReducer, persistStore } = require("redux-persist");
  const storage = require("redux-persist/lib/storage").default;

  const persistConfig = {
    key: "vendens-store",
    storage,
    whitelist: ["cart"],
  };

  mainReducer = persistReducer(persistConfig, combinedReducers);
}

export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

if (isClient) {
  const { persistStore } = require("redux-persist");
  persistor = persistStore(store);
}

export { persistor };

export type TypeRootState = ReturnType<typeof mainReducer>;
