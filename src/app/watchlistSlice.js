import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    watchListCoin : []
}

const watchlistSlice = createSlice({
    name : "watchlist",
    initialState : initialState,
    reducers : {
        GET_WATCHLIST_COIN : (state , action) => {
             state.watchListCoin = action.payload
        },
        REMOVE_WATCHLIST_COIN : (state ,action) => {
           state.watchListCoin.filter(item =>  item !== action.payload)
          
        }
    }
})

export const {GET_WATCHLIST_COIN , REMOVE_WATCHLIST_COIN} = watchlistSlice.actions

export const selectWatchListCoin = (state) => state.watchlist.watchListCoin

export default watchlistSlice.reducer