import React, { useState } from 'react';
import '../App.css';
import {NavItem,NavLink,Navbar,Modal, ModalHeader, ModalBody, Form,Input} from 'reactstrap';
import { FaDog } from 'react-icons/fa';
import { useAuth0 } from "@auth0/auth0-react";
import Logout from './Logout';
import Axios from 'axios';

function Header()
{
    const [mdop,setMdop] = useState(false);

    const { loginWithRedirect } = useAuth0();
    const {user,isAuthenticated} = useAuth0();

    function sbtfrm (e){

        e.preventDefault();

        var username = document.getElementById('username').value;
        var mobile = document.getElementById('mobile').value;
        var gender = document.getElementById('gender').value;
        var date = document.getElementById('date').value;
        var email = user.email;
        
        Axios.post('http://localhost:5000/insert',{
            name:username,
            mobile:mobile,
            gender:gender,
            date:date,
            email:email,
        }).then((res,req)=>{
            if(res.status===200)
            {
                setMdop(false);
            }
            console.log(res.status+" "+mdop);
        });
    }

    function ap()
    {
        Axios.post('http://localhost:5000/check',{
            
        email:user.email,

        }).then((res,req)=>{

            if(res.status===200)
                setMdop(true);
                
            else
                setMdop(false);    
        });

   }

    if(isAuthenticated)
    {

     ap();   

     return(
       <div style={{width:"100%"}}>
           <Navbar className='navl' expand="md">
               <NavItem className='nbi'>
               <FaDog className='nbl' />
                   <FaDog className='nbl dog' />
               <NavLink href="/" className='nbd'>
                  PTORTS
               </NavLink>
                   <NavLink href="/Videos" className='nbi'>
                      Videos
                   </NavLink>
                   <NavLink href="/Profile" className='nbi'>
                      Profile
                   </NavLink>
                   <NavLink href="/Pets" className='nbi'>
                      My Pets
                   </NavLink>
                   <NavLink href="/Funds" className='nbi'>
                      Fund
                   </NavLink>
               </NavItem>
               <NavItem className='nbi'>
                   <Logout />
               </NavItem>
           </Navbar>
  
           <Modal isOpen={mdop}>
              <ModalHeader className='mdhdr'>Please Provide the following information</ModalHeader>
              <ModalBody style={{padding:"7vh",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
                  <Form onSubmit={(e)=>sbtfrm(e)}>
                      <Input type="text" id='username' placeholder="Name" required  className='ff'/>
                      <Input type="tel" id='mobile' placeholder="Mobile" required className='ff'/>
                      <Input type="date" id='date' placeholder="DOB" required className='ff'/>
                      <Input type="select" id='gender' required className='ff'>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                          <option>Don't Wish to say</option>
                      </Input>  
                      <Input type="submit" className='frmsub'/>
                  </Form>
              </ModalBody>
           </Modal>
       </div>
     );
  }

  if(!isAuthenticated)
  {
   return(
     <div style={{width:"100%"}}>
         <Navbar className='navl' expand="md">
             <NavItem className='nbi'>
             <FaDog className='nbl' />
                 <FaDog className='nbl dog' />
             <NavLink href="/" className='nbd'>
                PTORTS
             </NavLink>
                 <NavLink href="/Videos" className='nbi'>
                    Videos
                 </NavLink>
                 <NavLink href="/Profile" className='nbi'>
                    Profile
                 </NavLink>
                 <NavLink href="/Pets" className='nbi'>
                    My Pets
                 </NavLink>
                 <NavLink href="/Funds" className='nbi'>
                    Fund
                 </NavLink>
             </NavItem>
             <NavItem className='nbi'>
                 <NavLink onClick={()=>loginWithRedirect()} className='nbi sign in'>
                    Log in
                 </NavLink>
                 <Logout />
             </NavItem>
         </Navbar>

         <Modal isOpen={mdop}>
            <ModalHeader>Sign Up</ModalHeader>
         </Modal>
     </div>
   );
}
}

export default Header; 