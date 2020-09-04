import {ItemInterface} from "../../../services/Store/Shop/shop.types";
import groups from "../../../constants/Groups.json";

export const shopActions = {
  async createItemsList({commit, state}) {
    const response = await fetch('/products.json');
    const products = await response.json();
    commit('products', products);

    let items = state.products
      .map(function (item: ItemInterface) {
        try {
          if (groups[item.group])
            return Object.assign({}, groups[item.group], item);
          else
            return Object.assign({}, item)
        } catch (e) {
          return undefined;
        }
      })
      .filter(function (item) {
        return item !== undefined
      });
    commit('items', items);
  }
}