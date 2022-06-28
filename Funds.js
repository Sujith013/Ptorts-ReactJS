import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Input} from 'reactstrap'; 
import { ethers } from "ethers";
import polygon from '../polygon.png';

const startPayment = async ({ setError, setTxs, ether, addr }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
  
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      });
      console.log({ ether, addr });
      console.log("tx", tx);
    } catch (err) {
      console.log(err.message);
    }
  };

function Funds()
{
   const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target); console.log(data);
        await startPayment({
          ether: data.get("amount"),
          addr: "0xB3d45c583Af093d2511e0EE67e13891DEfa701f1"
        });
      };    

return(
    <div className='fundsc'>

    <div>
        
        <img src={polygon}  alt="polygon" className='polyimg'/>

        <Form className='contributeForm' onSubmit={handleSubmit}>
            <Input type="text" className='ff' name="amount" placeholder='Polygon token amount' style={{width:"30vw"}}/>
            <Input type='submit' value="Donate" className='donbt' />
        </Form>
        
        </div>
    </div>
)
}

export default Funds;