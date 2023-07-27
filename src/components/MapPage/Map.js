import React, { useEffect, useRef, useState } from 'react';
import loadGoogleMapsApi from './loadGoogleMapsApi';

const Map = ({ apiKey, lat, lng, zoom }) => {
  const mapContainerRef = useRef(null);
  const [isEditOpen, setEditOpen] = useState(false);

  useEffect(() => {
    loadGoogleMapsApi(apiKey)
      .then((google) => {
        const map = new google.maps.Map(mapContainerRef.current, {
          center: { lat, lng },
          zoom,
        });
        
        let markers = [];

        const editMarker = (marker) => {
          console.log("edit", marker);
          const editWindow = new google.maps.InfoWindow({
            content: `
              <div id="content">
                <p><button>Description</button></p>
                <p><button>Photos</button></p>
              </div>`
          });
          editWindow.open(map,marker);

        }

        const deleteMarker = (marker) => {
          marker.setMap(null);
        }

        map.addListener("click", (e) => {
          console.log("Map clicked" + e.latLng);
          const newMarker = new google.maps.Marker({
            position: e.latLng,
            map: map,
          });

          const markerId = Math.random().toString(36).substring(2, 15); // Generate a unique id for the marker

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div id="content">
                <p><button id="edit-${markerId}">Edit Marker</button></p>
                <p><button id="delete-${markerId}">Delete Marker</button></p>
              </div>`
          });

          newMarker.addListener("rightclick", (e) => {
            infoWindow.open(map, newMarker);
            // if(editMarker) {
            //   infoWindow.close(map, newMarker)
            // }
          });

          // Add listeners to buttons when InfoWindow's dom is ready
          google.maps.event.addListener(infoWindow, 'domready', () => {
            document.getElementById(`edit-${markerId}`).addEventListener('click', () => editMarker(newMarker));
            document.getElementById(`delete-${markerId}`).addEventListener('click', () => deleteMarker(newMarker));
          });

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
