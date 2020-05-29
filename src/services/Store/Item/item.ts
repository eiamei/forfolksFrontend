import { itemState } from "./item.state";
import { itemActions } from "./item.actions";
import { itemMutations } from "./item.mutations";

export const item = {
    namespaced: true,
    state: itemState(),
    actions: itemActions,
    mutations: itemMutations
};
