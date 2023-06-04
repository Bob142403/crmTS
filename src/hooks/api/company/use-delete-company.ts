import { useToast } from "vue-toastification";
import { useStore } from "../../../store/store";
import { useRouter } from "vue-router";
import { companyApi } from "../../../services/company-api";

export function useDeleteCompany() {
  const toast = useToast();
  const store = useStore();
  const router = useRouter();

  return async (id: number) =>
    await companyApi
      .deleteCompanyById(id)
      .then(() => {
        toast.error("Company Deleted");
        store.commit("delCompanyById", id);
      })
      .catch((err) => {
        toast.error(err.toString());
        router.push("/login");
      });
}
