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
import { registerRoute } from '../utils/apiRoutes';
import axios from 'axios'


export default function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
const navigate = useNavigate()
  const toastOptions = {
    position :"bottom-right",
        autoClose:8000,
        pauseOnHover :true,
        draggable:true,
        theme:'dark',

  }
  useEffect(()=>{
    if(localStorage.getItem(import.meta.env.VITE_APP_CHAT_APP_USER_SECRETE)){
      navigate('/')
    }
  },[])
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
 if(handleValidation()){
  const  {password  , username,email}= values;
  const { data } = await axios.post(registerRoute,{
    username,
    email,
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
    const  {password , confirmPassword , username,email}= values;
    if(password !== confirmPassword){
      console.log("validation",toast)
      toast.error("password and confirm password should be same",
      toastOptions
      );
      return false;
    }else if(username.length < 3){
      toast.error(
        "username should be greater than 3 charecters",toastOptions
      )
    }else if(password.length < 8){
      toast.error(
        "password atleast 8 charecters",toastOptions,toastOptions
      );
      return false;
    }else if(email === ""){
      toast.error("email is required",toastOptions);
      return false
    }
    return true
  }
  return (
    <>
    <FormContainer>
      <form className="flex flex-col  bg-violet-950 rounded-3xl  gap-y-5 py-10 px-16 " onSubmit={handleSubmit}>
        <div className="flex align-middle justify-center gap-1 ">
          <img className="h-20" src={Logo} alt="" />
          <div className='flex items-center'>

          <h1 className="text-white uppercase font-bold ">Snappy</h1>
          </div>
        </div>\
        <input
        className='bg-gradient-to-r hover:border-blue-200 text-white bg-violet-950  border-0.1rem solid border-blue-500 to-transparent rounded-md p-1 border text-xs px-3   h-10 '
          type="text"
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={(e) => handleChange(e)}
        />
        <input
              className='bg-gradient-to-r text-white hover:border-blue-200 bg-violet-950  border-0.1rem solid border-blue-500 to-transparent rounded-md p-1 border text-xs px-3   h-10 '
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
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
        <input
              className='bg-gradient-to-r hover:border-blue-200 text-white bg-violet-950  border-0.1rem solid border-blue-500 to-transparent rounded-md p-1 border text-xs px-3   h-10 '
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={values.confirmPassword}
          onChange={(e) => handleChange(e)}
          />
        <div className='text-center w-100'>

        <button className="w-56 cursor-pointer p-1rem 2rem uppercase font-bold px-2 py-1 transition duration-500 ease-in-out  bg-extra-400 hover:bg-blue-600 rounded-md border-stone-400 text-lime-50 h-8" type="submit">Create User</button>
        </div>
        <span className='text-white'>
          Already have an account ?
          {' '}
          <Link className='text-blue-500 font-bold' to="/login">Login</Link>
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
