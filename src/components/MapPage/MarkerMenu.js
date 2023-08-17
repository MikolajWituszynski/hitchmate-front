import React, { useState } from 'react';
import { useMarkerContext } from './MarkerContext';
import axios from 'axios';

const MarkerMenu = ({ id, style, onClose }) => {
  const { markers, updateMarker, currentId } = useMarkerContext();
  const markerData = markers.find(marker => marker.id === id);
  const [isEditOpen, setEditClose] = useState(false);

  const [newDescription, setNewDescription] = useState(markerData.description || "");
  const [newTitle, setNewTitle] = useState(markerData.title || "");
  
  const handleSave = event => {
    event.preventDefault();
    updateMarker(id, { title: newTitle, description: newDescription });
    const jsonMarkerData = {
      title: newTitle,
      description: newDescription
    }
    console.log("new desc: ", newDescription)
    
    axios.put(`http://localhost:8080/markers/${id}?title=${newTitle}&description=${newDescription}`,jsonMarkerData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log("new desc2: ", newDescription)

      console.log("Success", response)
    })
    .catch((error) => {
      console.error("While updating marker, following error occured: " + error)
    })
    onClose();
  };

  const handleEdit = event => {
    setEditClose(true);
  };

  const handleDelete = event => {
    updateMarker(id, {});
  };

  return (
    <div
      style={{
        ...style,
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <button
        className="ml-auto"
        onClick={onClose}
        style={{
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          fontSize: '18px',
          color: '#888',
          alignSelf: 'flex-end',
        }}
      >
        ✕
      </button>
      {!isEditOpen ? (
        <div className="flex flex-col mt-2">
          <button
            className="bg-blue-500 text-white rounded p-2 mb-2"
            onClick={handleEdit}
            style={{ cursor: 'pointer' }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white rounded p-2"
            onClick={handleDelete}
            style={{ cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="flex flex-col mt-2">
          <label className="mb-1 text-sm font-semibold">Title:</label>
          <input
            placeholder="Title..."
            className="border rounded p-1 mb-2"
            type="text"
            name="name"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <label className="mb-1 text-sm font-semibold">Description:</label>
          <textarea
            placeholder="Description..."
            className="border rounded p-1"
            rows="4"
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
          />
        
      
      <button
        className="bg-blue-500 text-white rounded p-2 mt-2"
        onClick={handleSave}
        style={{ cursor: 'pointer', alignSelf: 'flex-end' }}
      >
        Save
      </button>
      
      </div>
      )}
    </div>
  );
};

export default MarkerMenu;
