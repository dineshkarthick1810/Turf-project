import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

const Navbar = ({setrole,role,handlerole}) => {
 
  return (
    <div className='container-fluid bg-dark' >
    <nav className='navbar container  bg-dark' style={{display:"flex",justifyContent:"space-between",height:"80px",alignItems:"center"}}>
        <div style={{display:"flex"}}>
            <div className='' >
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCyySgrkCpLIo-rZ2eJ8938WLhEYLotTtvag&s"  className='navbar-brand ' style={{borderRadius:"50%",height:"70px",width:"70px"}} />
        </div>
        <div className=''> 
            <span className='text-warning' style={{fontWeight:"bold",fontSize:"25px"}}>premium</span>
            <p  className='text-white ms-4' style={{fontWeight:"bold",fontSize:"16px"}}>Turf</p>
           
        </div>
        
       

        </div>
        
        
        
        
           <div>
           <div className="dropdown">
  <button className="btn btn-dark dropdown-toggle" href="#"  data-bs-toggle="dropdown" >
    {role}
  </button>

  <ul class="dropdown-menu " style={{marginRight:"100px"}}>
    <li><button className="dropdown-item me-5"   onClick={(e)=>handlerole(e)}>user</button></li>
    <li><button className="dropdown-item me-5"  onClick={(e)=>handlerole(e)}>admin</button></li>
  </ul>
  </div>
           </div>

        
        

    </nav>
    </div>
  )
}

export default Navbar
