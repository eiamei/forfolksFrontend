import { shopState } from "../../../services/Store/Shop/shop.state";
import { shopActions } from "../../../services/Store/Shop/shop.actions";
import { shopGetters } from "../../../services/Store/Shop/shop.getters";
import { shopMutation } from "../../../services/Store/Shop/shop.mutations";

export const shop = {
    namespaced: true,
    state: shopState(),
    actions: shopActions,
    getters: shopGetters,
    mutations: shopMutation
};