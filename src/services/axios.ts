import axios from "axios";

const baseURL = "http://localhost:3000";

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

export const instance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export function makeApiURL(base: string, path: string) {
  return `/${base}/${path}`;
}
