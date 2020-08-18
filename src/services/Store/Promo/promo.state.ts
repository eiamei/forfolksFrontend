export const promoState = {
  discounts: {
    maargaaret: {
      name: 'maargaaret',
      untill: Infinity,
      discountByGroup: {
        forfolks: 0.93,
        suplier: 0.98
      }
    },
    aleksa_flowers: {
      name: 'aleksaflowers',
      untill: Infinity,
      discountByGroup: {
        forfolks: 0.93,
        suplier: 0.98
      }
    },
    qoost6395: {
      name: 'qoost6395',
      untill: Infinity,
      discountByGroup: {
        forfolks: 0.8,
      }
    },
    summer: {
      name: 'summer',
      untill: 1597586400000, // august 16, 17:00, MSK
      discountByGroup: {
        forfolks: 0.9,
        suplier: 0.97
      }
    }
  },
  selectedDiscount: null,
}