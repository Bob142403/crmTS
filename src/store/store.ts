import { clientsModule, ClientsState } from "./modules/clients";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export interface State {
  clientsModule: ClientsState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: { clientsModule },
});

export function useStore() {
  return baseUseStore(key);
}
