import axios from "axios";
import CreateUser from "../types/CreateUser";
import User from "../types/User";

const baseURL = "http://localhost:3000/users";

export const usersApi = {
  addUser: async (user: CreateUser) => {
    return await axios.post(baseURL, user);
  },
  getUsers: async () => {
    return await axios.get(baseURL);
  },
  getUserById: async (userId: number) =>
    await axios.get(baseURL + `/${userId}`),
  changeUserById: async (userId: number, newData: User) =>
    await axios.put(baseURL + `/${userId}`, newData),
  deleteUserById: async (userId: number) =>
    await axios.delete(baseURL + `/${userId}`),
  signUp: async (info: CreateUser) =>
    await fetch("http://localhost:3000/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    }),
};
