import slugify from 'slugify';

export default {
  add ({rootState, state, commit, dispatch}, params) {
    let bagItem = {
      rootPath: params.item.rootPath,
      id: params.item.id,
      name: params.item.name,
      price: params.item.price,
      type: params.item.type,
      props: params.item.selectableProperty
    }
    let id = params.item.rootPath;
    if (bagItem.props.length)
      bagItem.props.forEach(property => {
        id += `-${slugify(property.value.toLowerCase())}`
      });
    if (params.item.variant)
      id += params.item.variant;
    if (state.bag.hasOwnProperty(id) && (state.bag[id].qty + 1) <= params.item.availability)
      commit('increment', id);
    else {
      if (params.quantity + 1 <= params.item.availability) {
        bagItem.qty = params.quantity;
      } else {
        bagItem.qty = 1;
      }
      commit('bag', {
        [id]: bagItem
      });
    }
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
  get ({commit}) {
    const bag = JSON.parse(localStorage.getItem('bag')) || {};
    commit('bag', bag);
  },
  save ({state}) {
    localStorage.setItem('bag', JSON.stringify(state.bag));
  }
}