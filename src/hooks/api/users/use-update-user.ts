import { useToast } from "vue-toastification";
import { useStore } from "../../../store/store";
import { useRouter } from "vue-router";
import { usersApi } from "../../../services/users-api";

export function useUpdateUser() {
  const store = useStore();
  const toast = useToast();
  const router = useRouter();

  return async (id: number, body: any) =>
    await usersApi
      .changeUserById(id, body)
      .then((res) => {
        toast("User Updated");
        store.commit("updateUserById", body);
      })
      .catch((err) => {
        toast.error(err.toString());
        router.push("/login");
      });
}
