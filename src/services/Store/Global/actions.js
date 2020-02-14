export default {
  setNewWindowSize (store) {
    const {innerWidth: width, innerHeight: height} = window;
    store.commit('windowSize', {width, height});
  }
}