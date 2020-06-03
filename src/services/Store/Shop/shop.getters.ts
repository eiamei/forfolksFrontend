import {ItemInterface} from "@/services/Store/Shop/shop.types";
import {Color, link} from "@/global";
import Item from "@/views/item/Item.vue";

interface ParamInterface {
  root: string;
  properties: Array<string>;
}

export const shopGetters = {
  findItemByParam(state) {
    return function (routeParams): ItemInterface {
      let item;
      let params: ParamInterface = {
        root: '',
        properties: []
      };
      Object.keys(routeParams).forEach(function (param) {
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
  findItemImages: () => (item: ItemInterface): Array<link> => {
    let images: Array<link> = [];
    if (item) {
      let path = item.rootPath;
      if (item.selectableProperty.length)
        item.selectableProperty.forEach(property => {
          path += `-${property.value.toLowerCase()}`
        });
      for (let i = 0, len = 10; i < len; i++) {
        try {
          images.push(require(`@/assets/images/store/${path}${i > 0 ? '(' + i + ')' : ''}.jpg`))
        } catch (e) {
          break;
        }
      }
    }
    return images;
  },
  findItemColors: (state) => (item: ItemInterface): Array<Color> => {
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
  },
  findItemCurrentColor: () => (item: ItemInterface): Color => {
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
}