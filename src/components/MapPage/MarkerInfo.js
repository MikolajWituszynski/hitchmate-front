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
          flexDirection: 'column',
        }}
      >
        <button c  className="ml-auto"
    onClick={onClose}
    style={{
      cursor: 'pointer',
      background: 'none',
      wordBreak: 'break-all',
      border: 'none',
      fontSize: '14px',
      color: '#888',
      maxWidth: '50px',
      overflowWrap: 'break-word',


    }}>
        ✕
        </button>
        <div className="flex-col">
        <div className="bg-blue-500 text-white rounded p-2 my-2">Title: { title}</div>
        <div className="bg-blue-500 text-white rounded p-2 my-2 whitespace-pre-wrap break-words w-48 h-20 p-1">Description: { description}</div>
        <div className="bg-blue-500 text-white rounded p-2 my-2">Latitude: {Math.round(lat*100)/100}</div>
        <div className="bg-blue-500 text-white rounded p-2 my-2">Longitude: {Math.round(lng*100)/100}</div>
        </div>
      </div>
    </div>
  );
};

export default MarkerInfo;
