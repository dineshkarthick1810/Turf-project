import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addproduct } from '../../redux/slice/Products';
import { uploadProducts } from '../../redux/slice/Users/HomeSlice';
import "../../App.css"

const Search = () => {
    const dispatch=useDispatch()

    const Allproduct=useSelector((state)=>{
        return state.Allproducts.AllProducts
    })
const [InputValue,setValue]=useState("")
const handleSearch=(e)=>{
    const data=e.target.value
    setValue(data.trimStart().toLowerCase())

}

const handleBtn=()=>{
    
    const filterProduct=Allproduct.filter((res,index)=>{
        return res.shopname==InputValue
    })

    dispatch(uploadProducts(filterProduct))
    
    
}


    return (
        <div className=" mt-3 ms-5 forparent me-3" style={{display:"flex"}}>

        

                <input type="text" className="form-control for-form " placeholder='Search' onChange={(e)=>handleSearch(e)} style={{  padding: "10px" }} />
                <button className="btn btn-warning text-white ms-2" type="button" onClick={()=>handleBtn()} ><SearchIcon /></button>
            
        </div>
    )
}

export default Search
