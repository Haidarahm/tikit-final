import { api } from "../config/backend";

// GET /api/work  (with optional lang param)
export const fetchAllWorks = async (params: { lang?: string } = {}) => {
  const response = await api.get("/api/works", { params });
  return response.data;
};

// GET /api/works/{id}/cases
export const fetchAllCases = async (id: string | number) => {
  const response = await api.get(`/api/works/${id}/cases`);
  return response.data;
};


