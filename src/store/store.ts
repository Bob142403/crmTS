import { companiesModule, CompaniesState } from "./modules/company";
import { clientsModule, ClientsState } from "./modules/clients";
import { usersModule, UsersState } from "./modules/users";
import { authModule, AuthState } from "./modules/auth";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export interface State {
  clientsModule: ClientsState;
  usersModule: UsersState;
  authModule: AuthState;
  companiesModule: CompaniesState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    usersModule,
    clientsModule,
    authModule,
    companiesModule,
  },
});

export function useStore() {
  return baseUseStore(key);
}
