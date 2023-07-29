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
  const [markerPixelPosition, setMarkerPixelPosition] = useState(null);

  console.log("Here is the selected marker: ", selectedMarker); // Moved here

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
            console.log("Marker clicked!");

            setSelectedMarker(newMarker);

          })
          markerClickListener = newMarker.addListener("dbclick", (e) => {
            console.log("Marker clicked!");

            setSelectedMarker(null);

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

          setMarkers(prevMarkers => [...prevMarkers, newMarker]);
          console.log("Here is the selected markers: ", markers); // Moved here

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
    <div>
      {selectedMarker && <MarkerInfo lat={selectedMarker.lat} lng={selectedMarker.lng} />}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default Map;
