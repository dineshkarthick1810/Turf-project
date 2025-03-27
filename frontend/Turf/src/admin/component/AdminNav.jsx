import React, { useEffect, useRef, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material';
import "../../App.css"




const AdminNav = () => {
  const data = useSelector((state) => {
    return state.products.Products
  })
  
const navigate=useNavigate()
  
 const inputRef=useRef()
 const [Image,setImage]=useState(sessionStorage.getItem("imageUrl")  || null)

const handleClick=()=>{
  inputRef.current.click()
}


  const handleImage=(e)=>{
    const image=e.target.files[0]
    console.log(image)
    const formdata=new FormData()
    formdata.append("image",image)
    formdata.append("id",JSON.parse(sessionStorage.getItem("id")))
    formdata.append("role",JSON.parse(sessionStorage.getItem("role")))
  
    try{
      const uploadprofile=fetch("https://turf-project-04az.onrender.com/api/profile",{
        method:"POST",
        body:formdata,
        
      }).then((res)=>res.json()).then((val)=>{
        console.log(val)
        setImage(val.image)
        sessionStorage.setItem("imageUrl",val.image)
      })
  
    }catch(err){
      console.log(err)
  
    }
    
  
  
   }

 
//handleLogout 
const handleLogout=()=>{
sessionStorage.removeItem("id")
sessionStorage.removeItem("imageUrl")
sessionStorage.removeItem("role")
navigate("/")

}
  return (
    <div className='container-fluid bg-dark ' style={{width:"100vw"}} >
      <nav className='navbar container navbar-expand-xl bg-dark'  >
        
        <div style={{ display: "flex" }}>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCyySgrkCpLIo-rZ2eJ8938WLhEYLotTtvag&s" className='navbar-brand' style={{ height: '70px', width: "70px", borderRadius: "50%" }} />
            
          </div>
          <div>
            <span className='text-warning' style={{ fontWeight: "bold", fontSize: "25px" }}>premium</span>
            <p className='text-white ms-4' style={{ fontWeight: "bold", fontSize: "16px" }}>Turf</p>
          </div>
        </div>

        <button className="navbar-toggler bg-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"  >
      <span className="navbar-toggler-icon " ></span>
    </button>
        

        <div className="collapse navbar-collapse offcanvas offcanvas-end bg-dark" style={{marginLeft:"260px",width:"250px"}} id="offcanvas">
          <div className='offcanvas-header'>
            <span className='btn-close ms-5' data-bs-dismiss="offcanvas"></span>

          </div>
          <div className='offcanvas-body'>
            <ul className="navbar-nav ">
              <li className="nav-item me-4 mt-2" style={{ fontWeight: "bold",position:"relative" }}>
                <NavLink className="nav-link  text-white"  aria-current="page" to="/admin/dashboard">Dashboard</NavLink>
                {data.length>=1? <p  className='fordot '></p>:<p></p> }
              
              </li>
              <li className="nav-item text-white me-4 mt-2" style={{ fontWeight: "bold" }}>
                <NavLink className="nav-link text-white" to="/admin">Addproduct</NavLink>
              </li>
              <li className="nav-item text-white me-4 mt-2" style={{ fontWeight: "bold" }}>
                <NavLink className="nav-link text-white" to="/admin/myProduct">myProducts <span className='badge bg-danger pill rounded'>{data.length}</span></NavLink>
              </li>
              <li className="nav-item text-white me-4 mt-2" style={{ fontWeight: "bold" }}>
                <NavLink className="nav-link text-white" to="/admin/bookings">Bookings</NavLink>
              </li>

              <li className="nav-item text-white me-4 mt-2" style={{ fontWeight: "bold" }} onClick={()=>handleLogout()}>
                <NavLink className="nav-link text-white" to="" >Logout</NavLink>
              </li>

              <li className="nav-item text-white me-4 mt-2" style={{ fontWeight: "bold" }} onClick={handleClick}>
                
                <input type='file' ref={inputRef}  onChange={(e)=>handleImage(e)} style={{display:"none"}}/>
                {Image?<Avatar alt="Remy Sharp" src={`https://turf-project-04az.onrender.com/uploads/${Image}`}    sx={{ width: 50, height: 50 }}/>:<Avatar src="data:image/jpeg;base64,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"   sx={{ width: 50, height: 50 }} />}
                
              </li>
              
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AdminNav;
