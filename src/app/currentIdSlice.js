import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentId : localStorage.getItem("currentID") ? JSON.parse(localStorage.getItem("currentID")) : []
}

const currentIdSlice = createSlice({
    name : "current",
    initialState,
    reducers : {
        CURRENT_ID : (state , action) => {
           // const [currentID, setcurrentID] = useState([]);
            if(state.currentId.includes(action.payload)){
                //let RemoveOneCoin = 
                 state.currentId = state.currentId.filter((item) => item !== action.payload)
                 localStorage.setItem("currentID" , JSON.stringify(state.currentId))
              }else{
                state.currentId.push(action.payload)
                localStorage.setItem("currentID" , JSON.stringify(state.currentId))
              }
           
        }
    }
})

export const {CURRENT_ID} = currentIdSlice.actions

export const SelectCurrentId = (state) => state.current.currentId

export default currentIdSlice.reducer