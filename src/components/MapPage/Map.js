// Map.js
import React, { useEffect, useRef } from 'react';
import loadGoogleMapsApi from './loadGoogleMapsApi';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
// We define a functional component called Map
// This component accepts props for apiKey, latitude (lat), longitude (lng), and zoom level
const Map = ({ apiKey, lat, lng, zoom }) => {
  // useRef is a Hook that allows you to create a reference to a DOM element
  // In this case, we're creating a reference to the div element that will contain our Google Map
  const mapContainerRef = useRef(null);
  const infoWindowRef = useRef(null); // Reference to the info window

  // useEffect is a Hook that allows you to perform side effects in function components
  // Here, we're using it to load the Google Maps API and initialize our map when the component mounts
  useEffect(() => {
    // Call our function that returns a Promise for loading the Google Maps API
    // This function dynamically adds a <script> tag to the page to load the Google Maps API
    loadGoogleMapsApi(apiKey)
      // Once the Promise resolves, we have access to the google object
      .then((google) => {
        // Create a new map and attach it to our map container div
        const map = new google.maps.Map(mapContainerRef.current, {
          // Set the center of the map to the provided lat/lng
          center: { lat, lng },
          // Set the zoom level of the map
          zoom,
        });
        const infoWindow = new google.maps.InfoWindow(); // Create a new info window
        infoWindowRef.current = infoWindow; // Store the reference to the info window
        
        const geoJsonPath = new URL('../../countriesGeoJson/Czech_Republic.geojson', import.meta.url).href;
  
        map.data.loadGeoJson(geoJsonPath, {}, () => {
          let markers = [];
    
          map.data.forEach((feature) => {
            let geometry = feature.getGeometry();
            // If the features are points, create the marker from the geometry
            if (geometry.getType() === "Point") {
              let marker = new google.maps.Marker({
                position: geometry.get(),  // Get LatLng of the Point geometry
                map: map // This is important to make sure your markers appear on the map
              });
              markers.push(marker);
            }
          });
    
          new MarkerClusterer({markers, map,minimumClusterSize: 30});
        });
       
      

        map.data.addListener('click', (event) => {
          const feature = event.feature;

          // Set the content of the info window
          infoWindow.setContent(`<div>${feature.h.description}</div>`);

          // Get the coordinates of the clicked feature
          const geometry = feature.getGeometry();
          const position = geometry.get();
          
          // Set the position of the info window and open it on the map
          infoWindow.setPosition(position);
          infoWindow.open(map);
        });
      })
      // If an error occurs while loading the Google Maps API, we log it to the console
      .catch(error => {
        console.error('Error occurred while loading Google Maps API: ', error);
      })
      // Finally, we clean up by deleting the global initMap function
      .finally(() => {
        delete window.initMap;
      })
  // We specify our dependencies for the useEffect hook
  // Whenever the apiKey, lat, lng, or zoom props change, the effect will run again
  }, [apiKey, lat, lng, zoom]);

  // We return a div element that will contain our map
  // We use the ref attribute to attach our mapContainerRef to this div
  // We give the div a width of 100% and a height of 100vh so it fills the entire viewport
  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;
