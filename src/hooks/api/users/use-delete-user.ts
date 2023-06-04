import { useToast } from "vue-toastification";
import { useStore } from "../../../store/store";
import { useRouter } from "vue-router";
import { usersApi } from "../../../services/users-api";

export function useDeleteUser() {
  const store = useStore();
  const toast = useToast();
  const router = useRouter();

  return async (id: number) =>
    await usersApi
      .deleteUserById(id)
      .then((res) => {
        store.commit("delUserById", id);
        toast.error("User Deleted");
      })
      .catch((err) => {
        toast.error(err.toString());
        router.push("/login");
      });
}
