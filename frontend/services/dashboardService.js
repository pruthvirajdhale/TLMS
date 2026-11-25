
import api from "./api";

export const getCases = async () => {
  const response = await api.get("/cases");
  return response.data;
};

export const getClients = async () => {
  const response = await api.get("/clients");
  return response.data;
};

