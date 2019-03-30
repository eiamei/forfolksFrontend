export default {
  bag (state, bag) {
    state.bag = Object.assign({}, state.bag, bag);
  },
  increment (state, id) {
    state.bag[id].qty++;
  },
  decrement (state, id) {
    state.bag[id].qty--;
  },
  remove (state, id) {
    console.log(delete state.bag[id]);
    state.bag = Object.assign({}, state.bag);
  }
}