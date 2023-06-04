import { useToast } from "vue-toastification";
import { clientsApi } from "../../../services/clients-api";
import Client from "../../../types/Client";
import CreateClient from "../../../types/CreateClient";

export function useCreateClient() {
  const toast = useToast();

  return async (body: CreateClient) =>
    await clientsApi
      .addClient(body)
      .then((res) => {
        toast.success("Client Created");
        return res;
      })
      .catch((err) => {
        toast.error(err.toString());
      });
}
