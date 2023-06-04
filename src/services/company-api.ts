import Company from "../types/Company";
import CreateCompany from "../types/CreateCompany";
import { instance, makeApiURL } from "./axios";

const getApiURL = (path: string) => makeApiURL("company", path);

export const companyApi = {
  getCompanies: async () => await instance.get(getApiURL("/list")),
  addCompany: async (data: CreateCompany) =>
    await instance.post(getApiURL("create-company"), data),
  deleteCompanyById: async (companyId: number) =>
    await instance.delete(getApiURL(`delete-company/${companyId}`)),
  changeCompanyById: async (companyId: number, newData: Company) =>
    await instance.put(getApiURL(`update-company/${companyId}`), newData),
  getCompanyById: async (companyId: number) =>
    await instance.get(getApiURL(`get-company/${companyId}`)),
};
