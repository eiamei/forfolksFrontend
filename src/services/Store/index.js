import Vuex from 'vuex';
import Vue from 'vue';

import global from './Global/index';
import bag from './Bag/index';
import { shop } from './Shop/shop';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    bag,
    shop
  }
});