import React, { useEffect, useRef } from 'react';
import loadGoogleMapsApi from './loadGoogleMapsApi';
import ReactDOM from 'react-dom';
import MarkerMenu from './MarkerMenu.js';
import { createRoot } from 'react-dom/client';

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
        let markerCounter = 0; // Use a simple variable instead of a state

        map.addListener("click", (e) => {
          const newMarker = new google.maps.Marker({
            position: e.latLng,
            map: map,
          });

          const markerId = `content-${markerCounter}`; // Create a unique id for this marker

          const markerInfoWindow = new google.maps.InfoWindow({
            // Use the unique id for this marker's content
            content: `<div id="${markerId}"></div>`,
          });

          newMarker.addListener("rightclick", (e) => {
            markerInfoWindow.open(map, newMarker);
          });

          google.maps.event.addListener(markerInfoWindow, 'domready', () => {
            const contentNode = document.getElementById(markerId);
            let root = contentNode._reactRootContainer;

            if (root) {
              root.render(<MarkerMenu />);
            } else {
              root = ReactDOM.createRoot(contentNode);
              root.render(<MarkerMenu />);
            }
          });
          
          markers.push(newMarker);
          markerCounter++; // increment the counter each time a new marker is added
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
