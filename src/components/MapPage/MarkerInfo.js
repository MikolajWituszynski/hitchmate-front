import React, {useState} from 'react';
import { useMarkerContext } from './MarkerContext';

const MarkerInfo = ({ style, onClose, description, title,lat,lng }) => {
  const { markers, updateMarker, currentId } = useMarkerContext();

  
  return (
    <div>
      <div
        className="bg-blue-500 rounded p-2 my-2"
        style={{
          ...style,
          position: 'absolute',
          backgroundColor: 'white',
          zIndex: 1000,
          display: 'flex',
        }}
      >
        <button className="ml-auto" onClick={onClose} style={{ cursor: 'pointer' }}>
          x
        </button>
        <div className="bg-blue-500 text-white rounded p-2 my-2">Title: { title}</div>
        <div className="bg-blue-500 text-white rounded p-2 my-2">Description: { description}</div>
        <div className="bg-blue-500 text-white rounded p-2 my-2">Latitude: {lat}</div>
        <div className="bg-blue-500 text-white rounded p-2 my-2">Longitude: {lng}</div>
      </div>
    </div>
  );
};

export default MarkerInfo;
