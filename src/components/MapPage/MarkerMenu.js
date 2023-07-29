import React from 'react';
import { useState } from 'react';

const MarkerMenu = () => {
  const[isEditShown, setEditIsShown] = useState(false)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleEditClick = () => {
    setEditIsShown(true);
    
  }

  const handleDeleteClick = () => {
    console.log("Delete Marker button clicked");
    // Add your logic for handling deleting a marker
  }

  const handleSave = (event) => {
    event.preventDefault();
    console.log(`Title: ${title}, Description: ${description}`);
    // Do something with title and description
    // Then close the edit view
    setEditIsShown(false);
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
              <input className="border " type="text" name="name" onChange={(e) => setTitle(e.target.value)}/>
          </label> <label>
              Description:
              <input className="border" type="text" name="name" onChange={(e) => setDescription(e.target.value)}/>
          </label>
          <button type="submit" value="Submit" className="bg-blue-500 text-white rounded p-0.5 my-0.5" onClick={handleSave} >Save</button>
        </form>
        </div>}
        </div>
  )
}

export default MarkerMenu;
