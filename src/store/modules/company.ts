import { Module } from "vuex";
import { State } from "../store";
import Company from "../../types/Company";
import { companyApi } from "../../services/company-api";

export interface CompaniesState {
  companies: Company[];
}

export const companiesModule: Module<CompaniesState, State> = {
  actions: {
    async fetchCompanies(ctx) {
      companyApi.getCompanies().then((res) => {
        ctx.commit("setCompanies", res.data);
      });
    },
  },
  state: () => ({ companies: [] }),
  mutations: {
    setCompanies(state, newData: Company[]) {
      state.companies = newData;
    },
    addCompany(state, company: Company) {
      state.companies.push(company);
    },
    updateCompanyById(state, user: Company) {
      state.companies = state.companies.map((company) => {
        if (company.id === user.id) {
          return { ...user };
        } else return { ...company };
      });
    },
    delCompanyById(state, companyId: number) {
      state.companies = state.companies.filter(
        (company) => company.id !== companyId
      );
    },
  },
  getters: {
    getCompanies: (state) => state.companies,
    getCompanyById: (state) => (companyId: number) =>
      state.companies.find((company) => company.id === companyId),
  },
};
