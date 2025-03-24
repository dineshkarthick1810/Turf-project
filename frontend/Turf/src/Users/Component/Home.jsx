import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "./user.css"
import Search from "./Search"
import { useDispatch, useSelector } from 'react-redux';
import { uploadProducts } from '../../redux/slice/Users/HomeSlice';
import { Link } from 'react-router-dom'

const Home = ({FilteringProducts,handlegroundname}) => {
  const dispatch=useDispatch()



  useEffect(()=>{

    const fetchData=async()=>{
      const FetchDatas= await fetch("http://localhost:3002/api/allproducts").then((res)=>res.json()).then((val)=>{
        dispatch(uploadProducts(val))
 })
    }

    fetchData()
    
    

  },[])

  const Datas=useSelector((state)=>{
    return state.Allproducts.AllProducts

  })
  console.log(Datas)
 
  return (
    <div>


      <div style={{ overflow: "hidden", display: "flex" }} className='bg-primary-subtle'>


        <div style={{}}>
          <Sidebar />
        </div>

        <div className='container'>
          <Search />


          <div className='row mt-5 '   >
            {Datas.map((val,index)=>{
              return <div className='col-lg-6 mt-5'>

                <div className="card shadow" key={index} style={{borderRadius:"16px"}}>
                  <img src={`http://localhost:3002/images/${val.image}`}  className='card-img' style={{height:"250px"}}/>

                  <p style={{fontWeight:"bold"}} className='text-dark text-center mt-3'>{val.shopname}</p>


                  <div className='card-footer' style={{display:"flex",justifyContent:"space-between"}}>
                    <Link to="/users/Details" style={{fontWeight:"bold"}} className='btn bg-warning text-white mt-2' onClick={()=>FilteringProducts(val.phonenumber,val.shopname)}>View</Link>

                    <Link to="/users/review"  style={{fontWeight:"bold"}} className='btn bg-warning text-white mt-2' onClick={()=>handlegroundname(val.shopname)}>Add reviews</Link>

                   </div>


                    </div>



                  </div>
              


           
            })}
             </div>
            

            

          </div>
        </div>

      </div>



   
  )
}

export default Home
