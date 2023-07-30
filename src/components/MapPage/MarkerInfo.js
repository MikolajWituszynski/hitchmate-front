import React from 'react'

const MarkerInfo = ({lat, lng,style}) => {
    console.log("markerInfo")
    return (
      <div style={{ ...style, position: 'absolute', backgroundColor: 'white', zIndex: 1000 }}>
      <div>Latitude: {lat}</div>
        <div>Longitude: {lng}</div>
      </div>
    );
}

export default MarkerInfo
