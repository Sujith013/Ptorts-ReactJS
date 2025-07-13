import React,{useState,useEffect} from 'react';
import {Form, Input, Modal, ModalBody, ModalHeader, Button, ModalFooter} from 'reactstrap';
import {storage} from './firebase';
import {getDownloadURL,ref,uploadBytes,listAll} from 'firebase/storage';
import { useAuth0 } from "@auth0/auth0-react";
import { FaUserCircle } from 'react-icons/fa';

function Videos()
{
    const {isAuthenticated} = useAuth0();

    const [file, setFile] = useState(null);
    const [videoList, setVideoList] = useState([]);

    const [mdop,setMdop] = useState(false);
    const toggle = () => setMdop(!mdop);

    const videoListRef = ref(storage,"videos/");

    const uploadFile = async (e) => {

        e.preventDefault();

        if(file==null) return;

        var vname = "videos/"+file.name;

        const videoRef = ref(storage,vname);
        
        uploadBytes(videoRef,file).then(()=>{
           var x= document.getElementById("vup");
           x.style.display="flex"; 
        })
    };

    useEffect(()=>{
      setVideoList([]);
      listAll(videoListRef).then((res)=>{
        res.items.forEach((item)=>{
          getDownloadURL(item).then((url)=>{
            setVideoList((prev)=>[...prev,url]);
          })
        }) 
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(isAuthenticated)
    {
    return(
        <div>

          <Modal isOpen={mdop} toggle={toggle}>
            <ModalHeader className='mdhdr' toggle={toggle}>Upload your Video Here</ModalHeader>
            <ModalBody style={{justifyContent:"center",alignItems:"center",textAlign:"center"}}></ModalBody>
            <Form onSubmit={uploadFile}>
                <Input type="file" className="ff" accept="video/*" onChange={(e)=>setFile(e.target.files[0])}/>
                <Input type="submit" className="frmsubup"/>
            </Form>
            <ModalFooter className='mdhdr' id="vup" style={{display:"none"}}>Video Uploaded Successfully!!</ModalFooter>
          </Modal>

          <Button className="donbt" onClick={()=>setMdop(true)} style={{textAlign:"center",
          display:"flex",float:"right",margin:"4vh 2vw 0 0"}}>Upload Video</Button>

          <br></br><br></br><br></br><br></br>

          {videoList.map((url)=>{
              return(
                <video width="60%" height="40%" style={{marginBottom:"5vh"}} controls loop className='videodisp'>
                  <source src={url} type="video/mp4"/>
                </video>
              );
          })}

        </div>
    );
    }

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
}

export default Videos;