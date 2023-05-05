import Client from "../types/Client";
import CreateClient from "../types/CreateClient";

const baseURL = "http://localhost:3000/clients";

export const clientsApi = {
  getClients: async () => {
    return await fetch(baseURL, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }).then((clients) => clients.json());
  },
  deleteClientById: async (clientId: number) => {
    await fetch(`http://localhost:3000/clients/${clientId}`, {
      method: "DELETE",
    });
  },
  changeClientById: async (clientId: number, newData: Client) => {
    await fetch(`http://localhost:3000/clients/${clientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newData),
    });
  },
  getClientById: async (clientId: number) => {
    return fetch(`http://localhost:3000/clients/${clientId}`).then((client) =>
      client.json()
    );
  },
  addClient: async (client: CreateClient) => {
    await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(client),
    });
  },
};
