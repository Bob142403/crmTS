import { Module } from "vuex";
import { State } from "../store";
import Client from "../../types/Client";
import { clientsApi } from "../../services/clients-api";

export interface ClientsState {
  data: Client[];
}

export const clientsModule: Module<ClientsState, State> = {
  actions: {
    async fetchClients(ctx) {
      await clientsApi
        .getClientsByCompanyId(ctx.rootState.authModule.auth.company_id)
        .then((clients) => {
          ctx.commit("setClient", clients.data);
        });
    },
  },
  state: () => ({ data: [] }),
  getters: {
    getClientById: (state) => (id: number) => {
      return state.data.find((elem) => elem.id === id);
    },
    getClients: (state) => state.data,
  },
  mutations: {
    setClient(state, newData: Client[]) {
      state.data = newData;
    },
    addClient(state, client: Client) {
      state.data.push(client);
    },
    delClientById(state, id: number) {
      state.data = state.data.filter((elem) => elem.id !== id);
    },
    updateClientById(state, client: Client) {
      state.data = state.data.map((elem) => {
        if (elem.id === client.id) {
          return { ...client };
        } else return { ...elem };
      });
    },
  },
};
