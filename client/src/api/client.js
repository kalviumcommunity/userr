import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request interceptor to add Authorization header
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// FIXED: Response interceptor for catching 401 errors
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login using vanilla redirection if needed,
      // though Dashboard should handle its own cleanup.
      window.dispatchEvent(new CustomEvent('auth:expired'));
    }
    return Promise.reject(error);
  }
);

export default client;
