import CreateUser from "../types/CreateUser";
import User from "../types/User";

const baseURL = "http://localhost:3000/users";

export const usersApi = {
  addUser: async (user: CreateUser) => {
    await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
  },
  getUsers: async () => {
    return await fetch(baseURL).then((users) => users.json());
  },
  getUserById: async (userId: number) => {
    return await fetch(baseURL + `/${userId}`).then((res) => res.json());
  },
  changeUserById: async (userId: number, newData: User) => {
    await fetch(baseURL + `/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newData),
    });
  },
  deleteUserById: async (userId: number) => {
    await fetch(baseURL + `/${userId}`, {
      method: "DELETE",
    });
  },
};
