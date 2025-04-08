import axios from 'axios';
import config from '../config';

const API_URL = "http://localhost:5143/api/tier";

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

// Export as a named export
export const getPlanOffers = () => {
  return api.get('', {
    params: {}
  });
};