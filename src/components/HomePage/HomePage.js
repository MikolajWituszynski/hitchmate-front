import React from 'react';
import { useRef } from 'react';
import {AiOutlineUser} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {useState} from 'react';
import { useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import NavBar from '../layout/NavBar/NavBar';

const HomePage = () => {
  

  return (

    <div>
      <NavBar/>
      {/* <video  >
        <source
          src="https://upload.wikimedia.org/wikipedia/commons/9/99/Animation_of_Rotating_Earth_at_Night.webm"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video> */}
    </div>
  );
};

export default HomePage;
