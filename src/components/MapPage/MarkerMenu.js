import React, { useState } from 'react';
import { useMarkerContext } from './MarkerContext';

const MarkerMenu = ({ id, style, onClose }) => {
  const { markers, updateMarker, currentId } = useMarkerContext();
  const markerData = markers.find(marker => marker.id === id);
  // if (!markerData) {
  //   return null; // Handle case where marker is not found
  // }
  // Local state for title and description
  const [newDescription, setNewDescription] = useState(markerData.description || "");
  const [newTitle, setNewTitle] = useState(markerData.title || "");

  const handleSave = event => {
    event.preventDefault();
    updateMarker(id, { title: newTitle, description: newDescription });
    console.log(updateMarker)
  
    onClose();
  };

  return (
    <div style={{ ...style, position: 'absolute', backgroundColor: 'white', zIndex: 1000, display: "flex" }}>
      <button className="ml-auto" onClick={onClose} style={{ cursor: 'pointer' }}>x</button>
      
      <div className="flex flex-col">
        <label>
          Title:
          <input className="border" type="text" name="name" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <input className="border" type="text" name="name" value={newDescription} onChange={e => setNewDescription(e.target.value)} />
        </label>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default MarkerMenu;
