import axios from "axios";

// Read base URL from Vite env
export const BASE_URL = import.meta.env?.VITE_BASE_URL || "";

// Preconfigured Axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});


