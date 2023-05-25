import axios from "axios";

const baseURL = "http://localhost:3000/company";

const instance = axios.create({
  baseURL,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export const companyApi = {
  getCompanies: async () => await instance.get("/list"),
  addCompany: async (data: any) => await instance.post("/create-company", data),
  deleteCompanyById: async (companyId: number) =>
    await instance.delete(`/delete-company/${companyId}`),
  changeCompanyById: async (companyId: number, newData: any) =>
    await instance.put(`/update-company/${companyId}`, newData),
  getCompanyById: async (companyId: number) =>
    await instance.get(`/get-company/${companyId}`),
};
