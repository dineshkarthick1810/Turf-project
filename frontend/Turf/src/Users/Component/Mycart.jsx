import React, { useEffect, useState } from 'react'
import Search from './Search'
import Sidebar from './Sidebar'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "../../App.css"

const Mycart = () => {

    const [bookings,setBookings]=useState([])


    useEffect(()=>{
         const fetchBookings=async()=>{
              const Bookings=await fetch("https://turf-project-04az.onrender.com/api/bookings").then((res)=>res.json()).then((val)=>{
                setBookings(val)
                
                
              })
        
        
            }
        
            fetchBookings()



    },[])
    const filterBookings=bookings.filter((res,index)=>{
        return res.Userid==JSON.parse(sessionStorage.getItem("id"))  
    })
   

  return (
   <div className='container-fluid' style={{overflowX:"hidden"}}>
   
   
               <div style={{ display: "flex" }} className='bg-primary-subtle'>
   
   
                   <div >
                       <Sidebar />
                   </div>
   
                   <div style={{ width: "100%" }}>
                       <Search />


<div className='mt-5 table-responsive '>

<table className='table table-striped table-dark fortable' style={{overflowX:"scroll"}}>
    <thead>
        <tr>
            <th>User</th>
            <th>groundname</th>
            <th>date</th>
            <th>time</th>
            <th>status</th>
        </tr>
    </thead>

    <tbody>
        {filterBookings.map((res,index)=>{
            return  <tr>
                <td>
                <img src={`https://turf-project-04az.onrender.com/images/${sessionStorage.getItem("imageUrl")}`} className='img-fluid' style={{ borderRadius: "50%",width:"70px",height:"70px" }} />
                </td>
                <td>{res.groundname}</td>
                <td>{res.date}</td>

                <td>{res.time}</td>
                <td>
                    {res.decline && <p className='text-white btn btn-danger' style={{fontWeight:"bold"}}>Declined</p> }
                    
                    {res.approved && <p className='text-white btn btn-success' style={{fontWeight:"bold"}}>Approved</p> }
                  {!res.decline && !res.approved ? <p className='text-mutes'>check your email</p>:<></>}  
                    
                    </td>

            </tr>
        })}
       
    </tbody>
</table>


</div>




                       </div>

                       </div>

                       </div>
                       
  )
}

export default Mycart
