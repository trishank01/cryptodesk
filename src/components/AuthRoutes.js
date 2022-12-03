import React from 'react'
import { useSelector } from 'react-redux'
import { SelectIsLoggedIn } from '../app/authSlice'



export const ShowOnLogin = ({children}) => {
    const currentUser = useSelector(SelectIsLoggedIn)
     if(currentUser){
        return children
     }
     return null
}

export const ShowOnLogout = ({children}) => {
    const currentUser = useSelector(SelectIsLoggedIn)
     if(!currentUser){
        return children
     }
     return null
}


