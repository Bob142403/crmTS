import axios from "axios";
import CreateUser from "../types/CreateUser";

const baseURL = "http://localhost:3000";

export const authApi = {
  signIn: async (account: any) => await axios.post(baseURL + "/login", account),
  signUp: async (info: CreateUser) =>
    await axios.post(baseURL + "/sign-up", info),
  auth: async () => await axios.get(baseURL + "/auth"),
};
