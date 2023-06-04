import { useRouter } from "vue-router";
import { useStore } from "../../../store/store";
import { useToast } from "vue-toastification";
import CreateUser from "../../../types/CreateUser";
import { usersApi } from "../../../services/users-api";

export function useCreateUser() {
  const store = useStore();
  const router = useRouter();
  const toast = useToast();

  return async (body: CreateUser) =>
    await usersApi
      .addUser(body)
      .then((res) => {
        toast.success("User Created");
        store.dispatch("fetchUsers");
      })
      .catch((err) => {
        toast.error(err.toString());
        router.push("/login");
      });
}
