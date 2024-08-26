import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCategory from '../components/postCategory.jsx';
import UpdateCategory from '../components/updateCategory.jsx';
import DeleteCategory from '../components/deleteCategory.jsx';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handlePostCategory = (newCategory) => {
    axios.post('http://localhost:8080/categories', newCategory)
      .then(response => {
        setCategories([...categories, response.data]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUpdateCategory = (updatedCategory) => {
    axios.put(`http://localhost:8080/categories/${updatedCategory.id}`, updatedCategory)
      .then(response => {
        setCategories(categories.map(category => category.id === updatedCategory.id ? updatedCategory : category));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteCategory = (categoryId) => {
    axios.delete(`http://localhost:8080/categories/${categoryId}`)
      .then(response => {
        setCategories(categories.filter(category => category.id !== categoryId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Category Page</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <span>{category.name}</span>
            <button onClick={() => handleSelectCategory(category)}>Edit</button>
            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <UpdateCategory category={selectedCategory} onUpdate={handleUpdateCategory} />
      )}
      <PostCategory onPost={handlePostCategory} />
      <DeleteCategory onDelete={handleDeleteCategory} />
    </div>
  );
};

export default CategoryPage;