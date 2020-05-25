import slugify from 'slugify';

export default {
  add ({state, commit, dispatch}, item) {
    let bagItem = {
      rootPath: item.rootPath,
      name: item.name,
      price: item.itemProperty.price,
      type: item.type,
      props: item.selectableProperty
    }
    let id = item.rootPath;
    if (bagItem.props.length)
      bagItem.props.forEach(property => {
        id += `-${slugify(property.value.toLowerCase())}`
      });
    if (item.variant)
      id += item.variant;
    if (state.bag.hasOwnProperty(id))
      commit('increment', id);
    else
      commit('bag', {
        [id]: {
          ...bagItem,
          qty: 1
        }
      });
    dispatch('save');
  },
  increment ({state, commit, dispatch}, id) {
    if (state.bag.hasOwnProperty(id)) {
      commit('increment', id);
      dispatch('save');
    }
  },
  decrement ({state, commit, dispatch}, id) {
    if (state.bag.hasOwnProperty(id)) {
      if (state.bag[id].qty <= 1)
        commit('remove', id);
      else
        commit('decrement', id);
      dispatch('save');
    }
  },
  remove ({commit, dispatch}, id) {
    commit('remove', id);
    dispatch('save');
  },
  empty ({commit, dispatch}) {
    commit('empty');
    dispatch('save');
  },
  save ({state}) {
    localStorage.setItem('bag', JSON.stringify(state.bag));
  }
}