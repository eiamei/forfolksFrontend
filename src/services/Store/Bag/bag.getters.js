export const bagGetters = {
  bagItems (state, getters, rootState, rootGetters) {
    let discountByGroup = {};
    if (rootState.promo.selectedDiscount) {
      discountByGroup = rootState.promo.selectedDiscount.discountByGroup
    }
    return Object.keys(state.bag).map(function (name) {
      const item = rootGetters['shop/findItemById'](state.bag[name].id);
      const group = item.discountGroup;
      item.qty = state.bag[name].qty;
      item.promoPrice = item.price;

      if (group && group in discountByGroup) {
        item.promoPrice = item.price * Number(discountByGroup[group])
      }

      return item;
    })
  },
  total (state, getters, rootState, rootGetters) {
    let realTotal = 0;
    let discountTotal = 0;
    let discountByGroup = {};
    if (rootState.promo.selectedDiscount) {
      discountByGroup = rootState.promo.selectedDiscount.discountByGroup
    }
    Object.keys(state.bag).forEach(name => {
      const qty = state.bag[name].qty;
      const item = rootGetters['shop/findItemById'](state.bag[name].id);
      const group = item.discountGroup;
      let price = Number(item.price);

      realTotal += qty * price;

      if (group && group in discountByGroup) {
        price = price * Number(discountByGroup[group])
      }

      discountTotal += qty * price;
    });
    return {realTotal, discountTotal};
  }
}