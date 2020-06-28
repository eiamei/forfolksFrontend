import {ItemInterface} from "../../../services/Store/Shop/shop.types";
import {Color, link} from "../../../global";
import i18n from '../../Translation/i18n';

interface ParamInterface {
  root: string;
  properties: Array<string>;
}

export const shopGetters = {
  findItemByParam (state) : (routeParams) => (ItemInterface | undefined) {
    return function (routeParams): (ItemInterface | undefined) {
      let item;
      let params: ParamInterface = {
        root: '',
        properties: []
      };
      Object
        .keys(routeParams)
        .forEach(function (param) {
          if (param === 'root')
            params.root = routeParams[param];
          else if (routeParams[param]) {
            params.properties.push(routeParams[param])
          }
        });
      try {
        item = state.items
          .find(function (item) {
            if (item.rootPath === params.root && item.selectableProperty.length === params.properties.length) {
              for (let i = 0, len = params.properties.length; i < len; i++) {
                const result = item.selectableProperty
                  .find(function (property) {
                    return property.value.toLowerCase() === params.properties[i].toLowerCase()
                  })
                if (!result) return false;
              }
              return item;
            }
            return false
          });
      } catch (e) {
        console.log(e);
      }
      return item;
    }
  },
  findItemImages () : (ItemInterface) => Array<link> {
    return function (item: ItemInterface): Array<link> {
      let images: Array<link> = [];
      if (item) {
        let path = item.rootPath;
        if (item.selectableProperty.length)
          item.selectableProperty.forEach(property => {
            path += `-${property.value.toLowerCase()}`
          });
        for (let i = 0, len = 10; i < len; i++) {
          try {
            images.push(require(`../../../assets/images/store/${path}${i > 0 ? '(' + i + ')' : ''}.jpg`))
          } catch (e) {
            break;
          }
        }
      }
      return images;
    }
  },
  findItemColors (state) : (ItemInterface) => Array<Color> {
    return function (item: ItemInterface): Array<Color> {
      const colors: Array<Color> = [];
      if (item) {
        state.items
          .filter(function (filteredItem) {
            return filteredItem.rootPath === item.rootPath
          })
          .map(function (filteredItem) {
            return filteredItem.selectableProperty
              .filter(function (property) {
                return property.name === 'color';
              })
              .map(function (property) {
                colors.push(property.value);
              })
          });
      }
      return colors;
    }
  },
  findItemCurrentColor () : (ItemInterface) => Color {
    return function (item: ItemInterface): Color {
      let currentColor: Color = '';
      if (item) {
        item.selectableProperty
          .forEach(function (property) {
            if (property.name === 'color') {
              currentColor = property.value;
            }
          })
      }
      return currentColor;
    }
  },
  findItemProperties () : (ItemInterface) => Array<string> {
    return function (item: ItemInterface): Array<string> {
      const properties : Array<string> = [];
      Object
        .keys(item.itemProperty)
        .forEach(function (key : string) {
          switch (key) {
            case 'size' : {
              let sizes : string = '';
              Object
                .keys(item.itemProperty[key])
                .forEach(function (sizeKey : string, index : number) {
                  if (index > 0) sizes += ', ';
                  sizes += `${i18n.t('size.' + sizeKey)} ${item.itemProperty[key][sizeKey]}`
                })
              properties.push(sizes);
              break;
            }
            case 'material' : {
              let materials : string = '';
              item.itemProperty[key]
                .forEach(function (material : string, index : number) {
                  if (index > 0) materials += ', ';
                  materials += i18n.t(`material.${material}`)
                })
              properties.push(materials);
              break;
            }
            case 'weight' : {
              properties.push(`${item.itemProperty[key]} г`);
              break;
            }
          }
        })
      return properties;
    }
  }
}