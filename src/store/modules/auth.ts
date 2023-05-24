import { Module } from "vuex";
import { State } from "../store";
import Auth from "../../types/Auth";

export interface AuthState {
  auth: Auth;
}

export const authModule: Module<AuthState, State> = {
  state: () => ({
    auth: { email: "", password: "", last_name: "", first_name: "" },
  }),
  mutations: {
    setAuth: (state, user) => {
      state.auth = user;
    },
  },
};
