import CreateClient from "../types/CreateClient";
import { instance, makeApiURL } from "./axios";

const getApiURL = (path: string) => makeApiURL("clients", path);

export const clientsApi = {
  getClients: async () => {
    return await instance.get(getApiURL("/list"));
  },
  getClientsByCompanyId: async (companyId: number) =>
    await instance.get(getApiURL(`/get-clients-companyId/${companyId}`)),
  deleteClientById: async (clientId: number) =>
    await instance.delete(getApiURL(`/delete-client/${clientId}`)),
  changeClientById: async (clientId: number, newData: CreateClient) =>
    await instance.put(getApiURL(`/update-client/${clientId}`), newData),
  getClientById: async (clientId: number) =>
    await instance.get(getApiURL(`/get-client/${clientId}`)),
  addClient: async (client: CreateClient) =>
    await instance.post(getApiURL("/create-client"), client),
};
