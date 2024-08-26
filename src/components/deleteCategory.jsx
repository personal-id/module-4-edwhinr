import React from 'react';
import axios from 'axios';

const DeleteCategory = ({ onDelete }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onDelete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Delete</button>
    </form>
  );
};

export default DeleteCategory;