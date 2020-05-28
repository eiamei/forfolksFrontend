import { itemState } from "./item.state";
import { itemActions } from "./item.actions";

export const item = {
    namespaced: true,
    state: itemState(),
    actions: itemActions,
};
