import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

export function makeStore() {
  const store = configureStore({
    reducer: {
      user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
}

export const store = makeStore().store;
export const persistor = makeStore().persistor;
