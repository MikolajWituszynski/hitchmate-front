import React from 'react'
import Map from './Map'
import axios from 'axios'
import NavBar from '../layout/NavBar/NavBar';
const MapPage = () => {
    let googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  
  return (
  <div>
    <Map apiKey={googleApiKey} lat={50.7128} lng={44.0060} zoom ={10}></Map>
    </div>
  )
}

export default MapPage