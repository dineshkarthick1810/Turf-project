import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { addproduct } from '../redux/slice/Products';
import { useDispatch } from 'react-redux';
import "../../src/login.css"

const schema=yup.object({
    mail:yup.string().email("enter Valid email").required("This filed is mandatory"),
    password:yup.string().required("This filed is mandatory")
})


const Login = ({handlelogin,setrole,role}) => {
    console.log(role)
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })
    
    const [Error,setError]=useState("")
    const navigate=useNavigate()
    const dispatch=useDispatch()

const handledata=(data)=>{
console.log(data)
data.role=role
    try{
        const uploadData=fetch('https://turf-project-n38p.vercel.app/api/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        }).then((val)=>val.json()).then((res)=>{

console.log(res)
if(res.error){
    console.log(res.error)
    setError(res.error)
    

}
else{
    if(res.messages.role=="admin"){
               
        sessionStorage.setItem("role",JSON.stringify(res.messages.role))
        sessionStorage.setItem("id",JSON.stringify(res.messages.id))
        sessionStorage.setItem("imageUrl",JSON.stringify(res.messages.profileimage))
        dispatch(addproduct(res.products))
        navigate("/admin")

    }
    else{
        console.log(res)
        sessionStorage.setItem("role",JSON.stringify(res.messages.role))
        sessionStorage.setItem("id",JSON.stringify(res.messages.id))
        sessionStorage.setItem("imageUrl",JSON.stringify(res.messages.profileimage))
        navigate("/users")
    }

}
           

            
           
          
           
          
           
            
        })

    }catch(err){
        console.log(err)

    }



}
    
  return (
    <div>
    
        <form style={{ padding: "10px", width: "100%", height: "100%", borderRadius: "40px" }} onSubmit={handleSubmit(handledata)}  >

            {Error ? <p className='text-danger' style={{fontWeight:"bold"}}>{Error}</p>:<div></div>}
        <div className='row mt-2 '>
    <div className='col'>
        <label for="mailid" style={{ fontWeight: "bold" }} >mail :</label>
        <input type='mail' className='form-control mt-2 forlogin'  style={{ padding: "8px", border: "2px solid grey" ,width:"100%"}} id="mailid" {...register("mail")}  />
        {errors.mail? <p className='text-danger' style={{fontWeight:"bold"}}>{errors.mail.message}</p>:<div></div>}

    </div>


</div>

<div className='row mt-2 '>
    <div className='col' >
        <label for="password" style={{ fontWeight: "bold" }} >password :</label>
        <input type='password' className='form-control mt-2  forlogin ' style={{ padding: "8px", border: "2px solid grey" ,width:"100%"}} id="password"  {...register("password")} />
        {errors.password? <p className='text-danger' style={{fontWeight:"bold"}}>{errors.password.message}</p>:<div></div>}

    </div>


</div>
<div style={{ display: "flex", justifyContent: "center" }} className='mt-3'>
    <button className='btn btn-warning text-white text-center' type='submit' >Log In</button>

</div>

<div style={{ display: "flex", justifyContent: "center" }} className='mt-3'>
    <p className='text-muted'>Create account?<a href='#' className='text-decoration-none' onClick={handlelogin} >signup</a></p>
</div>

        </form>
   




</div>
  )
}

export default Login
