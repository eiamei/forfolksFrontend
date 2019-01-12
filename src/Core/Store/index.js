import Vuex from 'vuex';
import global from './Global';
import Vue from 'vue';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    global
  }
});