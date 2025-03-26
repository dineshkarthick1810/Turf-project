import React, { useState } from 'react'
import AdminNav from './AdminNav'
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { addproduct } from '../../redux/slice/Products';
import { useDispatch } from 'react-redux';



const schema = yup.object(
  {
    name: yup.string().required("This field is required"),
    shopname: yup.string().required("This field is required"),
    phonenumber: yup.string().required("This field is required").min(10, "invalid number").max(10, "invalid number"),
    address: yup.string().required("address is required"),
    price: yup.string().required("price is mandatory"),
    description: yup.string().required("This field is mandatory"),
    location:yup.string().required("This field is mandatory")
  }
)






const Admin = () => {

 const location=[
    { "district": "Chennai" },
    { "district": "Coimbatore" },
    { "district": "Madurai" },
    { "district": "Tiruchirappalli" },
    { "district": "Salem" },
    { "district": "Tirunelveli" },
    { "district": "Erode" },
    { "district": "Tiruppur" },
    { "district": "Vellore" },
    { "district": "Thoothukudi" },
    { "district": "Dindigul" },
    { "district": "Cuddalore" },
    { "district": "Kanchipuram" },
    { "district": "Thanjavur" },
    { "district": "Karur" },
    { "district": "Namakkal" },
    { "district": "Villupuram" },
    { "district": "Pudukkottai" },
    { "district": "Nagapattinam" },
    { "district": "Theni" },
    { "district": "Virudhunagar" },
    { "district": "Ramanathapuram" },
    { "district": "Tenkasi" },
    { "district": "Perambalur" },
    { "district": "Ariyalur" },
    { "district": "Sivaganga" },
    { "district": "Chengalpattu" },
    { "district": "Tiruvannamalai" },
    { "district": "Dharmapuri" },
    { "district": "Krishnagiri" },
    { "district": "Kanyakumari" }
]






  const [image, setImage] = useState(null)
 

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handledata = async (data) => {
    const formdata = new FormData()
    formdata.append("image", image)
    formdata.append("name", data.name)
    formdata.append("shopname", data.shopname)
    formdata.append("phonenumber", data.phonenumber)
    formdata.append("address", data.address)
    formdata.append("price", data.price)
    formdata.append("description", data.description)
    formdata.append("location",data.location)
    formdata.append("id",JSON.parse(sessionStorage.getItem("id")))
    




    try {
      const postData = await fetch("https://turf-project-04az.onrender.com/api/addproducts", {
        method: "POST",
        body: formdata,
        mode:"no-cors"

      }).then((res) => res.json()).then((val) => {
        console.log(val)
        // dispatch(addproduct(val))
      })

    } catch (err) {
      console.log(err)

    }


    const name = document.getElementById("name")
    const shopname = document.getElementById("shopname")
    const phonenumber = document.getElementById("phonenumber")
    const price = document.getElementById("price")
    const address = document.getElementById("address")
    const description = document.getElementById("description")
    const location=document.getElementById("location")
    name.value = ""
    shopname.value = ""
    phonenumber.value = ""
    price.value = ""
    address.value = ""
    description.value = ""
    location.value=""
    toast.success("successfully uploaded")






  }
  const handleimage = (e) => {
    console.log(e.target.files[0])
    setImage(e.target.files[0])
    setName(e.target.files[0].name)

  }
  
  return (
    <div  className='' style={{overflowX:"hidden"}} >
      <AdminNav />





      <div style={{ display: "flex", justifyContent: "center" }}>


        <form className='p-5 shadow mt-5  ' style={{ borderRadius: "20px", borderRight: "5px solid black" }} onSubmit={handleSubmit(handledata)}>

          <div className='row '>
            <div className='col-sm-4'>
              <p style={{ fontWeight: "bold" }}>Name:</p>
            </div>
            <div className='col-sm-8'>
              <input type='text' id="name" className='form-control' style={{ padding: "10px", width: "300px", borderRadius: "6px", border: "2px solid grey" }}  {...register("name")} />
              {errors.name ? <p className='text-danger' style={{ fontWeight: "bold" }}>{errors.name.message}</p> : <p></p>}
            </div>



          </div>
          <div className='row mt-3'>

            <div className='col-sm-4'>
              <p style={{ fontWeight: "bold" }}>shop name:</p>
            </div>
            <div className='col-sm-8'>
              <input type='text' className='form-control' id="shopname" style={{ padding: "10px", width: "300px", borderRadius: "6px", border: "2px solid grey" }}  {...register("shopname")} />
              {errors.shopname ? <p className='text-danger' style={{ fontWeight: "bold" }}>{errors.shopname.message}</p> : <p></p>}
            </div>


          </div>
          <div className='row mt-3'>
            <div className='col-sm-4'>
              <p style={{ fontWeight: "bold" }}>phone:</p>
            </div>
            <div className='col-sm-8'>
              <input type='number' id="phonenumber" className='form-control' style={{ padding: "10px", width: "300px", borderRadius: "6px", border: "2px solid grey" }}  {...register("phonenumber")} />
              {errors.phonenumber ? <p className='text-danger' style={{ fontWeight: "bold" }}>{errors.phonenumber.message}</p> : <p></p>}
            </div>

          </div>
          <div className='row mt-3'>

            <div className='col-sm-4'>
              <p style={{ fontWeight: "bold" }}>address:</p>
            </div>
            <div className='col-sm-8'>
              <input type='text' className='form-control' id="address" style={{ padding: "10px", width: "300px", borderRadius: "6px", border: "2px solid grey" }}  {...register("address")} />
              {errors.address ? <p className='text-danger' style={{ fontWeight: "bold" }}>{errors.address.message}</p> : <p></p>}
            </div>

          </div>

          <div className='row mt-3'>

            <div className='col-sm-4'>
              <p style={{ fontWeight: "bold" }}>price:</p>

            </div>
            <div className='col-sm-8'>
              <input type='number' className='form-control' id="price" style={{ padding: "10px", width: "300px", borderRadius: "6px", border: "2px solid grey" }}  placeholder='(per/hour)' {...register("price")} />
              {errors.price ? <p className='text-danger' style={{ fontWeight: "bold" }}>{errors.price.message}</p> : <p></p>}
            </div>

          </div>

          <div className='row mt-3'>

            <div className='col-sm-4'>
              <p style={{ fontWeight: "bold" }}>image :</p>

            </div>
            <div className='col-sm-8'>
              <input type='file' name='image' className='form-control' style={{ padding: "10px", width: "300px", borderRadius: "6px", border: "2px solid grey" }} id="image" onChange={(e) => handleimage(e)} />

            </div>

          </div>

          <div className='row mt-3'>

<div className='col-sm-4'>
  <label style={{ fontWeight: "bold" }}>Location :</label>

</div>
<div className='col-sm-8'>
 
<select className="form-select" id='location' {...register("location")} style={{width:"300px", borderRadius: "6px", border: "2px solid grey"}}>
  <option selected>select Location</option>
 {location.map((val,index)=>{
  return <option >{val.district}</option>

 })}
</select>
{errors.location? <p className='text-danger' style={{fontWeight:"bold"}}>{errors.location.message}</p>:<p></p>}
  


</div>

</div>



          <div className='row mt-3'>

            <div className='col-sm-4'>
              <label style={{ fontWeight: "bold" }}>description :</label>

            </div>
            <div className='col-sm-8'>
              <textarea class="form-control" id='description' rows="3" style={{ width: "300px", borderRadius: "6px", border: "2px solid grey" }}
                {...register("description")}  ></textarea>

              {errors.description ? <p className='text-danger' style={{ fontWeight: "bold" }}>{errors.description.message}</p> : <p></p>}


            </div>

          </div>

          <div className='mt-4'>
            <button className='btn btn-warning text-white' type='submit'>Add Details</button>
            <ToastContainer />
          </div>









        </form>
      </div>

    </div>
  )
}

export default Admin
