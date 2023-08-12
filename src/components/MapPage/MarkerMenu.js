import React from 'react';
import { useState } from 'react';

const MarkerMenu = ({ setMarkerDescription , setMarkerTitle, title, description, style,onClose}) => {
  const[isEditShown, setEditIsShown] = useState(false)
  const [newDescription, setNewDescription] = useState(description || "");
  const [newTitle, setNewTitle] = useState(title || "");
  const handleEditClick = (event) => {
    event.preventDefault();
    setEditIsShown(true);
    
  }

  const handleDeleteClick = () => {
    // Add your logic for handling deleting a marker
  }

  const handleSave = event => {
    event.preventDefault();
    setMarkerTitle(newTitle);
    setMarkerDescription(newDescription);  
    setEditIsShown(false);

  };

  return (
        <div  style={{
          ...style,
          position: 'absolute',
          backgroundColor: 'white',
          zIndex: 1000,
          display:"flex"
        }} >
          <button
            className="ml-auto"
            onClick={onClose}
            style={{ cursor: 'pointer' }}
            
          >
            x
          </button>
        {!isEditShown ? 
          <div className="flex flex-col">
        <button className="bg-blue-500 text-white rounded p-2 my-2" onClick={handleEditClick}>Edit Marker</button>
        <button className="bg-blue-500 text-white rounded p-2 my-2" onClick={handleDeleteClick}>Delete Marker</button>
        </div> : 
        <div >
        <form className="flex flex-col">
          <label>
              Title:
              <input className="border " type="text" name="name" value={newTitle} onChange={(e) =>{ setNewTitle(e.target.value)}}/>
          </label> <label>
              Description:
              <input className="border" type="text" name="name" value={newDescription} onChange={(e) => {setNewDescription(e.target.value)  }}/>
         </label>
         <button onClick={handleSave}>Save</button>
        </form>
        </div>}
        </div>
  )
}

export default MarkerMenu;
