import React from 'react';
import useForm from "../utils/useForm";
import validate from "../utils/LoginFormValdiationRules";

const LoginForm = () => {
  
  const { 
    register,
     handleSubmit,
     formState: { errors },
    } = useForm();
    const 
 
  function login() {
    console.log('No errors, submit callback called!')
    console.log(values)
  }
  return (
    <div>
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-2xl font-bold mb-4">Login Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col px-4 py-4 border-2 shadow" noValidate>
      <input 
      name="username"
      className="px-3 py-3 border rounded mb-2"  
      placeholder="username" 
      onChange={handleChange} 
      value={values.username || ''} 
      required />
      <div>
      <input 
      type="email" 
      name="email"
      className="px-3 py-3 border rounded mb-2"
       placeholder="email" 
       onChange={handleChange} 
       value={values.email || ''} 
       required  
       autoComplete="off"/>
      {errors.email && (
                    <p>{errors.email}</p>
                  )}
      </div>
      <div>
      <input
       type="password" 
       name="password"
       className="px-3 py-3 border rounded mb-2"
        placeholder="password" 
        onChange={handleChange} 
        value={values.password || ''} 
        required />
    
      {errors.password && (
                    <p>{errors.password}</p>
                  )}
      </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
