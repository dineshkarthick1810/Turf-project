import React, { useState } from 'react'
import  { useForm }  from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../../src/login.css"


const schema = yup.object({
    username: yup.string().required("This field is mandatory").max(10, "maximum should be 10 characters"),
    mail: yup.string().email("enter a valid email").required("This field is mandatory"),
    password: yup.string().required("This field is mandatory").min(8, "minimum 8 characters required"),
    repassword: yup.string().oneOf([yup.ref('password'), null], "Passwords does not match")
});

const Signup = ({handlelogin,setrole,role}) => {
    
    
    const {register,formState:{errors},handleSubmit}=useForm({resolver:yupResolver(schema)})
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [type,settype]=useState(true)
    const [Error,setError]=useState(false)
   
    

    // hanlde reqest and response of adminusers
    const handledata=async (data)=>{
       data.role=role
     console.log(Error)
    


     try{
        const Fetching=await fetch("https://turf-project-04az.onrender.com/api/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
         }).then((res)=>res.json()).then((data)=>{
            if(data.message){
                 setError(data.message)
                
                
            }
            else{
                sessionStorage.setItem("id",JSON.stringify(data.id))
                sessionStorage.setItem("role",JSON.stringify(data.role))
                if(role=="admin" ){
                        navigate("/admin")                    
                   }
                   else if(role=="user"){
                    navigate("/users")
                   }
            }
           
         })
     }catch(err){
        console.log(err)
     }
    
   
    
    

     
       
        

    }
    console.log(Error)
    const hanldeType=()=>{
        settype((prev)=>!prev)
    }
    
    
  return (
    
  
   <>
       <form style={{ padding: "10px", width: "100%", height: "100%", borderRadius: "40px" }}  onSubmit={handleSubmit(handledata)}>
                
               {Error && <p className='text-danger' style={{fontWeight:"bold"}}>{Error}</p>}
                   <div className='row'>
                                   <div className='col'>
                                       <label htmlFor="username" style={{ fontWeight: "bold" }}>Username :</label>
                                       <input type='text' className='form-control mt-2 forlogin' style={{ padding: "8px", border: "2px solid grey",width:"100%" }} id="username" {...register("username")}/>
           
                                   </div>
                                   {errors.username?<span className='ms-1 mt-1 text-danger' style={{fontWeight:"bold"}}>{errors.username.message}</span>:<div></div>}
           
           
                               </div>
                               <div className='row mt-2'>
                                   <div className='col'>
                                       <label htmlFor="mailid" style={{ fontWeight: "bold" }}>mail :</label>
                                       <input type='mail' className='form-control mt-2 forlogin' style={{ padding: "8px",  border: "2px solid grey" ,width:"100%"}} id="mailid" {...register("mail")} />
           
                                   </div>
                                   {errors.mail?<span className='ms-1 mt-1 text-danger' style={{fontWeight:"bold"}}>{errors.mail.message}</span>:<div></div>}
           
           
                               </div>
           
                               <div className='row mt-2'>
                                   <div className='col'>
                                       <label htmlFor="password" style={{ fontWeight: "bold" }}>password :</label>
                                       <input type="password" className='form-control mt-2 forlogin' style={{ padding: "8px", border: "2px solid grey",width:"100%" }} id="password"  {...register("password")}/>
           
                                   </div>
                                   {errors.password?<span className='ms-1 mt-1 text-danger' style={{fontWeight:"bold"}}>{errors.password.message}</span>:<div></div>}
           
           
                               </div>
                               <div className='row mt-2'>
                                   <div className='col'>
                                       <label htmlFor="repassword" style={{ fontWeight: "bold" }}>confirm password :</label>
                                       <input type={type?"password":"text"} className='form-control mt-2 forlogin' style={{ padding: "8px", border: "2px solid grey" ,position:"absolute",width:"90%"}} id="repassword" {...register("repassword")}   />
                                       <span style={{fontSize:"20px",position:"relative",left:"250px",top:"40px"}} onClick={hanldeType}>{<VisibilityIcon/>}</span>
                                       
                                       {errors.repassword?<span className='ms-1 mt-1 text-danger ' style={{fontWeight:"bold",marginTop:"100px"}}>{errors.repassword.message}</span>:<div></div>}
                                   </div>
                                  
           
           
                               </div>
                               <div style={{ display: "flex", justifyContent: "center" ,marginTop:"70px"}} className=''>
                                   <button className='btn btn-warning text-white text-center' type='submit'>Sign up</button>
           
                               </div>
                               <div style={{ display: "flex", justifyContent: "center" }} className='mt-3'>
                                   <p className='text-muted'>Already have an account?<a href='#' className='text-decoration-none' onClick={handlelogin} >login</a></p>
                               </div>
           
                           </form>
                           </>
        
                        
                  
  )
}

export default Signup
