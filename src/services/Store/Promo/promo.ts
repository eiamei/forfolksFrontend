import { promoState as state } from './promo.state';
import { promoActions as actions } from './promo.actions';
import { promoMutations as mutations} from './promo.mutations';

export const promo = {
  namespaced: true,
  state,
  actions,
  mutations
}