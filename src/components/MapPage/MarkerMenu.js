import React from 'react';
import { useState } from 'react';

const MarkerMenu = () => {
  const[isEditShown, setEditIsShown] = useState(false)

  const handleEditClick = () => {
    setEditIsShown(true);
    
  }

  const handleDeleteClick = () => {
    console.log("Delete Marker button clicked");
    // Add your logic for handling deleting a marker
  }

  const handleSave = () => {
    console.log("Save")
  }

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
              <input className="border " type="text" name="name" />
          </label> <label>
              Description:
              <input className="border" type="text" name="name" />
          </label>         
        </form>
        <button onClikc={handleSave} className="bg-blue-500 text-white rounded p-0.5 my-0.5">Save</button>
        </div>}
        </div>
  )
}

export default MarkerMenu;
