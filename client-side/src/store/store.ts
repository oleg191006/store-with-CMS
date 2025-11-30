import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart/cart.slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
  type Persistor,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const isClient = typeof window !== "undefined";

const combinedReducers = combineReducers({
  cart: cartSlice.reducer,
});

const persistConfig = {
  key: "vendens-store",
  storage,
  whitelist: ["cart"],
};

const mainReducer = isClient
  ? persistReducer(persistConfig, combinedReducers)
  : combinedReducers;

export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor: Persistor | null = isClient
  ? persistStore(store)
  : null;

export type TypeRootState = ReturnType<typeof mainReducer>;
