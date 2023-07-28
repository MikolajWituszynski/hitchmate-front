import React from 'react';

const MarkerMenu = () => {
  const handleEditClick = () => {
    console.log("Edit Marker button clicked");
    // Add your logic for handling editing a marker
  }

  const handleDeleteClick = () => {
    console.log("Delete Marker button clicked");
    // Add your logic for handling deleting a marker
  }

  return (
    <div className="flex-col">
      <button onClick={handleEditClick}>Edit Marker</button>
      <button onClick={handleDeleteClick}>Delete Marker</button>
    </div>
  )
}

export default MarkerMenu;
