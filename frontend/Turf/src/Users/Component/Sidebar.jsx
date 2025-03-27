import React, { useRef, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { Link, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import "./user.css"
import Tooltip from '@mui/material/Tooltip';


const Sidebar = () => {
  const navigate=useNavigate()
  const inputref=useRef()
  const [Image,setImage]=useState(null ||  sessionStorage.getItem("imageUrl"))
  console.log(Image)
  const handleprofile=()=>{
    inputref.current.click()
    


  }
  const [toggleState,setToggleState]=useState(false)
  const handleToggler=()=>{
    setToggleState((prev)=>!prev)
    
  }
 

  //handling profile and render data
const handleImage=async(e)=>{
  const image=e.target.files[0]
  const formdata=new FormData()
  formdata.append("image",image)
  formdata.append("id",JSON.parse(sessionStorage.getItem("id")))
  formdata.append("role",JSON.parse(sessionStorage.getItem("role")))
  try{
    const uploadProfile=await fetch("https://turf-project-04az.onrender.com/api/profile",{
      method:'POST',
      body:formdata,
      mode:"cors"

    }).then((res)=>res.json()).then((val)=>{
      console.log(val)
      setImage(val.image)
      sessionStorage.setItem("imageUrl",val.image)

    })
  }catch(err){
    console.log(err)
  }
}

//handle logout

const handleLogout=()=>{
  sessionStorage.removeItem("id")
  sessionStorage.removeItem('imageUrl')
  sessionStorage.removeItem("role")
  navigate("/")

}

  
  return (
    <div style={ {width:"70px",backgroundColor:"#151A2D",borderRadius:"16px"}}>
      
      <div className='mt-1 ' style={{display:"flex",justifyContent:"space-between"}}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCyySgrkCpLIo-rZ2eJ8938WLhEYLotTtvag&s"  className='img-fluid ms-2' style={{borderRadius:"50%",height:"60px",width:"60px"}} />

     

      </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:'space-between',height:"90vh"}}>

     
      <nav className='navbar mt-5'>
        <ul className='navabr-nav list-unstyled'>
<div style={{display:"flex",marginLeft:"15px",marginTop:"10px"}} className='forhover'>
  <Link to="/users">
  
  <Tooltip title="Home" placement='right-end'>
  <p className='text-white mt-1' ><HomeIcon style={{fontSize:"22px"}}/></p>
  </Tooltip>
  </Link>



</div>


<div style={{display:"flex",marginLeft:"15px",marginTop:"10px"}} className='forhover'>
<Link to="/users/Mycart">

  <Tooltip title="Mycart" placement='right-end'>
  <p className='text-white mt-1' ><ShoppingCartIcon style={{fontSize:"22px"}}/></p>
  </Tooltip>

  </Link>



</div>

<div style={{display:"flex",marginLeft:"15px",marginTop:"10px"}} className='forhover'>
<Link to="/users/Dashboard">

  <Tooltip title="Dashboard" placement='right-end'>
  <p className='text-white mt-1' ><DashboardIcon style={{fontSize:"22px"}}/></p>
  </Tooltip>
  </Link>



</div>
        
        </ul>

      </nav>

      

      
          <div  className='list-unstyled'>
            <div onClick={handleprofile} className=''>
        {Image?<Avatar alt="Remy Sharp" src={`https://turf-project-n38p.vercel.app/images/${Image}`}     sx={{ width: 40, height: 40 }}  className='ms-2'/>:<Avatar src="data:image/jpeg;base64,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"   sx={{ width: 40, height: 40 }} className='ms-3' />}
                
        <input type='file' ref={inputref} style={{display:"none"}} onChange={(e)=>handleImage(e)}/>
        </div>
        <div  className='ms-3 mt-3' >



        <Tooltip title="Logout" placement='right-end'>
  <p className='text-white mt-1'  onClick={()=>handleLogout()}><LogoutIcon style={{fontSize:"22px"}} /></p>
  </Tooltip>

   


          
          </div>
        
        </div>
     
      </div>
      
    </div>
  )
}

export default Sidebar
