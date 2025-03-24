import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useSelector } from 'react-redux';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { Link } from 'react-router-dom';
import "../../App.css"



const Dashboard = ({status}) => {
    const ProductData = useSelector((state) => {
        return state.products.Products

    })
    
    const [bookings,setBookings]=useState([])
      useEffect(()=>{
    
        const fetchBookings=async()=>{
          const Bookings=await fetch("http://localhost:3002/api/bookings").then((res)=>res.json()).then((val)=>{
            setBookings(val)
            
          })
    
    
        }
    
        fetchBookings()
    
      },[])

   
     
       //filterd bookings
       const filterBookings=bookings.filter((res,index)=>{
         return res.Adminid==JSON.parse(sessionStorage.getItem("id"))
       })
   
    return (
        <div style={{overflowX:"hidden"}}>
            <AdminNav />
        {/* bookings and prodcts details */}
            <div className='container' style={{ backgroundColor: "whitesmoke" }}>
                <div className='row mt-5'>
                    <div className='col-md-6'>
                        <Link to="/admin/myproduct" style={{textDecoration:"none"}}>
                        <div className='card shadow bg-light '>
                            <div className='card-body ' style={{}}>
                                <div style={{ display: "flex" }} >
                                    <ProductionQuantityLimitsIcon style={{ color: "orange", fontSize: "50px" }} />
                                    <p style={{ fontWeight: "bold", fontSize: "15px" }} className='ms-5 mt-2 badge bg-warning'>Products</p>
                                </div>


                                {ProductData.length > 0 ? <div>
                                    <p style={{ fontWeight: "bold", fontSize: "20px" }} className='text-success text-center'>Total products  </p>

                                     <p style={{fontWeight:"bold"}} className='text-center mt-3'>{`${ProductData.length}`}</p>

                                </div> : <p style={{ fontWeight: "bold" }} className='text-danger text-center mt-3'>No Products yet</p>}





                            </div>


                        </div>
                        </Link>
                       
                    </div>
                    <div className='col-md-6 forGap'>
<Link to="/admin/bookings" style={{textDecoration:"none"}}>

<div className='card shadow'>
                            <div className='card-body'>
                                <div style={{display:"flex"}} >
                                    <TurnedInIcon style={{color:"rgb(228, 64, 95)",fontSize:"50px"}}/>
                                    <p  style={{ fontWeight: "bold", fontSize: "15px" }} className='ms-5 mt-2 badge bg-warning'>Bookings</p>

                                </div>

                                {bookings.length > 0 ? <div>
                                    <p style={{ fontWeight: "bold", fontSize: "20px" }} className='text-success text-center'>Total Bookings  </p>

                                     <p style={{fontWeight:"bold"}} className='text-center mt-3'>{`${bookings.length}`}</p>

                                </div> : <p style={{ fontWeight: "bold" }} className='text-danger text-center mt-3'>No Bookings yet</p>}



                            </div>

                        </div>
</Link>

                    </div>
                    

                </div>


                {/* table */}
                <table className='table table-striped table-dark mt-5'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>groundname</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Access</th>
                        </tr>
                        </thead>
                        {bookings.length<1 &
                            
                                <p className='text-danger mt-3' style={{fontWeight:"bold"}}>No recent bookings</p>
                            }

                         
                         {filterBookings.map((val,index)=>{
                            return  <tbody>

                            <tr>
                                <td>{val.username}</td>
                                <td>{val.groundname}</td>
                                <td>{val.date}</td>
                                <td>{val.time}</td>
                                <td>{val.approved? <p className='btn btn-success text-white' style={{fontWeight:"bold"}}>Approved</p> :<div>
                                    {val.decline ?<p className='text-white btn btn-danger' style={{fontWeight:"bold"}}>Declined</p>:<div>
                                    <p className='btn text-white' style={{fontWeight:"bold",backgroundColor:"orange"}}>Pending...</p>
                                        </div>}
                                    
                                    </div>}</td>
                            </tr>
                        </tbody>
                         })}
                         
                         
                        
                    
                    
                  

                   
                </table>

            </div>

        </div>
    )
}

export default Dashboard
