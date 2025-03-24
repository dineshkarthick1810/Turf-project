import { createSlice } from "@reduxjs/toolkit";

const initalstate={
    Products:[]
}

export const Myproduct=createSlice({
    name:"product",
    initialState:initalstate,
    reducers:{
        addproduct:(state,action)=>{
            state.Products=[...action.payload]

        },
        deleteProducts:(state,action)=>{
            state.Products=state.Products.filter((val,index)=>{
                if(action.payload!=val.phonenumber){
                    return val

                }

            })


            

        }

    }
})

export const {addproduct,deleteProducts}=Myproduct.actions
export default Myproduct.reducer
