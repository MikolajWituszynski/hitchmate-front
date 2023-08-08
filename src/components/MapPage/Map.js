import React, { useEffect, useRef } from 'react';
import loadGoogleMapsApi from './loadGoogleMapsApi';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import MarkerMenu from './MarkerMenu.js';
import MarkerInfo from './MarkerInfo';

const Map = ({ apiKey, lat, lng, zoom }) => {
  const mapContainerRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerPixelPositionX, setMarkerPixelPositionX] = useState(null);
  const [markerPixelPositionY, setMarkerPixelPositionY] = useState(null);
  const [markers, setMarkers] = useState([]);

  const handleCloseInfo = () => {
    setSelectedMarker(null);
  };

  const handleMarkerTitleChange = (markerId, newTitle) => {
    setMarkers(prevMarkers =>
      prevMarkers.map(markerData =>
        markerData.id === markerId ? { ...markerData, title: newTitle } : markerData
      )
    );
    if (selectedMarker && selectedMarker.id === markerId) {
      setSelectedMarker(prevSelectedMarker => ({
        ...prevSelectedMarker,
        description: newTitle
      }));
    }
  };
  const handleMarkerDescriptionChange = (markerId, newDescription) => {
    setMarkers(prevMarkers =>
      prevMarkers.map(markerData =>
        markerData.id === markerId ? { ...markerData, description: newDescription } : markerData
      )
    );
    if (selectedMarker && selectedMarker.id === markerId) {
      setSelectedMarker(prevSelectedMarker => ({
        ...prevSelectedMarker,
        description: newDescription
      }));
    }
  };

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
          console.log("marker ID: " + markerId)
          const newMarkerData = {
            marker: new google.maps.Marker({
              position: {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              },
              map: map
            }),
            id: markerId,
            title: "",
            description: ""
          };

          markerInfoWindow = new google.maps.InfoWindow({
            content: `<div id="${markerId}"></div>`,
          });

          markerClickListener = newMarkerData.marker.addListener("click", (e) => {
            console.log("ID: " + newMarkerData.marker.id)

            let scale = Math.pow(2, map.getZoom());
            let nw = new google.maps.LatLng(
              map.getBounds().getNorthEast().lat(),
              map.getBounds().getSouthWest().lng()
            );
            let worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
            let worldCoordinate = map.getProjection().fromLatLngToPoint(e.latLng);
            setSelectedMarker(newMarkerData);
            let pixelOffsetX = Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale);
            let pixelOffsetY = Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale);

            setMarkerPixelPositionX(pixelOffsetX);
            setMarkerPixelPositionY(pixelOffsetY);
          });

          markerRightClickListener = newMarkerData.marker.addListener("rightclick", (e) => {
            markerInfoWindow.open(map, newMarkerData.marker);
          });

          domReadyListener = google.maps.event.addListener(markerInfoWindow, 'domready', () => {
            const contentNode = document.getElementById(markerId);
            let root = contentNode._reactRootContainer;

            if (!root) {
              root = ReactDOM.createRoot(contentNode);
            }

            root.render(<MarkerMenu
              title={newMarkerData.title}
              description={newMarkerData.description}
              setMarkerTitle={newTitle => handleMarkerTitleChange(markerId, newTitle)}
              setMarkerDescription={newDescription => handleMarkerDescriptionChange(markerId, newDescription)}
            />);
          });

          setMarkers(prevMarkers => [...prevMarkers, newMarkerData]);

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
          lat={selectedMarker.marker.getPosition().lat()} 
          lng={selectedMarker.marker.getPosition().lng()}
          description={selectedMarker.description}
          title={selectedMarker.title} 
          onClose={handleCloseInfo} // Pass the onClose function to the MarkerInfo component
        />
      }
    </div>
  );
};

export default Map;
