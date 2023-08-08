import React from 'react'

const MarkerInfo = ({lat, lng,style, title, description}) => {
  console.log("markerInfo");
  console.log("Title:", title);
  console.log("Description:", description);
  console.log("Lat:", lat);
  console.log("Lng:", lng);
    
    return (
      <div style={{ ...style, position: 'absolute', backgroundColor: 'white', zIndex: 1000 }}>
       
      <div>Latitude: {lat}</div>
        <div>Longitude: {lng}</div>
        <div>Title: {title}</div>
        <div>Description: {description}</div>
      </div>
    );
}

export default MarkerInfo
