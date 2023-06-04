import { useToast } from "vue-toastification";
import { useStore } from "../../../store/store";
import { useRouter } from "vue-router";
import { companyApi } from "../../../services/company-api";

export function useCreateCompany() {
  const toast = useToast();
  const store = useStore();
  const router = useRouter();

  return async (body: any) =>
    await companyApi
      .addCompany(body)
      .then(() => {
        toast.success("Company Created");
        store.dispatch("fetchCompanies");
      })
      .catch((err) => {
        toast.error(err.toString());
        router.push("/login");
      });
}