import React from 'react';
import NavBar from '../layout/NavBar/NavBar';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import RegisterForm from './RegisterForm';
const RegisterPage = () => {

  return (
    <div>
    <NavBar/>
    <RegisterForm/>
    </div>
  );
};

export default RegisterPage;
