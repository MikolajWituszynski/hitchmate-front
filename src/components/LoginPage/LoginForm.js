import React from 'react';
import { useForm } from 'react-hook-form';
import { Routes, Route, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    alert(`You are logged in ${data.username}`);
  };

  const navigateToHome = () => {
    console.log('click');
    navigate('/');
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen  ">
        <h1 className="text-2xl font-bold mb-4">Login Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-6 py-6 border-2 shadow" noValidate>
          {errors.username && <p className="text-red-700 rounded relative">{errors.username.message}</p>}
          <input
            name="username"
            className="px-3 py-3 border rounded mb-2"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
          />

          {errors.email && <p className="text-red-700 rounded relative">{errors.email.message}</p>}
          <input
            type="email"
            name="email"
            className="px-3 py-3 border rounded mb-2"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
            required
            autoComplete="off"
          />

          {errors.password && <p className="text-red-700 rounded relative">{errors.password.message}</p>}
          <input
            type="password"
            name="password"
            className="px-3 py-3 border rounded mb-2"
            placeholder="Password"
            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
            required
          />

          <button  type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
