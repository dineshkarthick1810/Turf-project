import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from "./Sidebar"
import Search from "./Search"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { addReviews } from '../../redux/slice/Users/Reviews'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ToastContainer, toast } from 'react-toastify';
import "../../App.css"

const Product = ({ Phonenumber,shopname }) => {

    const dispatch=useDispatch()

    useEffect(()=>{
        const getReviews=async()=>{
            const Reviews=await fetch("https://turf-project-04az.onrender.com/api/reviews").then((res)=>res.json()).then((val)=>{
                dispatch(addReviews(val))
            })

        }
        getReviews()

    },[])

   const Reviews=useSelector((state)=>{
    return state.reviews. Reviews
   })
   console.log(Reviews)

   //filterd particlar reviews for rendering reviews on that page 

const filteredReviews=Reviews.filter((val,index)=>{
    return val.shopname==shopname

})
console.log(filteredReviews)



//selecting allprodcts to showcase to the Users
    const AllDatas = useSelector((state) => {
        return state.Allproducts.AllProducts
    })

    const filteredData = AllDatas.filter((val, index) => {
        return val.phonenumber == Phonenumber

    })


    //time slots 

    const Timeslots = ["9-10 am", "10-11 am", "11-12 am", "12-1 pm", "1-2 pm", "2-3 pm", "3-4 pm", "4-5 pm", "5-6 pm", "6-7 pm", "7-8 pm", "8-9 pm", "9-10 pm"]
    const [slots, setSlots] = useState("Time slots")
    const handleSlots = (e) => {
        setSlots(e.target.innerText)



    }

    console.log(filteredData)

    //handling date 
    const [date, setDate] = useState("")
    const handleDate = (e) => {
        setDate(e.target.value)


    }


    //handling bookings details 

    const handleBooking = async (id, shopname) => {
        const datas = {
            Adminid: id,
            Userid: JSON.parse(sessionStorage.getItem("id")),
            date: date,
            time: slots,
            groundname: shopname,
            approved:false,
            decline:false
        }
        console.log(datas)
        const Bookings = await fetch("https://turf-project-04az.onrender.com/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datas),
            mode:"cors"

        }).then((res)=>res.json()).then((val)=>{
            if(val.message){
                toast.success("Bookings succesfull")
            }
        })

    }

    
    return (
        <div className='container-fluid' style={{overflowX:"hidden"}}>


            <div style={{overflowY:"scroll", display: "flex"}} className='bg-primary-subtle'>


                <div >
                    <Sidebar />
                </div>

                <div style={{ width: "100%" }}>
                    <Search />


                    {filteredData.map((val, index) => {

                        return <div>
                            <div className='row mt-5 '   >
                                <div className='col-md-4'>
                                    <img src={`http://localhost:3002/images/${val.image}`} className='img-fluid' style={{ borderRadius: "10px" }} />
                                </div>

                                <div className='col-md-8 forproduct'>
                                    <div className='card shadow'>
                                        <div className='card-header bg-dark'>
                                            <p className='text-white' style={{ fontWeight: "bold" }}>{val.shopname}</p>
                                        </div>

                                        <div className='card-body'>
                                            <p className='text-secondary' style={{ fontWeight: "bold" }}> Description :</p>
                                            <p className='' style={{ fontWeight: "bold" }}>{val.description}</p>

                                            <p className='text-danger' style={{ fontWeight: "bold" }}>Note: The price mentioned below are for 1 hour</p>

                                        </div>

                                        <div className='card-footer'>
                                            <p className='text-center' style={{ fontWeight: "bold" }}>Price :<span> ${val.price}</span></p>

                                            <div className='d-flex mt-4'>
                                                <input type="date" onChange={(e) => handleDate(e)} className='form-control' style={{ width: '200px' }} />

                                                <div className='dropdown ms-5 mt-2 dropend'>
                                                    <p className='dropdown-toggle btn btn-secondary' data-bs-toggle="dropdown">{slots}</p>

                                                    <ul className="dropdown-menu">
                                                        {Timeslots.map((res, index) => {
                                                            return <li className='dropdown-item' onClick={(e) => handleSlots(e)} style={{ cursor: "pointer" }}>{res}</li>
                                                        })}


                                                    </ul>


                                                </div>






                                            </div>

                                            <div className='mt-4 mb-2' style={{ display: "flex", justifyContent: "center" }}>  <button className='btn btn-dark text-white ' onClick={() => handleBooking(val.id, val.shopname)}>Book Now</button></div>
                                            <ToastContainer/>


                                        </div>

                                    </div>

                                </div>


                            </div>
                        </div>
                    })}



{/* reviews section */}
<div className='' style={{marginTop:"100px",height:"200px",overflowY:"scroll",overflowX:"scroll"}}>
<p style={{fontWeight:"bold",fontSize:"20px"}} className="ms-3  badge bg-warning text-white">Reviews</p>
{filteredReviews.map((res,index)=>{

    return <>
    <div  className='mt-3' style={{display:"flex",justifyContent:"space-between"}}>
    <div style={{display:"flex"}}>
    <img src={`https://turf-project-04az.onrender.com/images/${res.profile}`} style={{height:"60px",width:"60px",borderRadius:"50%",backgroundSize:"cover"}} />
    <p className='text-secondary ms-5' style={{fontWeight:"bold"}} >{res.username}</p>
    </div>
    
    {/* star sectionn */}
    
    <div style={{display:"flex"}}>
  
    {
    [...Array(res.starcount)].map((val,index)=>{
        return <StarBorderIcon className="ms-2 text-waring bg-warning"/>
    })
    }
    

    
    </div>
   
    
    </div>
    <p>{res.reviews}</p>
    <hr/>

    </>
})}

</div>

 





                </div>
            </div>

        </div>
    )
}

export default Product
