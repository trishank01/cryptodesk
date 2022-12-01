import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '423e32c21amsh979df21f3fcb536p1dde98jsn41d006f86576'   
}   

const baseUrl = "https://coinranking1.p.rapidapi.com"

const createRequest = (url) => ({url , headers : cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath : 'cryptoApi',
    baseQuery : fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getCryptos : builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails : builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory : builder.query({
            query: ({coinId , timeperiod}) => createRequest(`coin/${coinId}/history?timePeriod=${timeperiod}`)
        }),
    })

})

export const {useGetCryptosQuery , useGetCryptoDetailsQuery , useGetCryptoHistoryQuery} = cryptoApi
