import { useRouter } from "vue-router";
import { useStore } from "../../../store/store";
import { useToast } from "vue-toastification";
import { clientsApi } from "../../../services/clients-api";

export function useDeleteClient() {
  const store = useStore();
  const router = useRouter();
  const toast = useToast();

  return async (id: number) =>
    await clientsApi
      .deleteClientById(id)
      .then((res) => {
        toast.error("Client Deleted");
        store.commit("delClientById", id);
      })
      .catch((err) => {
        toast.error(err.toString());
        router.push("/login");
      });
}
