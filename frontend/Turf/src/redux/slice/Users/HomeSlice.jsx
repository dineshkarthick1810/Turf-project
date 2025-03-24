import { createSlice } from "@reduxjs/toolkit"

const initialstate={
    AllProducts:[]
}
export const Slice=createSlice({
    name:"Home",
    initialState:initialstate,
    reducers:{
        uploadProducts:(state,action)=>{
            state.AllProducts=[...action.payload]

        }
    }
})

export const {uploadProducts}=Slice.actions

export default Slice.reducer