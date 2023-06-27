import { GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
const containerStyle = {
    width: '100%',
    height: '100vh',
  };
const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
        mapContainerStyle={containerStyle}
          center={{ lat: 18.52043, lng: 73.856743 }}
          zoom={10}
        >
        </GoogleMap>
      )}
    </div>
  );
};

export default MapPage;