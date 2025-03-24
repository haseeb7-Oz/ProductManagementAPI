import axios from 'axios';

const API_URL = 'http://localhost:5143/api/products';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

 
export const getProducts = () => api.get('/');
export const getProductById = (id) => api.get(`/${id}`);
export const createProduct = (product) => api.post('/create', product);
export const updateProduct = (id, product) => api.put(`update/`, product);
export const deleteProduct = (id) => api.delete(`/${id}`);