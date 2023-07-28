import React, { useEffect, useRef, useState } from 'react';
import loadGoogleMapsApi from './loadGoogleMapsApi';
import ReactDOM from 'react-dom';
import MarkerMenu from './MarkerMenu.js';
const Map = ({ apiKey, lat, lng, zoom }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsApi(apiKey)
      .then((google) => {
        const map = new google.maps.Map(mapContainerRef.current, {
          center: { lat, lng },
          zoom,
        });
        
        let markers = [];

        const deleteMarker = (marker) => {
          marker.setMap(null);
        }

        map.addListener("click", (e) => {
          console.log("Map clicked" + e.latLng);
          const newMarker = new google.maps.Marker({
            position: e.latLng,
            map: map,
          });
          
          newMarker.addListener("rightclick", (e) => {
            const markerInfoWindow = new google.maps.InfoWindow({
               content: '<div id="content"></div>',
              ariaLabel: "Uluru",
            });
            markerInfoWindow.open({
              anchor:newMarker,
               map,
            });
            google.maps.event.addListener(markerInfoWindow, 'domready', function() {
              ReactDOM.render(<MarkerMenu />, document.getElementById('content'));
          });
          })
          

          markers.push(newMarker);
        });

        
        
      })
      .catch(error => {
        console.error('Error occurred while loading Google Maps API: ', error);
      })
      .finally(() => {
        delete window.initMap;
      });
  }, [apiKey, lat, lng, zoom]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;
