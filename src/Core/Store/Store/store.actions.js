import groups from '../../Constants/Groups';
import products from '../../Constants/Products';

const storeActions = {
  loadStoreData ({commit, dispatch}) {
    commit('groups', groups);
    commit('products', products);
    dispatch('createStoreItems');
  },
  createStoreItems ({state, commit}) {
    let prepearedItems = state.products.map(function (item) {
      try {
        if (state.groups[item.group])
          return Object.assign({}, state.groups[item.group], item)
        else
          return Object.assign({}, item)
      } catch (e) {
        console.warn(e);
        return undefined;
      }
    }).filter(function (item) { return item !== undefined});
    commit('items', prepearedItems);
  }
};

export { storeActions }