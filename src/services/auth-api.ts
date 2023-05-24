import axios, { AxiosInstance } from "axios";
import CreateUser from "../types/CreateUser";

const baseURL = "http://localhost:3000";

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export const authApi = {
  signIn: async (account: any) => {
    return await apiClient.post("/login", account, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  signUp: async (info: CreateUser) =>
    await axios.post(baseURL + "/sign-up", info, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }),
  auth: async () =>
    await apiClient.get("/auth", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }),
};
