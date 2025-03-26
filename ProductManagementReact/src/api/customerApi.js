import axios from 'axios';
import config from '../config';

const API_URL = config.API_URL+"/customers";

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


// Fetch customers with pagination and search
export const getCustomers = (keyword = '', pageNumber = 1, pageSize = 10) => 
  api.get(`/search`, {
    params: { keyword, pageNumber, pageSize },
  });

export const getCustomerById = (id) => api.get(`/${id}`);
export const createCustomer = (customer) => api.post('/create', customer);
export const updateCustomer = (id, customer) => api.put(`update/`, customer);
export const deleteCustomer = (id) => api.delete(`/${id}`);
