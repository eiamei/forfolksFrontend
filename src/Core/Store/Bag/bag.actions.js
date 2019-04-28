export default {
  add ({state, commit, dispatch}, item) {
    let id = `${item.type}${item.name}${item.model}${item.color}`;
    if (state.bag.hasOwnProperty(id))
      commit('increment', id);
    else
      commit('bag', {
        [id]: {
          ...item,
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