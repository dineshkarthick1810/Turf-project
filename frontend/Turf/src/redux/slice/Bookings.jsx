import { createSlice } from "@reduxjs/toolkit"



const initialstate={
    bookings:[]
}


const slice=createSlice({
    name:"bookings",
    initialState:initialstate,
    reducers:{
        addBookings:(state,action)=>{
            state.bookings=[...action.payload]

        }
    }
})

export const {addBookings}=slice.actions

export default slice.reducer
