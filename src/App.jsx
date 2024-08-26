import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import LoginForm from './pages/login.jsx';
import RegisterForm from './pages/registation.jsx';
import CategoryPage from './pages/category.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/category" element={<ProtectedRoute element={<CategoryPage />} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
