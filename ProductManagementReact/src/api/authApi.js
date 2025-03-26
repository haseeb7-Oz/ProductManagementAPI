import axios from "axios";
import config from "../config";

const API_URL = `${config.API_URL}/Auth`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login API call
export const login = async (credentials) => {
  return await api.post("/login", credentials);
};

// Logout function (optional)
export const logout = () => {
  localStorage.removeItem("token");
};
