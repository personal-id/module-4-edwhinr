import axios from 'axios';

const apiUrl = 'http://localhost:8080';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, { email, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    return true;
  } catch (error) {
    return false;
  }
};

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  }
  return false;
};

const logout = () => {
  localStorage.removeItem('token');
};

export { login, isLoggedIn, logout };