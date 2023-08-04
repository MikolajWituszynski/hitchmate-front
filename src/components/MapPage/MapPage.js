import React from 'react'
import Map from './Map'

const MapPage = () => {
    let googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  return (
  <div>
    <Map apiKey={googleApiKey} lat={22.7128} lng={12.0060} zoom ={10}></Map>
    </div>
  )
}

export default MapPage