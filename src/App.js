import {Route, BrowserRouter, Routes} from 'react-router-dom'
import HomePage from "./components/HomePage/HomePage"
import LoginPage from './components/LoginPage/LoginPage';
import React from "react";
import RegisterPage from './components/RegisterPage/RegisterPage';
import HitchhikersPage from './components/HitchhikersPage/HitchhikersPage';
import MapPage from './components/MapPage/MapPage';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/hitchhikers" element={<HitchhikersPage/>}/>
      <Route path="/map" element={<MapPage/>}/>

    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;