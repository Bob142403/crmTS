import axios from "axios";
import CreateUser from "../types/CreateUser";
import User from "../types/User";

const baseURL = "http://localhost:3000/users";

export const usersApi = {
  addUser: async (user: CreateUser) => {
    return await axios.post(baseURL + "/create-user", user, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  getUsers: async () => {
    return await axios.get(baseURL + "/list", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  getUserById: async (userId: number) =>
    await axios.get(baseURL + `/get-user/${userId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }),
  changeUserById: async (userId: number, newData: User) =>
    await axios.put(baseURL + `/update-user/${userId}`, newData, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }),
  deleteUserById: async (userId: number) =>
    await axios.delete(baseURL + `/delete-user/${userId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }),
};
