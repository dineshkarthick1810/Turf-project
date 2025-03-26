import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Search from './Search'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import TurnedInIcon from '@mui/icons-material/TurnedIn';

const Dashboard = () => {


    const [bookings,setBookings]=useState([])
   
   
       useEffect(()=>{
            const fetchBookings=async()=>{
                 const Bookings=await fetch("https://turf-project-n38p.vercel.app//api/bookings").then((res)=>res.json()).then((val)=>{
                   setBookings(val)
                   
                   
                 })
           
           
               }
           
               fetchBookings()
   
   
   
       },[])
       const filterBookings=bookings.filter((res,index)=>{
           return res.Userid==JSON.parse(sessionStorage.getItem("id"))  
       })
    return (
        <div className='container-fluid'>


            <div style={{ overflowY: "scroll", display: "flex", overflowX: "hidden" }} className='bg-primary-subtle'>


                <div >
                    <Sidebar />
                </div>

                <div style={{ width: "100%" }}>
                    <Search />


                    <div className='mt-5'>

                        <div className='card shadow' style={{width:"600px"}}>
                            <div className='card-body'>
                                <div style={{ display: "flex" }} >
                                    <TurnedInIcon style={{ color: "rgb(228, 64, 95)", fontSize: "50px" }} />
                                    <p style={{ fontWeight: "bold", fontSize: "15px" }} className='ms-5 mt-2 badge bg-warning'>Bookings</p>

                                </div>

                            <div  className='mt-4 ms-2'>  

                                {filterBookings.length>0? <p className='text-success' style={{fontWeight:"bold"}}>No of Bookings :<span className='ms-3'>{filterBookings.length}</span></p>:<p className='text-danger' style={{fontWeight:"bold"}}>No bookings Yet</p>}
                                
                            </div>


                            </div>


                        </div>




                    </div>




                </div>

            </div>

        </div>
    )
}

export default Dashboard
