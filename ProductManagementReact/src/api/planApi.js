import axios from 'axios';
import config from '../config';

const API_URL = config.API_URL + "/plan-management";

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

// Fetch plans with pagination and search
export const getPlans = (searchDto) => 
    api.post(`/search`, searchDto);

export const getPlanById = (id) => api.get(`/${id}`);
export const createPlan = (plan) => api.post('/create', plan);
export const updatePlan = (id, plan) => api.put(`/update/`, plan);
export const deletePlan = (id) => api.delete(`/${id}`);
