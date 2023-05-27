import axios from "axios";
import CreateUser from "../types/CreateUser";
import User from "../types/User";

const baseURL = "http://localhost:3000/users";

const instance = axios.create({
  baseURL,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export const usersApi = {
  addUser: async (user: CreateUser) => {
    return await instance.post("/create-user", user);
  },
  getUsers: async () => {
    return await instance.get("/list");
  },
  getUserById: async (userId: number) =>
    await instance.get(`/get-user/${userId}`),
  changeUserById: async (userId: number, newData: User) =>
    await instance.put(`/update-user/${userId}`, newData),
  deleteUserById: async (userId: number) =>
    await instance.delete(`/delete-user/${userId}`),
  getUsersByCompanyId: async (company_id: number) =>
    await instance.get(`/get-users-companyId/${company_id}`),
};
