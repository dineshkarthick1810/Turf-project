import { createSlice } from "@reduxjs/toolkit"

const initialstate={
    Reviews:[]
}

export const slice=createSlice({
    name:"review",
    initialState:initialstate,
    reducers:{
        addReviews:(state,action)=>{
            state.Reviews=[...action.payload]

        }
    }
})

export const {addReviews}=slice.actions
export default slice.reducer