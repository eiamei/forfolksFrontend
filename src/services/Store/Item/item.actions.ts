import { RoutePropsInterface } from "@/services/Store/Item/item.types";
import slugify from "slugify";

interface ParamInterface {
    root: string;
    properties: Array<string>;
}

export const itemActions = {
    init ({ state, dispatch, commit }, routeParams: RoutePropsInterface): void {
        // console.log(store);
        let params : ParamInterface = {
            root: '',
            properties: []
        };
        Object.keys(routeParams).forEach(param => {
            if (param === 'root')
                params.root = routeParams[param];
            else if (routeParams[param]) {
                params.properties.push(routeParams[param])
            }
        });
        dispatch('findItem', params);
        dispatch('findImages', params);
    },
    findItem ({rootState, commit}, params) {
        let item = null
        try {
            item = rootState.store.items.find(function (item) {
                if (item.rootPath === params.root && item.selectableProperty.length === params.properties.length) {
                    for (let i = 0, len = params.properties.length; i < len; i++) {
                        if (!item.selectableProperty.find(property => slugify(property.value.toLowerCase()) === slugify(params.properties[i].toLowerCase()))) return false;
                    }
                    return item;
                }
                return false
            });
        } catch (e) {
            console.log(e);
        }
        if (item) {
            commit('data', item);
        }
    },
    findImages ({state, commit}, params) {
        if (state.item) {
            let path = state.item.rootPath;
            if (state.item.selectableProperty.length)
                state.item.selectableProperty.forEach(property => {
                    path += `-${slugify(property.value.toLowerCase())}`
                });
            let images = [];
            for (let i = 0, len = 10; i < len; i++) {
                try {
                    images.push(require(`@/assets/images/store/${path}${i > 0 ? '(' + i + ')' : ''}.jpg`))
                } catch (e) {
                    break;
                }
            }
            commit('images', images);
        }
    }
}