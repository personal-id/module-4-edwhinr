import React, { useState } from 'react';
import axios from 'axios';

const PostCategory = ({ onPost }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCategory = { name, description };
    onPost(newCategory);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      <br />
      <label>Description:</label>
      <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
      <br />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostCategory;