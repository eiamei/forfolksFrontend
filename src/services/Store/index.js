import Vuex from 'vuex';
import Vue from 'vue';

import global from './Global';
import bag from './Bag';
import store from './Store/store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    bag,
    store
  }
});