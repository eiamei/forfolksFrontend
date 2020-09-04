export const bagGetters = {
  bagItems (state, getters, rootState, rootGetters) {
    let discountByGroup = {};
    if (rootState.promo.selectedDiscount) {
      discountByGroup = rootState.promo.selectedDiscount.discountByGroup
    }
    return Object
      .keys(state.bag)
      .map(function (name) {
        const item = Object.assign({}, rootGetters['shop/findItemById'](state.bag[name].id));

        if (!item) return;
        // hide if item object is empty
        if (Object.keys(item).length === 0 && item.constructor === Object) return;

        const group = item.discountGroup;

        item.qty = state.bag[name].qty;
        // qty in bag shouldn't be more than available
        if (item.qty > Number(item.availability)) item.qty = item.availability;

        item.promoPrice = item.price;

        if (group && group in discountByGroup) {
          item.promoPrice = item.price * Number(discountByGroup[group])
        }

        return item;
      })
      .filter(function (item) {
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
      let qty = state.bag[name].qty;
      const item = rootGetters['shop/findItemById'](state.bag[name].id);

      if (!item) return;
      // hide if item object is empty
      if (Object.keys(item).length === 0 && item.constructor === Object) return;
      
      const group = item.discountGroup;
      
      // qty in bag shouldn't be more than available
      if (qty > Number(item.availability)) qty = item.availability;

      let price = Number(item.price);

      realTotal += qty * price;

      if (group && group in discountByGroup) {
        price = price * Number(discountByGroup[group])
      }

      discountTotal += qty * price;
    });
    return {
      realTotal: realTotal.toFixed(2),
      discountTotal: discountTotal.toFixed(2)
    };
  }
}