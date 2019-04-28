import Vuex from 'vuex';
import Vue from 'vue';

import global from './Global';
import bag from './Bag';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    global,
    bag
  }
});