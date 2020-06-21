import store from '../index';
import groups from '../../../constants/Groups.json';
import { ShopInterface, ItemInterface } from './shop.types';

fetch('/products.json')
  .then(async function (data) {
      const parsedData = await data.json();
      store.dispatch('shop/createItemsList', parsedData)
  });

export function shopState () : ShopInterface {
    return {
        groups: groups,
        products: [],
        items: [],
        itemsByGroup: {}
    }
}