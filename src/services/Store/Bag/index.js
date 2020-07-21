import state from './bag.state';
import actions from './bag.actions';
import mutations from './bag.mutations';
import { bagGetters as getters } from './bag.getters'

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}