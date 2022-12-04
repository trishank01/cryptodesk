import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SelectIsLoggedIn } from '../app/authSlice'



export const ShowOnLogin = ({children}) => {
    const currentUser = useSelector(SelectIsLoggedIn)
     if(currentUser){
        return children
     }
     return (
      <div className='flex justify-center items-center font-semibold text-[24px] min-h-[36rem]'>please login to access 
      <Link  to="/">
         <p className='pl-3 text-cyan-600'>Login here</p>
     
       </Link> 
       </div>
     )
}

export const ShowOnLoginNavBar = ({children}) => {
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


