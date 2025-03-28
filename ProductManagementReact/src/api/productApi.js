import axios from 'axios';
import config from '../config';

const API_URL = config.API_URL+"/plan-management";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request interceptor for adding token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Fetch products with pagination and search
export const getProducts = (keyword = '', pageNumber = 1, pageSize = 10) => 
  api.get(`/search`, {
    params: { keyword, pageNumber, pageSize },
  });

export const getProductById = (id) => api.get(`/${id}`);
export const createProduct = (product) => api.post('/create', product);
export const updateProduct = (id, product) => api.put(`update/`, product);
export const deleteProduct = (id) => api.delete(`/${id}`);
