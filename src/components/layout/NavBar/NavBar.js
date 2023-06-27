import React from 'react';
import { useRef } from 'react';
import {AiOutlineUser} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {useState} from 'react';
import { useNavigate} from 'react-router-dom';


const NavBar = () => {
  const navigate = useNavigate();
 
  const [showDropDownTable, setShowDropDownTable] = useState(false);



  const handleUserInfoClick = () => {
    setShowDropDownTable(!showDropDownTable);
  };

  const navigateToLogin = () => {
    console.log("navigateTo function called");
    try {
        navigate('/login');
    } catch (err) {
        console.error("Error navigating:", err);
    }
  };

  const navigateToRegister = () => {
    console.log("click")
    navigate('/register');
  };

  const navigateToHome = () => {
    console.log("click")
    navigate('/');
  };

  const navigateTooHitchhikers = () => {
    console.log("click")
    navigate('/hitchhikers');
  };

  const navigateToMap = () => {
    console.log("click")
    navigate('/map');
  };
 

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">HitchMate</h1>
        <button onClick={navigateToHome} className="text-2xl font-bold px-3 py-1 bg-slate-600 rounded-lg ">Home</button>
        <button onClick={navigateTooHitchhikers} className="text-2xl font-bold px-3 py-1 bg-slate-600 rounded-lg">Find Hitchhikers</button>
        <button onClick={navigateToMap} className="text-2xl font-bold px-3 py-1 bg-slate-600 rounded-lg">Map</button>
        <div className="text-2xl font-bold flex items-center px-3 py-1 bg-slate-600 rounded-lg">
          <AiOutlineUser />
          <GiHamburgerMenu
            onClick={handleUserInfoClick}
            style={{ cursor: 'pointer' }}
          />
        

        </div>
      </div>

      {showDropDownTable && (
        <div  className="absolute right-0 mt-2 mr-2 bg-white rounded shadow pz-12">
          <button onClick={navigateToLogin} className="py-2 px-4 border " >Login</button>
          <button onClick={navigateToRegister} className="py-2 px-4 border">Register</button>
          <div onClick={navigateToRegister} className="border py-2 px-4 text-center">Contact</div>
          

        </div>
      )}
    </div>
  );
};

export default NavBar;
