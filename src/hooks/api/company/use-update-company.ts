import { useToast } from "vue-toastification";
import { useStore } from "../../../store/store";
import { useRouter } from "vue-router";
import { companyApi } from "../../../services/company-api";

export function useUpdateCompany() {
  const toast = useToast();
  const store = useStore();
  const router = useRouter();

  return async (id: number, body: any) =>
    await companyApi
      .changeCompanyById(id, body)
      .then((res) => {
        toast("Company Updated");
        store.commit("updateCompanyById", body);
      })
      .catch((err) => {
        toast.error(err.toString());
        router.push("/login");
      });
}
