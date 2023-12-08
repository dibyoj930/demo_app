import { Box, Button, Grid, Modal, Typography, colors, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "../public/Group.svg"
import { useParams } from "react-router-dom";

const CameraComponent = () => {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [name, setname] = useState("")
  const [phone, setphone] = useState("");
  const [mail, setemail] = useState("");
  const [host, sethost] = useState("")
  const [formData, setFormData] = useState({

    fileInput: null,
  });

  const [submitted, setSubmitted] = useState(false);
 

  const handleFile = (e) => {
    setFormData({ ...formData, fileInput: e.target.files[0] });
  };

  const [data, setData] = useState(null);
  /*useEffect(() => {
    // Get query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);

    // Get individual parameters
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    // Extract other details

    // Now, you can use the extracted details in your web app
    console.log('Name:', name);
    console.log('Email:', email);
  });
*/  
const { userId } = useParams();
//const userId = userid?.replace(/"/g, '');
  useEffect(() => {
   
   console.log("userid--->",userId)
    const fetchData = async () => {
     
  // State to store user details
 
      try {
        const response = await fetch(`https://d5a2-2409-40c1-3e-2809-e85a-f791-e8a5-3b03.ngrok-free.app/get/${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        //const responseText = await response.text();

        const result = await response.json();
        
        setData(result)
        

        console.log("email--->", result?.emailid)
        console.log("data---->", data)
        console.log("name--->", name, phone, mail, host)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]); // Empty dependency array ensures that the effect runs once when the component mounts


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    const formDataToSend = new FormData();
    formDataToSend.append('file1', formData.fileInput);


    try {
      const resp = await fetch('https://d5a2-2409-40c1-3e-2809-e85a-f791-e8a5-3b03.ngrok-free.app/update/3144058f-85a6-4a9c-9ae6-9d5501d05e5b', {
        method: 'PATCH',
        body: formDataToSend,
      });
      console.log(resp);

      setSubmitted(true);

      setFormData({

        fileInput: null,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  const [capturing, setCapturing] = useState(false);
  const [flag, setflag] = useState(false);
  const [res, setres] = useState("")
  const [err, seterr] = useState(false)
  const [msg, setmsg] = useState("")


  const ismobile = useMediaQuery('(max-width: 600px)')
  const style = {
    position: 'absolute',
    top: ismobile ? '34%' : '50%',
    left: '46%',
    transform: 'translate(-50%, -50%)',
    width: '320px',
    bgcolor: 'background.paper',
    border: '1px solid #1F1F1F',

    boxShadow: 24,
    p: 4,
  };
  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCapturing(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCapture = () => {
    const tracks = videoRef.current.srcObject?.getTracks();
    tracks?.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setCapturing(false);
  };

  const captureImage = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
   
    canvas.getContext('2d').drawImage(video, 300, 300, canvas.width, canvas.height);




    stopCapture();


    canvas.toBlob(async (blob) => {

      const formData = new FormData();
      formData.append('file1', blob, 'image.png');

      try {
        const response = await fetch(`https://d5a2-2409-40c1-3e-2809-e85a-f791-e8a5-3b03.ngrok-free.app/update/${userId}`, {
          method: 'PATCH',
          body: formData,
        });
        const responseText = await response.json();
        console.log(responseText)
        setres(responseText)
        setflag(true)
        setSubmitted(true);
        //if(response?.body)

        if (response.ok) {
          console.log('Image uploaded successfully!');
          // You can handle the success response here
        } else {
          console.error('Error uploading image:', response.status);
          // You can handle the error response here
          seterr(true);
          setmsg("Your face not captured correctly")

        }

      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }, 'image/png');
  };
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    // Open the modal when the button is clicked
    setModalOpen(true);
  };

  const closeModal = () => {
    // Close the modal when the close button is clicked
    setModalOpen(false);
  };

  return (
    <div style={{ backgroundColor: "" }}>
      
        <div>
          <Grid display={"flex"} width={ismobile ? "1200px" : "1200px"} height={"132px"} sx={{ background: "#000" }} gap={ismobile ? "-200px" : "-50px"} flexDirection={"row"} >
            <Grid padding={"20px 390px 57px 36px"} width={"125px"} height={"72px"}>
              <img src="https://s3-alpha-sig.figma.com/img/67dc/4cea/171a4e973d321e1f9b83364883e752af?Expires=1702857600&Signature=iFjqZ3XqHaenctisX9BBy8Jp79MkysDD6GdjJBo67nqo9ysGmsF7hd3o8tS1UzgDARggxAD1xZ1JjOXLeaC8K8C026vI0vEWBaUiVMPDbmvBUnTLl03r90zYwseIBeOl3yR82Pnd2pEYvv~kDNWW5bq0Dk8VC678Q5ILyEnvu~WMtK7NB~Gd-CY-dVhakUGL6Oav~gQNcqvllv06Z1I66r3ZrhZJB6kqfbHJBFnDqTYVbRXEn3uHSqqLIgX4YeUdumx5YVuX5ZhdYZk9PQpGevnx-1skmvaEjjRfQpLYzIc6J9JI-T3vIPRjcCKyyCfB7u9cKsadlDxPAYxeN1NPzg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" width={"125px"} height={"72px"} />
            </Grid>
            <Grid width={"800px"} height={"65px"} marginLeft={ismobile ? "-70px" : ""} padding={"37px 500px 37px 0px"}>
              <Typography sx={{ color: "#FFF", textAlign: "center", fontFamily: "sans-serif", fontWeight: "700", fontSize: "24px", lineHeight: "120%" }}>Hi {data?.name}, Welcome to Deloitte</Typography>
            </Grid>

          </Grid>
          <Grid height={"504px"} width={"600px"} margin={ismobile ? "70px 150px 50px 200px" : "70px 250px 50px 300px"} display={"flex"} flexDirection={"column"} alignItems="center">
            <Grid>
              <Typography paddingBottom={"10px"} width={"420px"} height={"29px"} color={"#000"} textAlign={"center"} fontFamily={"sans-serif"} fontSize={"24px"} fontWeight={"800"} lineHeight={"120%"}>Badging Application</Typography>
              <Typography sx={{ color: "rgba(0, 0, 0, 0.50)", textAlign: "center", fontSize: "14px", fontWeight: "600px" }}>Upload picture of your face to get access to the Deloitte building</Typography>
            </Grid>
            <Grid padding={"12px 12px"} borderRadius={"16px"} height={"150px"} width={"600px"} bgcolor={"#F5F5F5"} marginTop={"10px"}>
              <Grid display={"flex"} gap={"85px"}>
                <Typography fontSize={"16px"} color={"rgba(0, 0, 0, 0.50)"}>Name</Typography>
                <Typography fontSize={"16px"} fontWeight={"700"}>{data?.name}</Typography>
              </Grid>
              <Grid display={"flex"} gap={"70px"}>
                <Typography fontSize={"16px"} color={"rgba(0, 0, 0, 0.50)"}>Email id</Typography>
                <Typography fontSize={"16px"} fontWeight={"700"}>{data?.emailid}</Typography>
              </Grid>
              <Grid display={"flex"} gap={"24px"} paddingTop={"30px"}>
                <Typography fontSize={"16px"} color={"rgba(0, 0, 0, 0.50)"}>Requested By</Typography>
                <Typography fontSize={"16px"} fontWeight={"700"}>{data?.hname}</Typography>
              </Grid>


            </Grid>
            <Grid padding={"12px 12px"} borderRadius={"16px"} height={"400px"} width={"600px"} marginTop={"30px"} border={"2px dashed rgba(0, 0, 0, 0.20)"}>
             {
              submitted?<h2 style={{fontWeight:"700"}}>You have submitted details Successfully!</h2>:(
                <Grid bgcolor={"#83BD2B40"} width={"95px"} height={"95px"} paddingTop={"20px"} margin={"30px 100px 50px 250px"} borderRadius={"70px"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 33 32" fill="none">
                  <path d="M5.83334 29.3333C5.83334 26.5043 6.95715 23.7912 8.95754 21.7908C10.9579 19.7905 13.671 18.6666 16.5 18.6666C19.329 18.6666 22.0421 19.7905 24.0425 21.7908C26.0429 23.7912 27.1667 26.5043 27.1667 29.3333H24.5C24.5 27.2116 23.6572 25.1768 22.1569 23.6765C20.6566 22.1762 18.6217 21.3333 16.5 21.3333C14.3783 21.3333 12.3434 22.1762 10.8432 23.6765C9.34286 25.1768 8.50001 27.2116 8.50001 29.3333H5.83334ZM16.5 17.3333C12.08 17.3333 8.50001 13.7533 8.50001 9.33331C8.50001 4.91331 12.08 1.33331 16.5 1.33331C20.92 1.33331 24.5 4.91331 24.5 9.33331C24.5 13.7533 20.92 17.3333 16.5 17.3333ZM16.5 14.6666C19.4467 14.6666 21.8333 12.28 21.8333 9.33331C21.8333 6.38665 19.4467 3.99998 16.5 3.99998C13.5533 3.99998 11.1667 6.38665 11.1667 9.33331C11.1667 12.28 13.5533 14.6666 16.5 14.6666Z" fill="#83BD2B" />
                </svg>
                <Grid paddingLeft={"60px"}>
                  <Button onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 25" fill="none">
                      <path d="M11 11.5V6.5C11 5.94772 11.4477 5.5 12 5.5C12.5523 5.5 13 5.94772 13 6.5V11.5H18C18.5523 11.5 19 11.9477 19 12.5C19 13.0523 18.5523 13.5 18 13.5H13V18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5V13.5H6C5.44772 13.5 5 13.0523 5 12.5C5 11.9477 5.44772 11.5 6 11.5H11Z" fill="#83BD2B" />
                    </svg>
                  </Button>
                  {/* Render the modal conditionally */}
                  {isModalOpen&&<Modal open={isModalOpen} aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style} height={"400px"} width={"500px"} borderRadius={"12px"} justifyContent={"center"}>
                      <Grid display={"flex"} gap={"95px"} paddingTop={"10px"}>
                        <Typography fontSize={"14px"} fontWeight={"700"} width={"200px"}>Upload your picture</Typography>
                        <Button onClick={closeModal}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 24 25" fill="none">
                            <g clip-path="url(#clip0_1_119)">
                              <path d="M12 11.0858L15.5355 7.55024C15.9261 7.15972 16.5592 7.15972 16.9497 7.55024C17.3403 7.94077 17.3403 8.57393 16.9497 8.96446L13.4142 12.5L16.9497 16.0355C17.3403 16.426 17.3403 17.0592 16.9497 17.4497C16.5592 17.8403 15.9261 17.8403 15.5355 17.4497L12 13.9142L8.46447 17.4497C8.07394 17.8403 7.44078 17.8403 7.05025 17.4497C6.65973 17.0592 6.65973 16.426 7.05025 16.0355L10.5858 12.5L7.05025 8.96446C6.65973 8.57393 6.65973 7.94077 7.05025 7.55024C7.44078 7.15972 8.07394 7.15972 8.46447 7.55024L12 11.0858Z" fill="black" />
                            </g>
                            <defs>
                              <clipPath id="clip0_1_119">
                                <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </Button>

                      </Grid>
                      <Grid display={"flex"} flexDirection={"column"}>
                        
                        <Grid margin={"280px 25px -50px 20px"} width={"40px"} height={"40px"} bgcolor={"#FFF"} borderRadius={"40px"} >
                          <Button onClick={startCapture} disabled={capturing}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{paddingRight:"20px",paddingBottom:"15px"}} viewBox="0 0 24 24" fill="none">
                          <path d="M9.828 5L7.828 7H4V19H20V7H16.172L14.172 5H9.828ZM9 3H15L17 5H21C21.2652 5 21.5196 5.10536 21.7071 5.29289C21.8946 5.48043 22 5.73478 22 6V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V6C2 5.73478 2.10536 5.48043 2.29289 5.29289C2.48043 5.10536 2.73478 5 3 5H7L9 3ZM12 18C10.5413 18 9.14236 17.4205 8.11091 16.3891C7.07946 15.3576 6.5 13.9587 6.5 12.5C6.5 11.0413 7.07946 9.64236 8.11091 8.61091C9.14236 7.57946 10.5413 7 12 7C13.4587 7 14.8576 7.57946 15.8891 8.61091C16.9205 9.64236 17.5 11.0413 17.5 12.5C17.5 13.9587 16.9205 15.3576 15.8891 16.3891C14.8576 17.4205 13.4587 18 12 18ZM12 16C12.9283 16 13.8185 15.6313 14.4749 14.9749C15.1313 14.3185 15.5 13.4283 15.5 12.5C15.5 11.5717 15.1313 10.6815 14.4749 10.0251C13.8185 9.36875 12.9283 9 12 9C11.0717 9 10.1815 9.36875 9.52513 10.0251C8.86875 10.6815 8.5 11.5717 8.5 12.5C8.5 13.4283 8.86875 14.3185 9.52513 14.9749C10.1815 15.6313 11.0717 16 12 16Z" fill="#09121F" />
                        </svg>
                       
                        </Button>
                        <Grid marginLeft={"250px"}  height={"40px"} width={"40px"} bgcolor={"#FFF"} borderRadius={"40px"} marginTop={"-50px"}>
                          <Button onClick={captureImage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{paddingTop:"5px",paddingRight:"20px"}} fill="none">
  <path d="M10 15.172L19.192 5.979L20.607 7.393L10 18L3.636 11.636L5.05 10.222L10 15.172Z" fill="black"/>
</svg></Button></Grid>

                       

                       <Grid>
                        
                        
                        <video ref={videoRef} autoPlay muted style={{ display: capturing ? 'block' : 'none' ,marginTop:"-370px",marginLeft:"20px", height:"370px",width:"250px"}}></video>
          <canvas ref={canvasRef} style={{ display: capturing ? 'block' : 'none',marginRight:"-80px" }}></canvas>
          </Grid>
                        </Grid>
                        
                      </Grid>
                    </Box>

                  </Modal>}
                </Grid>
                <Grid paddingTop={"10px"} width={"250px"} height={"50px"} marginLeft={"-70px"}>
                  <Typography fontSize={"18px"} fontWeight={"700"}>Upload your picture</Typography>
                  <Typography fontSize={"12px"} fontWeight={"500"} color={"rgba(0, 0, 0, 0.50)"}>Capture your entire face in clear lighting</Typography>
                </Grid>
              </Grid>)

              }
            </Grid>
           {!submitted? <Button sx={{ marginTop: "20px", color: "#000000", backgroundColor: "#96CB3C", width: "90px", height: "40px", borderRadius: "20px" }} onClick={captureImage} >Submit</Button>:""}
          </Grid>
        </div>

      

    </div>
  );
};

export default CameraComponent;