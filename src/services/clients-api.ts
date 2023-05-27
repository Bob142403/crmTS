import axios from "axios";
import Client from "../types/Client";
import CreateClient from "../types/CreateClient";

const baseURL = "http://localhost:3000/clients";

const instance = axios.create({
  baseURL,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export const clientsApi = {
  getClients: async () => {
    return await instance.get("/list");
  },
  getClientsByCompanyId: async (companyId: number) =>
    await instance.get(`/get-clients-companyId/${companyId}`),
  deleteClientById: async (clientId: number) =>
    await instance.delete(`/delete-client/${clientId}`),
  changeClientById: async (clientId: number, newData: Client) =>
    await instance.put(`/update-client/${clientId}`, newData),
  getClientById: async (clientId: number) =>
    await instance.get(`/get-client/${clientId}`),
  addClient: async (client: CreateClient) =>
    await instance.post("/create-client", client),
};
