import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false, 
    userID : "",
    userEmail : "", 
}

const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {
        GET_USER_DETAILS : (state , action) => {
            const {userID , userEmail} = action.payload
            state.isLoggedIn = true
            state.userID = userID
            state.userEmail = userEmail
        },
        REMOVE_ACTIVE_USER : (state , action) => {
            state.isLoggedIn = false
            state.userID = ""
            state.userEmail = ""
        }
    }
})

export const  {GET_USER_DETAILS , REMOVE_ACTIVE_USER} = authSlice.actions

export const SelectIsLoggedIn = (state) => state.auth.isLoggedIn
export const SelectUserID = (state) => state.auth.userID
export const SelectuserEmail = (state) => state.auth.userEmail

export default authSlice.reducer


