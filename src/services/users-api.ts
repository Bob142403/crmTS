import CreateUser from "../types/CreateUser";
import User from "../types/User";

const baseURL = "http://localhost:3000/users";

export const usersApi = {
  addUser: async (user: CreateUser) => {
    return await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(user),
    });
  },
  getUsers: async () => {
    return await fetch(baseURL, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }).then((users) => users.json());
  },
  getUserById: async (userId: number) => {
    return await fetch(baseURL + `/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  },
  changeUserById: async (userId: number, newData: User) =>
    await fetch(baseURL + `/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newData),
    }),
  deleteUserById: async (userId: number) =>
    await fetch(baseURL + `/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }),
};
