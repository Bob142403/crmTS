import { Module, Store } from "vuex";
import { State } from "../store";
import User from "../../types/User";
import { usersApi } from "../../services/users-api";
import { useRouter } from "vue-router";

export interface UsersState {
  users: User[];
}

export const usersModule: Module<UsersState, State> = {
  actions: {
    async fetchUsers(ctx) {
      usersApi.getUsers().then((res) => {
        ctx.commit("setUsers", res);
      });
    },
  },
  state: () => ({ users: [] }),
  mutations: {
    setUsers(state, newData: User[]) {
      state.users = newData;
    },
    addUser(state, user: User) {
      state.users.push(user);
    },
    updateUserById(state, user: User) {
      state.users = state.users.map((elem) => {
        if (elem.id === user.id) {
          return { ...user };
        } else return { ...elem };
      });
    },
    delUserById(state, userId: number) {
      state.users = state.users.filter((user) => user.id !== userId);
    },
  },
  getters: {
    getUsers: (state) => state.users,
    getUserById: (state) => (userId: number) =>
      state.users.find((user) => user.id === userId),
  },
};
