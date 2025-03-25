import React,{useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import Sidebar from './Sidebar'
import Search from './Search'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ToastContainer, toast } from 'react-toastify';

const Schema = yup.object({
    reviews: yup.string().required("This filed is mandatory")
})
const Reviews = ({shopname}) => {

    const { register, formState: { errors }, handleSubmit } = useForm({

        resolver: yupResolver(Schema)
    })

   let count=0
    const handleRating=(e)=>{
        const Icon=e.target
        count+=1
        Icon.style.color="yellow"



    }
    console.log(count)
    //handlereviews...

    const handleData =async (data) => {
        data.starCount=count
        data.id=JSON.parse(sessionStorage.getItem("id"))
        data.shopname=shopname
        console.log(data)

        const postReviews=await fetch("https://turf-project-04az.onrender.com/api/reviews",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then((res)=>res.json()).then((val)=>{
            
            if(val.message){
                const review=document.getElementById("review")
                review.value=""
                toast.success("review added")
            }
        })


    }
    return (
        <div>

            <div style={{ overflow: "hidden", display: "flex" }} className='bg-primary-subtle'>

                <div >
                    <Sidebar />

                </div>


                <div style={{ width: "100%" }}>

                    <Search />

                    <div className='row mt-4' >
                        <div className=' col-sm-12 ' style={{display:"flex",justifyContent:"center",alignItems:"center",height:"80vh"}}>

                            <div className='card shadow' style={{borderRadius:"15px",width:"100%"}} >
                                <form onSubmit={handleSubmit(handleData)} className='p-5' >

                                    <textarea className='form-control' id="review" {...register("reviews")} style={{height:"150px",border:"3px solid grey",width:"100%"}} placeholder='Add comments'></textarea>
                                    {errors.reviews ? <p className='text-danger' style={{ fontWeight: "bold" }}>{errors.reviews.message}</p> : <p></p>}

                                    <div style={{display:"flex"}}>
                                        <StarBorderIcon style={{fontSize:"35px"}} onClick={(e)=>handleRating(e)} />
                                        <StarBorderIcon style={{fontSize:"35px"}} className='ms-2' onClick={(e)=>handleRating(e)} />
                                        <StarBorderIcon style={{fontSize:"35px"}}  className='ms-2' onClick={(e)=>handleRating(e)}/>
                                        <StarBorderIcon style={{fontSize:"35px"}}  className='ms-2' onClick={(e)=>handleRating(e)}/>
                                        <StarBorderIcon style={{fontSize:"35px"}}  className='ms-2' onClick={(e)=>handleRating(e)}/>
                                    </div>

<div className=' mt-4' style={{display:"flex",justifyContent:"center"}}>
<button type='submit' className='btn btn-warning text-white' style={{fontWeight:"bold"}}>Add</button>
<ToastContainer/>
</div>
                                   
                                </form>

                            </div>
                        </div>
                    </div>



                </div>


            </div>



        </div>
    )
}

export default Reviews
