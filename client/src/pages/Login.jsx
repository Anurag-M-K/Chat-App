/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
import React, { useState , useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import { toast , ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css" 
import { loginRoute } from '../utils/apiRoutes';
import axios from 'axios'


export default function Login   () {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
const navigate = useNavigate()
  const toastOptions = {
    position :"bottom-right",
        autoClose:8000,
        pauseOnHover :true,
        draggable:true,
        theme:'dark',

  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
 if(handleValidation()){
  const  {password , username}= values;
  const { data } = await axios.post(loginRoute,{
    username,
    password,
  })
  if(data.status === false){
    toast.error(data.msg,toastOptions)
  }
  if(data.status === true ){
    localStorage.setItem(import.meta.env.VITE_APP_CHAT_APP_USER_SECRETE,
      JSON.stringify(data.user)
      );
  }
  navigate('/')
 };
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleValidation = ()=>{
    const  {password , username}= values;
    if(password === ""){
      toast.error("Email and password required",toastOptions)
      return false;
    }else if(username.length === ""){
      toast.error("Email and password required",toastOptions)
    return false
    }
    return true;
  }
  return (
    <>
    <FormContainer>
      <form className="flex flex-col  bg-violet-950 rounded-3xl gap-7 py-10 px-16 " onSubmit={handleSubmit}>
        <div className="flex align-middle justify-center gap-1 ">
          <img className="h-20" src={Logo} alt="" />
          <div className='flex items-center'>

<h1 className="text-white uppercase font-bold text-2xl ">Snappy</h1>
</div>     
   </div>
        <input
        className='bg-gradient-to-r hover:border-blue-200 text-white bg-violet-950  border-0.1rem solid border-blue-500 to-transparent rounded-md p-1 border text-xs px-3   h-10 '
          type="text"
          placeholder="Username"
          name="username"
          value={values.username}
          min="3"
          onChange={(e) => handleChange(e)}
        />
      
        <input
              className='bg-gradient-to-r hover:border-blue-200 text-white bg-violet-950  border-0.1rem solid border-blue-500 to-transparent rounded-md p-1 border text-xs px-3   h-10 '
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={(e) => handleChange(e)}
        />
       
        <div className='text-center w-100'>

        <button className="w-56 cursor-pointer p-1rem 2rem uppercase font-bold px-2 py-1 transition duration-500 ease-in-out  bg-extra-400 hover:bg-blue-600 rounded-md border-stone-400 text-lime-50 h-8" type="submit">Login</button>
        </div>
        <span className='text-white'>
          Dont have an account ?
          {' '}
          <Link className='text-blue-500 font-bold' to="/register">Register</Link>
        </span>
      </form>
    </FormContainer>
    <ToastContainer/>
          </>
  );
}
const FormContainer = styled.div`
height:100vh;
width:100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap:1rem;
align-items: center;
background-color:#131324;

`;
