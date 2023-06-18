import React from 'react';
import  {useForm} from 'react-hook-form'

const RegisterForm = () => {
  
  const { 
    register,
     handleSubmit,
     formState: { errors },
     watch
    } = useForm();

    const onSubmit = (data, e) => {
      e.preventDefault();
      console.log(data);
      alert(`You are registerd ${data.username}`);
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
      <h1 className="text-2xl font-bold mb-4">Login Form</h1>
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
       {...register("email", {required: "Email is required"})}
       autoComplete="off"/>
      {errors.password && <p className="text-red-700 rounded relative">{errors.password.message}</p>}
      <input
       type="password" 
       name="password"
       className="px-3 py-3 border rounded mb-2"
        placeholder="password" 
        {...register("password",{ required: "Password is required", maxLength: 20, minLength:8 })} 
        />
        {errors.secondPassword && <p className="text-red-700 rounded relative">{errors.secondPassword.message}</p>}
        <input
       type="password" 
       name="secondPassword"
       className="px-3 py-3 border rounded mb-2"
        placeholder="password" 
        {...register("secondPassword",{ required: "Confrim your password", maxLength: 20, minLength:8, validate: confirmationPassword})} 
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default RegisterForm;
