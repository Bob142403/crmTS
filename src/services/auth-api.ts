import CreateUser from "../types/CreateUser";
import { instance } from "./axios";

export const authApi = {
  signIn: async (account: any) => {
    return await instance.post("/login", account);
  },
  signUp: async (info: CreateUser) => await instance.post("/sign-up", info),
  auth: async () =>
    await instance.get("/auth", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }),
  chooseCompany: async (id: number, data: any) =>
    await instance.put(`/choose-company/${id}`, data),
};
