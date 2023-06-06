import React from 'react';
import { useRef } from 'react';
import {AiOutlineUser} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {useState} from 'react';
import { useEffect } from 'react';


const HomePage = () => {
  const videoRef = useRef(null);
  const [showDropDownTable, setShowDropDownTable] = useState(false);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.play();
    }
  };

  const handleUserInfoClick = () => {
    setShowDropDownTable(!showDropDownTable);
  };

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold ">HitchMate</h1>
        <button className="text-2xl font-bold px-3 py-1 bg-slate-600 rounded-lg ">Home</button>
        <button className="text-2xl font-bold px-3 py-1 bg-slate-600 rounded-lg">Find Hitchhikers</button>
        <div className="text-2xl font-bold flex items-center px-3 py-1 bg-slate-600 rounded-lg">
          <AiOutlineUser />
          <GiHamburgerMenu
            onClick={handleUserInfoClick}
            style={{ cursor: 'pointer' }}
          />
        

        </div>
      </div>

      {showDropDownTable && (
        <div className="absolute right-0 mt-2 mr-2 bg-white rounded shadow">
          <div className="py-2 px-4 border-b">Login</div>
          <div className="py-2 px-4">Register</div>
        </div>
      )}

      <video ref={videoRef} className="w-full" onClick={handleVideoClick}>
        <source
          src="https://upload.wikimedia.org/wikipedia/commons/9/99/Animation_of_Rotating_Earth_at_Night.webm"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HomePage;
