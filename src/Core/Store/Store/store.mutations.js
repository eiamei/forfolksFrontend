const storeMutations = {
  groups (state, groups) {
    state.groups = Object.assign({}, groups)
  },
  products (state, products) {
    state.products.splice(0);
    state.products = products;
  },
  items (state, items) {
    state.items.splice(0);
    state.items = items;
  }
};

export { storeMutations }