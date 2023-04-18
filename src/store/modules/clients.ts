import { Module } from "vuex";
import { State } from "../store";
import Client from "../../types/Client";
import { clientsApi } from "../../services/clients-api";

export interface ClientsState {
  data: Client[];
}

export const clientsModule: Module<ClientsState, State> = {
  actions: {
    async fetchClientsData(ctx) {
      await clientsApi.getClients().then((clients) => {
        ctx.commit("setData", clients);
      });
    },
  },
  state: () => ({ data: [] }),
  getters: {
    getClientById: (state) => (id: number) => {
      console.log(state.data);
      return state.data.find((elem) => elem.id === id);
    },
    getClients: (state) => state.data,
  },
  mutations: {
    setData(state, newData: Client[]) {
      state.data = newData;
      console.log(state.data);
    },
    addClient(state, dt: Client) {
      state.data.push(dt);
    },
    delClientById(state, id: number) {
      state.data = state.data.filter((elem) => elem.id !== id);
    },
    updateClientById(state, obj: Client) {
      state.data = state.data.map((elem) => {
        if (elem.id === obj.id) {
          return { ...obj };
        } else return { ...elem };
      });
      console.log(state.data);
    },
  },
};
