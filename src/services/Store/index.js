import Vuex from 'vuex';
import Vue from 'vue';

import global from './Global/index';
import bag from './Bag/index';
import store from './Store/store';
import { item } from './Item/item';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    bag,
    store,
    item
  }
});