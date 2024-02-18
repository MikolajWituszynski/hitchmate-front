import  {useForm} from 'react-hook-form'
import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {ThreeCircles} from  'react-loader-spinner'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const RegisterForm = () => {
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    username: yup.string()
    .required("Username is required"),
    password: yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    cpassword: yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
      email: yup.string()
      .required("Email is required")
      .email("Must be a valid email")
  });
  const { 
    register,
     handleSubmit,
     formState: { errors },
     watch,
    } = useForm({ resolver: yupResolver(formSchema)});

    const [isRegistered, setIsRegistered] = useState(false);

    const onSubmit = async (data) => {
      const { secondPassword, ...formData } = data;
      console.log(data.username)
     
      try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/register', formData);
        console.log("Response: " + response.formData); 
        setIsRegistered(true);
        let timer = setTimeout(function() {
          navigate("/login")
      }, 6000);
    
    } catch (error) {
        console.error(error); 
      }
    };

    const password = watch("password");
  const confirmationPassword = (value) => {
    if (value === password) {
      return true;
    } else {
      return "Passwords do not match"
    }
  }


   
 
  return (
    <div>
    <div className="flex flex-col items-center justify-center h-screen ">
    <h1 className="text-2xl font-bold mb-4">Register Form</h1>
      {isRegistered ? (
        <div className="flex flex-col px-4 py-4 border-2 shadow items-center">
        <p>You have registered, wait a sec you are being redirected to home page</p>
        <ThreeCircles
  height="50"
  width="50"
  color="#aaaaaa"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor=""
  innerCircleColor=""
  middleCircleColor=""
/>
        </div>
      ) : (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-4 py-4 border-2 shadow" noValidate>
      {errors.username && <p className="text-red-700 rounded relative">{errors.username.message}</p>}
      <input 
      name="username"
      className="px-3 py-3 border rounded mb-2"  
      placeholder="username" 
      {...register("username", {required: "Username is required"})}
      required />
     {errors.email && <p className="text-red-700 rounded relative">{errors.email.message}</p>}
      <input 
      type="email" 
      name="email"
      className="px-3 py-3 border rounded mb-2"
       placeholder="email" 
       {...register("email")}
       autoComplete="off"/>
      {errors.password && <p className="text-red-700 rounded relative">{errors.password.message}</p>}
      <input
       type="password" 
       name="password"
       className="px-3 py-3 border rounded mb-2"
        placeholder="password" 
        {...register("password")} 
        />
        {errors.secondPassword && <p className="text-red-700 rounded relative">{errors.secondPassword.message}</p>}
        <input
       type="password" 
       name="secondPassword"
       className="px-3 py-3 border rounded mb-2"
        placeholder="password" 
        {...register("secondPassword",{ required: "Confirm your password", maxLength: 20, minLength:8, validate: confirmationPassword, shouldUnregister: true})} 
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Register
        </button>
      </form>
  )}
    </div>
    
    </div>
  );
};

export default RegisterForm;