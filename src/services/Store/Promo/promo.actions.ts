import { setCookie, getCookie } from '../../../utils/cookie';

export const promoActions = {
  async checkPromoExistence ({dispatch}) {
    let promoCookie = getCookie('promo');
    if (promoCookie) 
      dispatch('checkPromo', promoCookie);
  },
  checkPromo ({state, commit, dispatch}, promo) {
    const promoName = String(promo).toLowerCase();
    if (promoName in state.discounts) {
      if (state.discounts[promoName].untill > Date.now()) {
        dispatch('savePromo', {
          name: promoName,
          data: state.discounts[promoName]
        });
        return {
          success: true,
          message: ''
        };
      }
      dispatch('erasePromo');
      return {
        success: false,
        message: 'Кажется, промокод истек :('
      };
    }
    dispatch('erasePromo');
    return {
      success: false,
      message: 'Такой промокод не найден :('
    };
  },
  savePromo ({commit}, promo) {
    commit('selectedDiscount', promo.data);
    setCookie('promo', promo.name, {
      'max-age': 86400 
    });
  },
  erasePromo ({commit}) {
    commit('selectedDiscount', {});
    setCookie('promo', '', {
      'max-age': 0 
    });
  }
}