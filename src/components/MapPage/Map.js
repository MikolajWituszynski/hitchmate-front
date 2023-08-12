import React, { useEffect, useRef } from 'react';
import loadGoogleMapsApi from './loadGoogleMapsApi';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import MarkerMenu from './MarkerMenu.js';
import MarkerInfo from './MarkerInfo';
import axios from 'axios';

const Map = ({ apiKey, lat, lng, zoom }) => {
  const mapContainerRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedMarkerRightClick, setSelectedMarkerRightClick] = useState(null);

  const [markerPixelPositionX, setMarkerPixelPositionX] = useState(null);
  const [markerPixelPositionY, setMarkerPixelPositionY] = useState(null);
  const [markerPixelPositionXMenu, setMarkerPixelPositionXMenu] = useState(null);
  const [markerPixelPositionYMenu, setMarkerPixelPositionYMenu] = useState(null);
  const [markers, setMarkers] = useState([])
  const [isMenuVisible, setMenuVisible] = useState(true)
  const [isInfoVisible, setInfoVisible] = useState(true)


const handleCloseMenu = () => {
 setMenuVisible(false)
 

}

  const handleCloseInfo = () => {
    setInfoVisible(false)
   
  };

  useEffect(() => {
    loadGoogleMapsApi(apiKey)
      .then(google => {
        const map = new google.maps.Map(mapContainerRef.current, {
          center: { lat, lng },
          zoom,
        });
        
        let markerCounter = 0;
        let mapClickListener, markerClickListener, markerRightClickListener, domReadyListener;
        let markerInfoWindow;

        mapClickListener = map.addListener('click', e => {
          const markerId = markerCounter;
          const newMarkerData = {
            id: markerId,
            title: '',
            description: '',
            marker: new google.maps.Marker({
              position: {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              },
              map: map,
            }),
          };

          // const jsonMarkerData = JSON.stringify({
          //   id: newMarkerData.id,
          //   title: newMarkerData.title,
          //   description: newMarkerData.description,
          //   lat: Math.round(newMarkerData.marker.position.lat() * 100) / 100,
          //   lng: Math.round(newMarkerData.marker.position.lng() * 100) / 100,
          // });

          // axios
          //   .post('http://localhost:8080/addMarker', jsonMarkerData, {
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //   })
          //   .then(response => {
          //     const addedMarker = response.data;
          //     setMarkers(prevMarkers => [...prevMarkers, addedMarker]);
          //   })
          //   .catch(error => {
          //     console.error('Error adding marker: ' + error);
          //   });

          markerInfoWindow = new google.maps.InfoWindow({
            content: `<div id="${markerId}"></div>`,
          });

          markerClickListener = newMarkerData.marker.addListener('click', e => {
            setInfoVisible(true);
            let scale = Math.pow(2, map.getZoom());
            let nw = new google.maps.LatLng(
              map.getBounds().getNorthEast().lat(),
              map.getBounds().getSouthWest().lng()
            );
            let worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
            let worldCoordinate = map.getProjection().fromLatLngToPoint(e.latLng);
            if (newMarkerData.description === null || newMarkerData.description === "") {
              newMarkerData.description = "Default description"; // Set a default description here
            }
            setSelectedMarker(newMarkerData);
            if (newMarkerData.description) {
              console.log(newMarkerData.description);
            }
            console.log("description for selected marker: " + selectedMarker)
            let pixelOffsetX = Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale);
            let pixelOffsetY = Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale);

            setMarkerPixelPositionX(pixelOffsetX);
            setMarkerPixelPositionY(pixelOffsetY);
          });

          markerRightClickListener = newMarkerData.marker.addListener('rightclick', e => {
            setMenuVisible(true);

            let scale = Math.pow(2, map.getZoom());
            let nw = new google.maps.LatLng(
              map.getBounds().getNorthEast().lat(),
              map.getBounds().getSouthWest().lng()
            );
            console.log("rightclick")
            let worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
            let worldCoordinate = map.getProjection().fromLatLngToPoint(e.latLng);
            if (newMarkerData.description === null || newMarkerData.description === "") {
              newMarkerData.description = "Default description"; // Set a default description here
            }
            setSelectedMarkerRightClick(newMarkerData);
            if (newMarkerData.description) {
              console.log(newMarkerData.description);
            }
            console.log("description for selected marker: " + selectedMarkerRightClick)
           
            let pixelOffsetX = Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale);
            let pixelOffsetY = Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale);

            setMarkerPixelPositionXMenu(pixelOffsetX);
            setMarkerPixelPositionYMenu(pixelOffsetY);
          });

          
          
          setMarkers(prevMarkers => [...prevMarkers, newMarkerData]);
          console.log(markers)
          markerCounter++;
        });

        return () => {
          google.maps.event.removeListener(mapClickListener);
          google.maps.event.removeListener(markerClickListener);
          google.maps.event.removeListener(markerRightClickListener);
          google.maps.event.removeListener(domReadyListener);
          markerInfoWindow.close();
        };
      })
      .catch(error => {
        console.error('Error occurred while loading Google Maps API: ', error);
      })
      .finally(() => {
        delete window.initMap;
      });
  }, [apiKey, lat, lng, zoom]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }} ref={mapContainerRef}>
      {isInfoVisible && selectedMarker && selectedMarker.marker && (
        <MarkerInfo
          style={{ left: `${markerPixelPositionX}px`, top: `${markerPixelPositionY}px` }}
          lat={selectedMarker.marker.getPosition().lat()}
          lng={selectedMarker.marker.getPosition().lng()}
          description={selectedMarker.description}
          title={selectedMarker.title}
          onClose={handleCloseInfo}
        />
      )}
        {isMenuVisible && selectedMarkerRightClick && selectedMarkerRightClick.marker && (
        <MarkerMenu
        style={{ left: `${markerPixelPositionXMenu}px`, top: `${markerPixelPositionYMenu}px` }}

        description={selectedMarkerRightClick.description}
        title={selectedMarkerRightClick.title}
        setMarkerDescription={newDescription => {
          const updatedMarker = { ...selectedMarkerRightClick, description: newDescription };
          setSelectedMarkerRightClick(updatedMarker);
        }}
        setMarkerTitle={newTitle => {
          const updatedMarker = { ...selectedMarkerRightClick, title: newTitle };
          setSelectedMarkerRightClick(updatedMarker);
        }}
       // Save changes to the selectedMarker
       onClose={handleCloseMenu}

        />
      )}

    </div>
  );
};

export default Map;
