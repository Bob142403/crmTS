import { Module } from "vuex";
import { State } from "../store";
import Auth from "../../types/Auth";

export interface AuthState {
  auth: Auth;
}

export const authModule: Module<AuthState, State> = {
  state: () => ({
    auth: {
      email: "",
      last_name: "",
      first_name: "",
      company_id: 0,
      id: 0,
      role: "",
    },
  }),
  mutations: {
    setAuth: (state, user) => {
      state.auth = user;
    },
    signOut: (state) => {
      state.auth = {
        email: "",
        last_name: "",
        first_name: "",
        company_id: 0,
        id: 0,
        role: "",
      };
    },
  },
  getters: {
    getInfoAboutUser: (state) => state.auth,
  },
};
