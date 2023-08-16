import React, { useEffect, useRef } from 'react';
import loadGoogleMapsApi from './loadGoogleMapsApi';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import MarkerMenu from './MarkerMenu.js';
import MarkerInfo from './MarkerInfo';
import { useMarkerContext } from './MarkerContext'; // Adjust the path accordingly


const Map = ({ apiKey, lat, lng, zoom }) => {
  const mapContainerRef = useRef(null);
  const { markers, setMarkers, setSelectedMarkerRightClick,setSelectedMarker, selectedMarkerRightClick, selectedMarker  } = useMarkerContext();

 
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
          zoom,
        });
        
        let markerCounter = 0;
        let mapClickListener, markerClickListener, markerRightClickListener, domReadyListener;
      

     
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

     

          markerClickListener = newMarkerData.marker.addListener('click', e => {
            setInfoVisible(true);

            let scale = Math.pow(2, map.getZoom());
            let nw = new google.maps.LatLng(
              map.getBounds().getNorthEast().lat(),
              map.getBounds().getSouthWest().lng()
            );
            setSelectedMarkerId(newMarkerData.id)
           
            let worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
            let worldCoordinate = map.getProjection().fromLatLngToPoint(e.latLng);
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
            let worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
            let worldCoordinate = map.getProjection().fromLatLngToPoint(e.latLng);
            setSelectedMarkerId(newMarkerData.id)
            
            console.log("map selectedRigh marker: " + selectedMarker)
           
            
            let pixelOffsetX = Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale);
            let pixelOffsetY = Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale);

            setMarkerPixelPositionXMenu(pixelOffsetX);
            setMarkerPixelPositionYMenu(pixelOffsetY);

          });

          setMarkers(prevMarkers => [...prevMarkers, newMarkerData]);
          markerCounter++;
        });



        // return () => {
        //   google.maps.event.removeListener(mapClickListener);
        //   google.maps.event.removeListener(markerClickListener);
        //   google.maps.event.removeListener(markerRightClickListener);
        //   google.maps.event.removeListener(domReadyListener);
        // };
      })
      // .catch(error => {
      //   console.error('Error occurred while loading Google Maps API: ', error);
      // })
      // .finally(() => {
      //   delete window.initMap;
      // });
  }, [apiKey, lat, lng, zoom]);
  console.log("markers: ",markers)

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
