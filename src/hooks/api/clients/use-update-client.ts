import { useRouter } from "vue-router";
import { useStore } from "../../../store/store";
import { useToast } from "vue-toastification";
import CreateClient from "../../../types/CreateClient";
import { clientsApi } from "../../../services/clients-api";

export function useUpdateClient() {
  const store = useStore();
  const router = useRouter();
  const toast = useToast();

  return async (id: number, body: CreateClient) =>
    await clientsApi
      .changeClientById(id, body)
      .then((res) => {
        toast("Client Updated");
        store.commit("updateClientById", body);
      })
      .catch((err) => {
        toast(err.toString());
        router.push("/login");
      });
}
