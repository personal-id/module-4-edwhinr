import React, { useState } from 'react';
import axios from 'axios';

const UpdateCategory = ({ category, onUpdate }) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedCategory = { id: category.id, name, description };
    onUpdate(updatedCategory);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      <br />
      <label>Description:</label>
      <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
      <br />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateCategory;