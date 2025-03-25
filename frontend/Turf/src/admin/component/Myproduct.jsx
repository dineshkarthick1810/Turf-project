import React, { useEffect } from 'react'
import AdminNav from './AdminNav'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { addproduct, deleteProducts } from '../../redux/slice/Products'

const Myproduct = ({ FilteringProducts }) => {

  const dispatch = useDispatch()
  useEffect(() => {



    const Fetchproducts = async () => {
      const products = await fetch("https://turf-project-04az.onrender.com/api/allproducts").then((res) => res.json()).then((val) => {
        dispatch(addproduct(val))

      })

    }

    Fetchproducts()


  }, [])


  const data = useSelector((state) => {
    return state.products.Products
  })

  console.log(data)
  const Filterproducts=data.filter((res,index)=>{
    return res.id==JSON.parse(sessionStorage.getItem("id"))
  })

  console.log(Filterproducts)

 //for deleting products 
  const handleDelete=async(phonenumber)=>{

    const DeleteData=await fetch("https://turf-project-04az.onrender.com/api/Deleteproducts",{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({number:phonenumber})

    }).then((res)=>res.json()).then((val)=>{
  dispatch(addproduct(val))
    })

   

  }

  return (
    <div style={{overflowX:"hidden"}}>

      <div>
        <AdminNav />
      </div>
      <div className='container'>
        <div className='row'>

          {data.map((val, index) => {
            return <div className='col-sm-6 mt-5 ' key={index}>
              <div className='card shadow  bg-dark text-center' style={{  }}>
                <p className='card-title  text-white badge bg-warning' style={{ fontWeight: "bold", fontSize: "20px", padding: "10px" }}>{val.shopname}</p>
                <div className='card-body' >
                  <img src={`https://turf-project-04az.onrender.com/images/${val.image}`} alt='image is here' className='card-img' style={{ height: "200px" }} />
                  <div style={{ display: "flex", marginTop: "25px" }}>
                    <button type='button' className='bg-danger text-white btn btn-danger' onClick={() => handleDelete(val.phonenumber)} style={{ fontWeight: 'bold' }}>Delete</button>
                    <Link to="/admin/ProductDetails" type='button' className='bg-warning text-white btn btn-warning ms-3' style={{ fontWeight: 'bold', textDecoration: "none" }} onClick={() => FilteringProducts(val.phonenumber)}>Show more </Link>


                  </div>




                </div>
              </div>


            </div>
          })}



        </div>



      </div>



      <Outlet />

    </div>
  )
}

export default Myproduct
