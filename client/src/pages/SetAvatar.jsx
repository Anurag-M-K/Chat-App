import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/apiRoutes";
import axios from "axios";
import loader from "../assets/loader.gif";
import styled from "styled-components";


export default function SetAvatar() {
  // const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(()=>{
    if(!localStorage.getItem(import.meta.env.VITE_APP_CHAT_APP_USER_SECRETE)){
      navigate("/login")
    }
  },[])
  // Implement the functionality to set the profile picture using the selected avatar
  const setProfilePicture = async () => {
    
    if(selectedAvatar === undefined){
      toast.error("Please select an image",toastOptions)
    }else{
      const user = await JSON.parse(localStorage.getItem(import.meta.env.VITE_APP_CHAT_APP_USER_SECRETE))
      console.log("avatars[selectedAvatar]",avatars[selectedAvatar])
      const  {data} = await axios.post(`${setAvatarRoute}/${user[0]._id}`,{
        image: avatars[selectedAvatar],
      })

      console.log(data)
      if(data.isSet){
        user.isAvatarImageSet  = true;
        user.avatarImage = data.image;
        localStorage.setItem(import.meta.env.VITE_APP_CHAT_APP_USER_SECRETE,JSON.stringify(user));
        navigate("/")
      }else{
        toast.error("Error seting avatar, please try again",toastOptions)
      }
    }
  };

  useEffect(()=>{
  const avatarImg = ["https://res.cloudinary.com/dmvxmurxw/image/upload/v1681500158/new5_jnpttb.avif",
  "https://res.cloudinary.com/dmvxmurxw/image/upload/v1681499790/3d-illustration-person-with-sunglasses_23-2149436188_pndbuq.avif",
"https://res.cloudinary.com/dmvxmurxw/image/upload/v1681500158/new_4_wnb5vi.avif",
"https://res.cloudinary.com/dmvxmurxw/image/upload/v1681500157/new_3_p0rwfa.avif",
"https://res.cloudinary.com/dmvxmurxw/image/upload/v1681500157/new_g36l7j.avif"]
  setAvatars(avatarImg)
  setIsLoading(false)
  },[])

  return (


    
    <>

    {
      isLoading ? <Container>
        <img src={loader}  alt="loader" className="loader" />
      </Container> : (

        <Container>
        <div className="title">
          <h1 className="text-white font-bold ">Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars flex gap-2 ">
          {avatars.map((avatar, index) => {
            return (
              <div
              key={index}
              className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
              >
                <img
                  className="w-12 rounded-full cursor-pointer "
                  src={avatar}
                  alt="avatar"
                  key={avatar}
                  onClick={() => setSelectedAvatar(index)}
                  />
              </div>
            );
          })}
        </div>
        <button onClick={setProfilePicture} className="w-56 cursor-pointer p-1rem 2rem uppercase font-bold px-2 py-1 transition duration-500 ease-in-out  bg-extra-400 hover:bg-blue-600 rounded-md border-stone-400 text-lime-50 h-8">Set as Profile Picture</button>
      </Container>
          )
        }
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
gap:3rem;
background-color:#131324;
height:100vh;
width:100vw;
loader {
  max-inline-size:100%;
}
.avatar {
  border:0.4rem solid transparent;
  padding:0.4rem;
  border-radius:5rem;
  justify-content:center;
  align-items:center;
  transition:0.5s ease-in-out
}
.selected{
  border:0.4 solid #4e0eff; 
}
`
