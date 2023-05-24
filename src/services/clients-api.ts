import axios from "axios";
import Client from "../types/Client";
import CreateClient from "../types/CreateClient";

const baseURL = "http://localhost:3000/clients";

export const clientsApi = {
  getClients: async () => {
    return await axios.get(baseURL + "/list", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  deleteClientById: async (clientId: number) =>
    await axios.delete(baseURL + `/delete-client/${clientId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }),
  changeClientById: async (clientId: number, newData: Client) =>
    await axios.put(baseURL + `/update-client/${clientId}`, newData, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }),
  getClientById: async (clientId: number) =>
    await axios.get(baseURL + `/get-client/${clientId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }),
  addClient: async (client: CreateClient) =>
    await axios.post(baseURL + "/create-client", client, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }),
};
