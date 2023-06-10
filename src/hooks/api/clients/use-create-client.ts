import { useToast } from "vue-toastification";
import { clientsApi } from "../../../services/clients-api";
import CreateClient from "../../../types/CreateClient";
import { useStore } from "../../../store/store";
import { useRouter } from "vue-router";

export function useCreateClient() {
  const toast = useToast();
  const store = useStore();
  const router = useRouter();

  return async (body: CreateClient) =>
    await clientsApi
      .createClient(body)
      .then((res) => {
        store.dispatch("fetchClients");
        toast.success(res.data);
        return res;
      })
      .catch((err) => {
        toast.error(err.toString());
        router.push("/login");
      });
}
