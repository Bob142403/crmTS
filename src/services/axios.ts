import axios from "axios";

const baseURL = "http://localhost:3000";

export const instance = axios.create({
  baseURL,
  headers: {
    Authorization: localStorage.getItem("token"),
    "Content-type": "application/json",
  },
});

export function makeApiURL(base: string, path: string) {
  return `/${base}/${path}`;
}
