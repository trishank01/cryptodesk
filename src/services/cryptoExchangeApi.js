import { CreateApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

// const options = {
//     method: 'GET',
//     url: 'https://coingecko.p.rapidapi.com/exchanges',
//     headers: {
//       'X-RapidAPI-Key': '423e32c21amsh979df21f3fcb536p1dde98jsn41d006f86576',
//       'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
//     }
//   };

const CryptoExchangeApi = {
  "X-RapidAPI-Key": "423e32c21amsh979df21f3fcb536p1dde98jsn41d006f86576",
  "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
};

const baseUrl = "https://api.coingecko.com/api/v3";
const createRequest = (url) => ({ url, headers: CryptoExchangeApi });

export const cryptoExchangeApi = createApi({
  reducerPath: "cryptoExchangeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoExchange: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});


export const {useGetCryptoExchangeQuery} = cryptoExchangeApi