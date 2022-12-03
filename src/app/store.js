import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNews';
import { cryptoExchangeApi } from '../services/cryptoExchangeApi';
import  CurrentReducer  from './currentIdSlice';
import  authReducer  from './authSlice';


export default configureStore({
  reducer: {
    current : CurrentReducer,
    auth : authReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [cryptoExchangeApi.reducerPath]: cryptoExchangeApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([cryptoApi.middleware , cryptoNewsApi.middleware ,cryptoExchangeApi.middleware ]),
});