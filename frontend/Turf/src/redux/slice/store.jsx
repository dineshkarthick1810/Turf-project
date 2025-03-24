import {configureStore} from "@reduxjs/toolkit"
import Products from "../slice/Products"
import Bookings from "../slice/Bookings"
import Allproducts from "../slice/Users/HomeSlice"
import Reviews from "../slice/Users/Reviews"


const store=configureStore({
    reducer:{
        products:Products,
        bookings:Bookings,
        Allproducts:Allproducts,
        reviews:Reviews
        
    }
})
export default store