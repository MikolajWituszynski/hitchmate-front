import React from 'react';
import { useState } from 'react';

const MarkerMenu = ({ setMarkerDescription , setMarkerTitle, title, description, onSave}) => {
  const[isEditShown, setEditIsShown] = useState(false)
  const [newDescription, setNewDescription] = useState(description || ""); // Initialize with empty string

  const handleEditClick = (event) => {
    event.preventDefault();
    setEditIsShown(true);
    
  }

  const handleDeleteClick = () => {
    // Add your logic for handling deleting a marker
  }

  const handleSave = event => {
    event.preventDefault();
    setMarkerTitle(title);
    setMarkerDescription(newDescription); // 
    // Update the title and description using the provided functions
    onSave(); // Call the onSave function to persist changes
    setEditIsShown(false);
    console.log("Description in marker menu: " + description)

  };

  return (
        <div >
        {!isEditShown ? 
          <div className="flex flex-col">
        <button className="bg-blue-500 text-white rounded p-2 my-2" onClick={handleEditClick}>Edit Marker</button>
        <button className="bg-blue-500 text-white rounded p-2 my-2" onClick={handleDeleteClick}>Delete Marker</button>
        </div> : 
        <div >
        <form className="flex flex-col">
          <label>
              Title:
              <input className="border " type="text" name="name" onChange={(e) =>{ setMarkerTitle(e.target.value)}}/>
          </label> <label>
              Description:
              <input className="border" type="text" name="name" onChange={(e) => {setMarkerDescription(e.target.value)  }}/>
         </label>
         <button onClick={handleSave}>Save</button>
        </form>
        </div>}
        </div>
  )
}

export default MarkerMenu;
