import groups from '../../../constants/Groups.json';
import products from '../../../constants/Products.json';
import { ShopInterface, ItemInterface } from './shop.types';

function parseProducts (products) : Array<ItemInterface> {
    return products;
}

function createItems () : Array<ItemInterface> {
    return parseProducts(products)
        .map(function (item : ItemInterface) {
            try {
                if (groups[item.group])
                    return Object.assign({}, groups[item.group], item);
                else
                    return Object.assign({}, item)
            } catch (e) {
                return undefined;
            }
        })
        .filter(function (item) { return item !== undefined});
}

export function shopState () : ShopInterface {
    return {
        groups: groups,
        products: parseProducts(products),
        items: createItems(),
        itemsByGroup: {}
    }
}