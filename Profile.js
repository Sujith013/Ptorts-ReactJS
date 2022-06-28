import React, { useState } from 'react';
import '../App.css';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth0 } from "@auth0/auth0-react";
import Axios from 'axios';
import {Table} from 'reactstrap';

function Profile()
{
    const [name,setName] = useState("");
    const [mobile,setMobile] = useState("");
    const [dob,setDOB] = useState("");
    const [gender,setGender] = useState("");

    const {isAuthenticated,user} = useAuth0();


    if(!isAuthenticated)
    {
    return(
        <div className='pflnot'>
            <div>
               <div> 
            <FaUserCircle className="usrcrcl"/>
            </div>
                <p style={{paddingTop:"10vh",textAlign:"center"}}>You are currently viewing this page as a <b>guest</b>.</p>
                <p style={{textAlign:"center"}}>Please login to continue</p>
            </div>
        </div>
    );
    }

    if(isAuthenticated)
    {    
        Axios.post('http://localhost:5000/profile',{
            
        email:user.email,

        }).then((res,req)=>{
            setGender(res.data.gender);
            setName(res.data.name);
            setMobile(res.data.mobile);
            setDOB(res.data.dob);
        });

    return(
        <div className='pflyes'>
            <Table bordered hover responsive className='ptbl'>
                <tbody>
                <tr>
                    <td id="r1">Name</td>
                    <td id="r2">{name}</td>
                </tr>
                <tr>
                    <td id="r1">Mobile</td>
                    <td id="r2">{mobile}</td>
                </tr>
                <tr>
                    <td id="r1">Email</td>
                    <td id="r2">{user.email}</td>
                </tr>
                <tr>
                    <td id="r1">DOB</td>
                    <td id="r2">{dob}</td>
                </tr>
                <tr>
                    <td id="r1">Gender</td>
                    <td id="r2">{gender}</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
    }
}

export default Profile