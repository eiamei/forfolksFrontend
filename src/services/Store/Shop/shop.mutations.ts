export const shopMutation = {
  products (state, products) {
    state.products = products.slice();
  },
  items (state, items) {
    state.items = items;
  }
}