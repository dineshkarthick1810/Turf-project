import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Frontpage from '../../frontpage/Frontpage';

const Protected = ({role}) => {
    console.log(role)
  
 
  return(
    <>
    {role=="admin" || sessionStorage.getItem("role") ? <Outlet/>:<Navigate to="/"/>}
    </>
   
  )
};

export default Protected;
