import axios from "axios";
import CreateUser from "../types/CreateUser";
import User from "../types/User";

const baseURL = "http://localhost:3000/users";

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

export const usersApi = {
  addUser: async (user: CreateUser) => {
    return await axios.post(baseURL + "/create-user", user);
  },
  getUsers: async () => {
    return await axios.get(baseURL + "/list");
  },
  getUserById: async (userId: number) =>
    await axios.get(baseURL + `/get-user/${userId}`),
  changeUserById: async (userId: number, newData: User) =>
    await axios.put(baseURL + `/update-user/${userId}`, newData),
  deleteUserById: async (userId: number) =>
    await axios.delete(baseURL + `/delete-user/${userId}`),
};
