import React from 'react';
import NavBar from '../layout/NavBar/NavBar';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
const RegisterPage = () => {

  const {register,handleSubmit,formState: { errors }} = useForm();
  const [data, setData] = useState("");

  const onSubmit = (data) => {
    console.log(data)
    
  };
  
  return (
    <div>
    <NavBar/>
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-2xl font-bold mb-4">Register Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-4 py-4 border-2 shadow">
      <input className="px-3 py-3 border rounded mb-2" {...register("username")} placeholder="username" />
      <input className="px-3 py-3 border rounded mb-2" {...register("email")} placeholder="email" />
      <input type="password" className="px-3 py-3 border rounded mb-2" {...register("password",{required:true, minLength:8, pattern:/^[A-Za-z]+$/i})} placeholder="password" />
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Register
        </button>
      </form>
    </div>
    </div>https://upmostly.com/tutorials/form-validation-using-custom-react-hooks
  );
};

export default RegisterPage;
