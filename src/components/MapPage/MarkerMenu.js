import React from 'react';
import { useState } from 'react';

const MarkerMenu = ({description, setMarkerDescription , title, setMarkerTitle}) => {
  const[isEditShown, setEditIsShown] = useState(false)
  

  const handleEditClick = (event) => {
    event.preventDefault();
    setEditIsShown(true);
    
  }

  const handleDeleteClick = () => {
    console.log("Delete Marker button clicked");
    // Add your logic for handling deleting a marker
  }

  const handleSave = (event) => {
    event.preventDefault();
    console.log("SAVE!")
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
