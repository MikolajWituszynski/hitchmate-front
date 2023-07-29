import React from 'react'

const MarkerInfo = ({lat, lng}) => {
    console.log("Marker Info component");  // Add this line

    return (
      <div>
        <div>Latitude: {lat}</div>
        <div>Longitude: {lng}</div>
      </div>
    );
}

export default MarkerInfo
