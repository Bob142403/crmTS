import { useToast } from "vue-toastification";
import { useStore } from "../../../store/store";
import { useRouter } from "vue-router";
import { companyApi } from "../../../services/company-api";
import CreateCompany from "../../../types/CreateCompany";

export function useCreateCompany() {
  const toast = useToast();
  const store = useStore();
  const router = useRouter();

  return async (body: CreateCompany) =>
    await companyApi
      .createCompany(body)
      .then((res) => {
        toast(res.data);
        store.dispatch("fetchCompanies");
      })
      .catch((err) => {
        toast.error(err.toString());
        router.push("/login");
      });
}
