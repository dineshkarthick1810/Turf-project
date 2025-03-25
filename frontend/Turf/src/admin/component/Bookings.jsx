import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminNav from './AdminNav'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../App.css"



const Homepage = () => {
  const [bookings,setBookings]=useState([])
  useEffect(()=>{

    const fetchBookings=async()=>{
      const Bookings=await fetch("https://turf-project-04az.onrender.com/api/bookings").then((res)=>res.json()).then((val)=>{
        setBookings(val)
        
      })


    }

    fetchBookings()

  },[])

  
console.log(bookings)
  //filterd bookings
  const filterBookings=bookings.filter((res,index)=>{
    return res.Adminid==JSON.parse(sessionStorage.getItem("id"))
  })

  console.log(filterBookings)

  const handleApprove=async (mailid,groundname,username)=>{
    //processing for mail to users using nodemailer and send user maild to server to send email to that user

    const sendEmail=await fetch("https://turf-project-04az.onrender.com/api/sendEmail",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({mail:mailid,groundname:groundname,username:username}),
      mode:"cors"

    }).then((res)=>res.json()).then((val)=>{
      if(val){
        toast.success("approved..!")
      }
    })

   
    const sendId= await  fetch("https://turf-project-04az.onrender.com/api/bookings",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({groundname}),
      mode:"cors"
    }).then((res)=>res.json()).then((val)=>{
      console.log(val)
      
    })


   
  }
  //handling decline feature

  const handleDecline=(groundname)=>{
    const PostDetails=fetch("https://turf-project-04az.onrender.com/api/bookings",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({status:"decline",groundname:groundname}),
      mode:'cors'
    }).then((res)=>res.json()).then((val)=>{
      console.log(val)
    })

  }

  

  
  return (
    <div style={{overflowX:"hidden"}}>
      <AdminNav/>
      <div className="container table-responsive" >

        <table className='table table-dark table-striped mt-5 fortable '>
          <thead>
            <tr>
              <th>username</th>
              <th>groundname</th>
              <th>date</th>
              <th>time</th>
              <th>status</th>
            </tr>
          </thead>

      
      


          <tbody >
          {filterBookings.map((val,index)=>{
          return  <tr>
          <td>{val.username}</td>
          <td>{val.groundname}</td>
          <td>{val.date}</td>
          <td>{val.time}</td>
          <td style={{display:"flex"}}>
            {val.approved? <p className='btn btn-success text-white' style={{fontWeight:"bold"}}>Approved</p> :<div style={{display:"flex"}}>
              {val.decline ?<p className='text-white btn btn-danger' style={{fontWeight:"bold"}}>Declined</p>:
              <div style={{display:"flex"}}>
              <button className="btn btn-warning text-white" style={{fontWeight:"bold"}} onClick={()=>handleApprove(val.mailid,val.groundname,val.username,val.groundname)}>Approve</button>
            <ToastContainer/>
            <button className="btn btn-danger ms-3 text-white" style={{fontWeight:"bold"}} onClick={()=>handleDecline(val.groundname)}>Decline</button>
              </div>}
              
          
            </div>}
            
          </td>

          </tr>
          })}

          </tbody>

       
       



</table>
  
           
              
  
  
  
            
  
      
     
        </div>
     
      


      
    </div>
  )
}

export default Homepage
