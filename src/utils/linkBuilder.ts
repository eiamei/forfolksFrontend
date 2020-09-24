import slugify from 'slugify';
import { ItemInterface } from "../services/Store/Shop/shop.types";
import { link } from "../global";

export function productLinkBuilder(item: ItemInterface) : link {
  let path = item.rootPath;
  if (item.selectableProperty.length)
    item.selectableProperty.forEach(property => {
      path += `/${slugify(property.value.toLowerCase())}`
    });
  return `/product/${path}`
}