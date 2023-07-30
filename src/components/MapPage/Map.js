import React, { useEffect, useRef } from 'react';
import loadGoogleMapsApi from './loadGoogleMapsApi';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import MarkerMenu from './MarkerMenu.js';
import MarkerInfo from './MarkerInfo';
import { createRoot } from 'react-dom/client';

const Map = ({ apiKey, lat, lng, zoom }) => {
  const mapContainerRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerPixelPositionX, setMarkerPixelPositionX] = useState(null);
  const [markerPixelPositionY, setMarkerPixelPositionY] = useState(null);

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    loadGoogleMapsApi(apiKey)
      .then((google) => {
        const map = new google.maps.Map(mapContainerRef.current, {
          center: { lat, lng },
          zoom,
        });

        let markerCounter = 0;
        let mapClickListener, markerClickListener, markerRightClickListener, domReadyListener;
        let markerInfoWindow;

        mapClickListener = map.addListener("click", (e) => {
          const newMarker = new google.maps.Marker({
            position: {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            },
            map: map,
          });
          const markerId = `content-${markerCounter}`;

          markerInfoWindow = new google.maps.InfoWindow({
            content: `<div id="${markerId}"></div>`,
          });

          markerClickListener = newMarker.addListener("click", (e) => {
            let scale = Math.pow(2, map.getZoom());
            let nw = new google.maps.LatLng(
              map.getBounds().getNorthEast().lat(),
              map.getBounds().getSouthWest().lng()
          );
            let worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
            let worldCoordinate = map.getProjection().fromLatLngToPoint(e.latLng);
            console.log("World Coordinates: " + worldCoordinate)
            setSelectedMarker(newMarker);
            console.log("marker: " + newMarker.getPosition().lat())
            let pixelOffsetX = Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale)
            let pixelOffsetY = Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
            
         
          setMarkerPixelPositionX(pixelOffsetX)
          setMarkerPixelPositionY(pixelOffsetY)
          console.log(pixelOffsetX+ " " + pixelOffsetY )

          })
         

          markerRightClickListener = newMarker.addListener("rightclick", (e) => {
            markerInfoWindow.open(map, newMarker);
          });

          domReadyListener = google.maps.event.addListener(markerInfoWindow, 'domready', () => {
            const contentNode = document.getElementById(markerId);
            let root = contentNode._reactRootContainer;

            if (root) {
              root.render(<MarkerMenu />);
            } else {
              root = ReactDOM.createRoot(contentNode);
              root.render(<MarkerMenu />);
            }
          });

          setMarkers(markers=> [...markers, newMarker]);

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
      {selectedMarker && 
        <MarkerInfo 
          style={{left: `${markerPixelPositionX}px`, top: `${markerPixelPositionY}px`}} 
          lat={selectedMarker.getPosition().lat()} 
          lng={selectedMarker.getPosition().lng()} 
        />
      }
    </div>
  );
    }  

export default Map;
