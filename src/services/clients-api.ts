import axios from "axios";
import Client from "../types/Client";
import CreateClient from "../types/CreateClient";

const baseURL = "http://localhost:3000/clients";

export const clientsApi = {
  getClients: async () => {
    return await axios.get(baseURL + "/list");
  },
  deleteClientById: async (clientId: number) =>
    await axios.delete(baseURL + `/delete-client/${clientId}`),
  changeClientById: async (clientId: number, newData: Client) =>
    await axios.put(baseURL + `/update-client/${clientId}`, newData),
  getClientById: async (clientId: number) =>
    await axios.get(baseURL + `/get-client/${clientId}`),
  addClient: async (client: CreateClient) =>
    await axios.post(baseURL + "/create-client", client),
};
