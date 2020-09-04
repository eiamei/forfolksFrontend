import store from '../index';
import groups from '../../../constants/Groups.json';
// import products from '../../../../public/Products.json';
import { ShopInterface, ItemInterface } from './shop.types';

export function shopState () : ShopInterface {
    return {
        groups: groups,
        products: {},
        items: [],
        itemsByGroup: {}
    }
}