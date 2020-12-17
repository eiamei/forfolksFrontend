import {ItemInterface} from "../../../services/Store/Shop/shop.types";
import groups from "../../../constants/Groups.json";

export const shopActions = {
  async createItemsList({commit, state}) {
    // make request to the main shop files
    const productsRequest = await fetch('/products.json');
    // parse the response
    const products = await productsRequest.json();
    const order = products[0];
    const list = products[1];
    // create a products list with correct order
    // TODO should make it smarter
    const orderedProducts = order.map(function (id) {
      return list.find(function (item) {
        return item.id === id;
      })
    }).filter(function (item) {
      return item !== undefined;
    })

    commit('products', orderedProducts);

    // commit('products', []);

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