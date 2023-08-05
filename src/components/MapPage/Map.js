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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


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
          const markerId = `content-${markerCounter}`;

          const newMarkerData = {
            marker: new google.maps.Marker({
              position: {
                lat:e.latLng.lat(),
                lng:e.latLng.lng(),
              },
              map:map
            }),
            id:markerId,
            title:"",
            description:""
          };

         

          markerInfoWindow = new google.maps.InfoWindow({
            content: `<div id="${markerId}"></div>`,
          });

          markerClickListener = newMarkerData.marker.addListener("click", (e) => {
            let scale = Math.pow(2, map.getZoom());
            let nw = new google.maps.LatLng(
              map.getBounds().getNorthEast().lat(),
              map.getBounds().getSouthWest().lng()
          );
            let worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
            let worldCoordinate = map.getProjection().fromLatLngToPoint(e.latLng);
            console.log("World Coordinates: " + worldCoordinate)
            setSelectedMarker(newMarkerData);
            console.log("marker: " + newMarkerData.marker.getPosition().lat())
            let pixelOffsetX = Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale)
            let pixelOffsetY = Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
            
         
          setMarkerPixelPositionX(pixelOffsetX)
          setMarkerPixelPositionY(pixelOffsetY)
          console.log("x :" + pixelOffsetX+ " y: " + pixelOffsetY)
          })
         

          markerRightClickListener = newMarkerData.marker.addListener("rightclick", (e) => {
            markerInfoWindow.open(map, newMarkerData.marker);
          });

          domReadyListener = google.maps.event.addListener(markerInfoWindow, 'domready', () => {
            const contentNode = document.getElementById(markerId);
            let root = contentNode._reactRootContainer;

            if (root) {
              root.render(<MarkerMenu title={newMarkerData.title} description={newMarkerData.description} setTitle={setTitle} setDescription={setDescription} />);
            } else {
              root = ReactDOM.createRoot(contentNode);
              root.render(<MarkerMenu title={newMarkerData.title} description={newMarkerData.description} setTitle={setTitle} setDescription={setDescription}  />);
            }
          });

          setMarkers(markers=> [...markers, newMarkerData]);

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
  }, [apiKey, lat, lng, zoom, description, title]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }} ref={mapContainerRef}>
      {selectedMarker && 
        <MarkerInfo 
          style={{left: `${markerPixelPositionX}px`, top: `${markerPixelPositionY}px`}} 
          lat={selectedMarker.marker.getPosition().lat()} 
          lng={selectedMarker.marker.getPosition().lng()}
          description={description}
          title={title} 
        />
      }
    </div>
  );
    }  

export default Map;
