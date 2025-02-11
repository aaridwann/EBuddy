import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import userReducer from './Reducers/Users';
import authReducer from './Reducers/Authentication';

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

export const persistConfig = {
  key: 'root',
  storage,
  debug: true,
  whitelist: ['auth'],
  transforms: [
    encryptTransform({
      secretKey: 'my-super-secret-key',
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistStoreConfig = persistStore(store);
export default store;