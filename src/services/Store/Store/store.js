import {storeState} from './store.state';
import {storeActions} from './store.actions';
import {storeMutations} from './store.mutations';

export default {
  namespaced: true,
  state: storeState,
  actions: storeActions,
  mutations: storeMutations
}