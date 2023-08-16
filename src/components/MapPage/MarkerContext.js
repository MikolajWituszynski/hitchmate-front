import { createContext, useContext, useState } from 'react';

const MarkerContext = createContext();

export function useMarkerContext() {
  return useContext(MarkerContext);
}

export function MarkerProvider({ children }) {
  const [markers, setMarkers] = useState([]);


  const updateMarker = (markerId, updatedData) => {
    const updatedMarkers = markers.map(marker =>
      marker.id === markerId ? { ...marker, ...updatedData } : marker
    );
    setMarkers(updatedMarkers);
  };

  return (
    <MarkerContext.Provider
      value={{
        markers,
        setMarkers,
        updateMarker,
      }}
    >
      {children}
    </MarkerContext.Provider>
  );
}
