import React, { useState } from 'react'
import Navbar from './Navbar'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Signup from './Signup';
import Login from './Login';






const Frontpage = ({handlelogin,setlogin,login,setrole,role,handlerole,error,setError}) => {
    
    const [show, setShow] = useState(false);
    const [alert,setalert]=useState(false)

    const handleShow = () => setShow(true);
    const handleclose=()=> setShow(false)
    
   
    
    
    
    return (
        <div style={{backgroundImage:"url(ground.jpeg)",backgroundRepeat:"no-repeat",backgroundSize:"cover",height:"100vh",overflow:"hidden"}}>
            <div className='mt-2'>
                <Navbar setrole={setrole} role={role} handlerole={handlerole}/>
            </div>

            <div className='container-fluid' style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", flexDirection: "column" }}>
                <DotLottieReact
                    src='cricket.json'
                    loop
                    autoplay
                />
                 <Button variant="warning" style={{fontWeight:"bold"}}  className='text-white' onClick={handleShow}>
        Let's play
      </Button>




            </div>
            <Modal
     show={role=="admin" || role=="user" ? show:false} 
     centered
    >
      <Modal.Header >
       <button className="btn-close" onClick={()=>handleclose()}></button>
      </Modal.Header>
      <Modal.Body>
      {login?<Login handlelogin={handlelogin} setrole={setrole} role={role} />:<Signup handlelogin={handlelogin}  setrole={setrole} role={role} />}
      </Modal.Body>
     
    </Modal>


            
    
   






           

           



        </div>
    )
}

export default Frontpage
