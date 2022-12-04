import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNews';
import { cryptoExchangeApi } from '../services/cryptoExchangeApi';
import  authReducer  from './authSlice';
import  watchlistReducer  from './watchlistSlice';


export default configureStore({
  reducer: {
    auth : authReducer,
    watchlist : watchlistReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [cryptoExchangeApi.reducerPath]: cryptoExchangeApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([cryptoApi.middleware , cryptoNewsApi.middleware ,cryptoExchangeApi.middleware ]),
});