import React from 'react'
import AdminNav from './AdminNav'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { useSelector } from 'react-redux'

const ProductDetails = ({Phonenumber}) => {
    console.log(Phonenumber)
    const ProductDetails=useSelector((state)=>{
        return state.products.Products
    })
    const FilterData=ProductDetails.filter((val,index)=>{
        if(val.phonenumber===Phonenumber){
            return val
        }

    })
    console.log(FilterData)
  return (
    <div style={{overflowX:"hidden"}}>
        <AdminNav/>
        
        <div className='container-fluid mt-3'>
            
                
{FilterData.map((val,index)=>{

   return <div style={{overflowX:"scroll"}}>
<img src={`https://turf-project-ecru.vercel.app/images/${val.image}`} style={{width:"100%",height:"80vh"}} className='img-fluid'/>
<p className='text-muted mt-3'>{val.description}</p>
<table className='table table-dark mt-5' >

    <thead>
<tr>
    <th>Name</th>
    <th>Shop name</th>
    <th>Location</th>
    <th>Price</th>
    <th>Address</th>
</tr>
    </thead>
    <tbody>
        <tr>
            <td>{val.name}</td>
            <td>{val.shopname}</td>
            <td>{val.location}</td>
            <td>{val.price}</td>
            <td>{val.address}</td>
        </tr>

    </tbody>
</table>






   </div>
   
   
   

})
    
}

            
            
            
        </div>
      
    </div>
  )
}

export default ProductDetails
