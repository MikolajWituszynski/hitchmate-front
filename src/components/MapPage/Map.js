import React, { useEffect, useRef } from 'react';
import loadGoogleMapsApi from './loadGoogleMapsApi';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import MarkerMenu from './MarkerMenu.js';
import MarkerInfo from './MarkerInfo';
import { useMarkerContext } from './MarkerContext'; // Adjust the path accordingly
import axios from 'axios';

const Map = ({ apiKey, lat, lng, zoom }) => {
  const mapContainerRef = useRef(null);
  const { markers, setMarkers} = useMarkerContext();


  const [markerPixelPositionX, setMarkerPixelPositionX] = useState(null);
  const [markerPixelPositionY, setMarkerPixelPositionY] = useState(null);
  const [markerPixelPositionXMenu, setMarkerPixelPositionXMenu] = useState(null);
  const [markerPixelPositionYMenu, setMarkerPixelPositionYMenu] = useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false)
  const [isInfoVisible, setInfoVisible] = useState(false)
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);

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
          zoom
        }); 

        
        axios.get('http://localhost:8080/markers')
        .then((response) => {

          const data = response.data;
          let markerCounter =0

          console.log("Here is the received data: ", data); // Log the received marker data
          let newMarkerData;
          data.forEach(markerData => {

             newMarkerData = {
              id: markerData.id,
              title: markerData.title,
              description: markerData.description,
              marker: new google.maps.Marker({
                position: {
                  lat: markerData.lat,
                  lng: markerData.lng,
                },
                map: map,
              }),
            };
            console.log("newMarkerDataAdded",newMarkerData)

            setMarkers(prevMarkers => [...prevMarkers, newMarkerData]);
            console.log("markers: ", markers)
          });
          let mapClickListener, markerClickListener,markerAddClickListener, markerRightClickListener, domReadyListener;

          const handleMarkerClick = (newMarkerData) => {
            setInfoVisible(true);
            let scale = Math.pow(2, map.getZoom());
            let nw = new google.maps.LatLng(
              map.getBounds().getNorthEast().lat(),
              map.getBounds().getSouthWest().lng()
            );
            setSelectedMarkerId(newMarkerData.id);
            let worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
            let worldCoordinate = map.getProjection().fromLatLngToPoint(newMarkerData.marker.getPosition());
            let pixelOffsetX = Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale);
            let pixelOffsetY = Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale);
            setMarkerPixelPositionX(pixelOffsetX);
            setMarkerPixelPositionY(pixelOffsetY);
          };
         
          const handleMarkerRightClick = (newMarkerData) => {
            setMenuVisible(true);
            console.log("clicked")
            let scale = Math.pow(2, map.getZoom());
            let nw = new google.maps.LatLng(
              map.getBounds().getNorthEast().lat(),
              map.getBounds().getSouthWest().lng()
            );
            let worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
            let worldCoordinate = map.getProjection().fromLatLngToPoint(newMarkerData.marker.getPosition());
            setSelectedMarkerId(newMarkerData.id);
            let pixelOffsetX = Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale);
            let pixelOffsetY = Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale);
            setMarkerPixelPositionXMenu(pixelOffsetX);
            setMarkerPixelPositionYMenu(pixelOffsetY);
          };
          console.log("foreach")
          markers.forEach(markerData => {
            console.log("each marker",markerData)
            const marker = markerData.marker;
            google.maps.event.addListener(marker, 'click', () => handleMarkerClick(markerData));
            google.maps.event.addListener(marker, 'rightclick', () => handleMarkerRightClick(markerData));
          });
          map.addListener('click', e => {
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
            const jsonMarkerData = JSON.stringify({
              id: newMarkerData.id,
              title: newMarkerData.title,
              description: newMarkerData.description,
              lat: Math.round(newMarkerData.marker.position.lat() * 100) / 100,
              lng: Math.round(newMarkerData.marker.position.lng() * 100) / 100,
            });
            axios
            .post('http://localhost:8080/addMarker', jsonMarkerData, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(response => {
              console.log("Success", response)
            })
            .catch(error => {
              console.error('Error adding marker: ' + error);
            });
            google.maps.event.addListener(newMarkerData.marker, 'click', () => handleMarkerClick(newMarkerData));
            google.maps.event.addListener(newMarkerData.marker, 'rightclick', () => handleMarkerRightClick(newMarkerData));
            setMarkers(prevMarkers => [...prevMarkers, newMarkerData]);
            markerCounter++;
            console.log("new marker data", markerCounter)
      })
    })
  })
  }, [apiKey, lat, lng, zoom]);
  console.log(markers)

  // console.log(markers)
  // console.log("selected Marker: " + selectedMarker)
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }} ref={mapContainerRef}>
      
       {isInfoVisible && markers[selectedMarkerId] && (
        <MarkerInfo
          style={{ left: `${markerPixelPositionX}px`, top: `${markerPixelPositionY}px` }}
          lat={markers[selectedMarkerId].marker.getPosition().lat()}
          lng={markers[selectedMarkerId].marker.getPosition().lng()}
          description={markers[selectedMarkerId].description}
          title={markers[selectedMarkerId].title}
          onClose={handleCloseInfo}
        />
      )}
        {isMenuVisible &&  markers[selectedMarkerId] && (
        <MarkerMenu
        style={{ left: `${markerPixelPositionXMenu}px`, top: `${markerPixelPositionYMenu}px` }}
        id={selectedMarkerId}
        description={markers[selectedMarkerId].description}
        title={markers[selectedMarkerId].title}
        setMarkerDescription={newDescription => {
          const updatedMarkers = markers.map(marker =>
            marker.id === selectedMarkerId? { ...marker, description: newDescription } : marker
          );
          setMarkers(updatedMarkers);
        }}
        setMarkerTitle={newTitle => {
          const updatedMarkers = markers.map(marker =>
            marker.id === selectedMarkerId ? { ...marker, title: newTitle } : marker
          );
          setMarkers(updatedMarkers);
        }}
       // Save changes to the selectedMarker
       onClose={handleCloseMenu}
    
        />
        )}
        </div>
   
 );
    
};
export default Map;
