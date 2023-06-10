import { instance, makeApiURL } from "./axios";

const getApiURL = (path: string) => makeApiURL("users", path);

export const usersApi = {
  addUser: async (user: any) => {
    return await instance.post(getApiURL("create-user"), user);
  },
  getUsers: async () => {
    return await instance.get(getApiURL("list"));
  },
  getUserById: async (userId: number) =>
    await instance.get(getApiURL(`get-user/${userId}`)),
  changeUserById: async (userId: number, newData: any) =>
    await instance.put(getApiURL(`update-user/${userId}`), newData),
  deleteUserById: async (userId: number) =>
    await instance.delete(getApiURL(`delete-user/${userId}`)),
};
