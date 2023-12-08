import React, { useState, useEffect } from "react";
import Success from "./Success";
import CameraComponent from "./CameraCapture";
import { useMediaQuery } from "@mui/material";
import "./MicrosoftTeams-image.png"

const Welcome = () => {
  const [formData, setFormData] = useState({
    textInput: '',
    fileInput: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleText = (e) => {
    setFormData({ ...formData, textInput: e.target.value });
  };

  const handleFile = (e) => {
    setFormData({ ...formData, fileInput: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    const formDataToSend = new FormData();
    formDataToSend.append('file1', formData.fileInput);
    formDataToSend.append('name', formData.textInput);

    try {
      const resp = await fetch('https://1435-2405-201-201f-9139-ede3-e510-6a4e-81cb.ngrok-free.app/index', {
        method: 'POST',
        body: formDataToSend,
      });
      console.log(resp);

      setSubmitted(true);

      setFormData({
        textInput: '',
        fileInput: null,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    // Add event listener for window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Initial window width
    setWindowWidth(window.innerWidth);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // State variable to track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const ismobile = useMediaQuery('(max-width: 600px)')
  return (
    <div style={{backgroundColor:"#FFF"}}>
    
      {/* Your existing code here */}
      <div style={{ display: "flex", textAlign: "left", width: ismobile?"150%":"100%", height: "100px", backgroundColor: "#000000" }}>
        <h2 style={{ color: "white", paddingLeft: "20px", fontSize: "30px", marginLeft: "5%" }}>Deloitte Badging Application</h2>
        <img src="./MicrosoftTeams-image.png" alt="Name" width={"400px"} height={"100px"}/>
      </div>

      {!submitted ?  (<div style={{height:"100px", width:ismobile?"800px":"1000px", marginLeft:"250px",marginTop:"90px", fontFamily:"serif",padding:"10px 20px", fontSize:"25px"}}>
            
           
            <form onSubmit={handleSubmit}>
       <div >
         <label htmlFor="textInput"  style={{ alignItems:ismobile?"left":"center",paddingBottom:"20px",marginLeft:ismobile?"-1000px":"-285px",paddingTop:"40px"}}>Register User</label>
         <br/>
         <input
           type="text"
           id="textInput"
           value={formData.textInput}
           onChange={handleText}
           style={{marginLeft:ismobile?"-980px":"-285px",height:"20px",width:"150px"}}
           placeholder="Enter Visitor Name"
          
         />
       </div>
 
       
       <div style={{ marginTop:"10px",marginLeft:ismobile?"-660px":"-285px"}}>
         <label htmlFor="fileInput">Please Upload The Verified Client ID Document     </label>
         <br/>
         <input
           type="file"
           id="fileInput"
           onChange={handleFile}
           accept=".jpg, .jpeg, .png, .gif" 
           style={{marginLeft:ismobile?"-230px":"-285px"}}
         />
       </div>
       <div>
         <button type="submit"
         style={{ marginTop:"20px",
         marginLeft:ismobile?"-1050px":"-280px",
            backgroundColor: "#4CAF50",  
         color: "white",            
         padding: "5px 20px",       
         border: "none",            
         borderRadius: "4px",  
         fontSize:"20px",     
         cursor: "pointer",height:"40px"}}>Submit</button>
       </div>
     </form>
     </div>) : (
        <div>
          <Success />
        </div>
      )}
    </div>
  );
};

export default Welcome;