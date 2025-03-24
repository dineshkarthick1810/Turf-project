import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Frontpage from './frontpage/Frontpage';
import Admin from './admin/component/Admin';
import Myproduct from './admin/component/Myproduct';
import Protected from "../src/admin/component/Protected"
import Bookings from "../src/admin/component/Bookings"
import ProductDetails from './admin/component/ProductDetails';
import UserProtected from "../src/Users/Component/UserProtected"
import Home from './Users/Component/Home';
import Product from './Users/Component/Product';
import Reviews from './Users/Component/Reviews';
import Mycart from './Users/Component/Mycart';
import Dashboard from './Users/Component/Dashboard';
import AdminDashboard from "../src/admin/component/Dashboard"
const App = () => {
  const [shopname,setShopname]=useState("")
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState('select role');
  const [Phone,setPhoneNumber]=useState("")
  // const [shopname,setShopname]=useState("")
 
  const handlerole = (e) => {
    setRole(e.target.innerText);  
  };

  const handlelogin = () => {
    setLogin((prev) => !prev);  
  };

  const FilteringProducts=(val,shopname)=>{
    setPhoneNumber(val)
    setShopname(shopname)


  }

//handling ground name send to reviews page

const handlegroundname=(shopname)=>{
  setShopname(shopname)

}



  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Frontpage handlelogin={handlelogin} setLogin={setLogin} login={login} setRole={setRole}  role={role} handlerole={handlerole} />}
       role={role} />
        
        {/* Protected Admin Route with AdminNav */}
        <Route element={<Protected role={role}/>}>
        <Route path='/admin' element={<Admin />}/>
        <Route  path='/admin/myproduct' element={<Myproduct FilteringProducts={FilteringProducts}/>}/>
        <Route path='/admin/ProductDetails' element={<ProductDetails Phonenumber={Phone}/>} />
        <Route  path='/admin/bookings' element={<Bookings />}/>
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        
        </Route>

{/* protected user rotes */}
        <Route element={<UserProtected role={role}/>}>
        <Route path='/users' element={<Home FilteringProducts={FilteringProducts} handlegroundname={handlegroundname}/>} />
        <Route path='/users/Details' element={<Product Phonenumber={Phone} shopname={shopname} />}/>
        <Route path="/users/review" element={<Reviews shopname={shopname}/>} />
        <Route path='/users/Mycart' element={<Mycart/>}/>
        <Route path='/users/Dashboard' element={<Dashboard/>}/>
        </Route>
          
        
       
       
       
        
        
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
