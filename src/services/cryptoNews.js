import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewHeader = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "423e32c21amsh979df21f3fcb536p1dde98jsn41d006f86576",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";



const createRequest = (url) => ({ url, headers: cryptoNewHeader });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&count=${count}`),
    }),
  }),
});



export const { useGetCryptoNewsQuery } = cryptoNewsApi;
