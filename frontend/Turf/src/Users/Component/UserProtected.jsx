import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Frontpage from '../../frontpage/Frontpage'

const Protected = ({role}) => {
  console.log("from user protected page")
  return (
    <>
   {role=="user" || sessionStorage.getItem("role")?<Outlet/>:<Navigate to="/"/>}
    </>
  )
}

export default Protected
