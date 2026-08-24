import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import authReducer from "./auth/slice";
import currencyReducer from "./currency/slice";
import financeReducer from "./finance/slice";
import { transactionsReducer } from "./transactions/slice";

const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),

  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve(value);
  },

  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    finance: financeReducer,
    currency: currencyReducer,
    transactions: transactionsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
