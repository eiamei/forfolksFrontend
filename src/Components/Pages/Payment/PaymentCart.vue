<template>
  <div class="cart-info">
    <div class="cart-item" v-for="(item, key) in bag" :item="item" :key="key">
      <img class="cart-item__image" :src="itemImage(item)"/>
      <div class="cart-item__info">
        <p class="cart-item__name">{{$t(`items.${item.type}`)}} {{item.name}} {{item.model}}</p>
        <p class="cart-item__color">
          {{$t(`colors.${item.color}`)}}
          <template v-if="item.variant">
            , {{$t(`variants.${item.variant}`)}}
          </template>
        </p>
      </div>
      <div  class="cart-item__price">{{+item.price * +item.qty}}&thinsp;P</div>
      <div class="cart-item__qty">{{item.qty}}</div>
    </div>
    <span class="cart-info__total">
      <p>Итого:</p>
      <p v-if="!isPromo">{{total}} ₽</p>
      <p v-else><span style="text-decoration: line-through; font-size: 14px; margin-right: 8px">{{total}}</span> {{promoPrice}} ₽</p>
    </span>
  </div>
</template>

<script>
  import {PROMO} from '../../../Core/Constants/Globals';

  export default {
    name: 'PaymentCart',
    data () {
      return {
        isPromo: (new Date()) < PROMO.CONSTANT_DISCOUNT_TILL || localStorage.getItem('ip')
      }
    },
    computed: {
      bag () {
        return this.$store.state.bag.bag;
      },
      total () {
        let total = 0;
        Object.keys(this.bag).forEach(id => {
          total += this.bag[id].qty * this.bag[id].price;
        });
        return total;
      },
      promoPrice () {
        if (PROMO.CONSTANT_DISCOUNT && (new Date()) < PROMO.CONSTANT_DISCOUNT_TILL) {
          return Math.round(this.total * PROMO.CONSTANT_DISCOUNT);
        } else {
          return Math.round(this.total * PROMO.DISCOUNT_PERCENT);
        }
      }
    },
    methods: {
      itemImage (item) {
        if (item) {
          const name = item.name.toLowerCase();
          const model = item.model.toLowerCase();
          const type = item.type.toLowerCase();
          return require(`@/assets/images/storeIcons/${type}-${name}${model ? '-' + model : ''}.jpg`);
        }
        return '';
      }
    }
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/colors';
  .cart-info {
    padding-top: 64px;
    &__total {
      display: flex;
      justify-content: space-between;
    }
  }
  .cart-item {
    display: flex;
    margin-bottom: 16px;
    position: relative;
    width: 100%;
    max-width: 1000px;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding-bottom: 8px;
    &__image {
      width: 64px;
      height: 64px;
      border-radius: 4px;
    }
    &__info {
      margin-left: 16px;
      align-self: center;
      flex-basis: 30%;
    }
    &__name, &__color {
      margin: 0;
    }
    &__name {
      font-size: 14px;
    }
    &__color {
      font-size: 12px;
      color: $dark-gray2;
    }
    &__qty {
      width: 24px;
      height: 19px;
      position: absolute;
      border-radius: 50%;
      background-color: $sandy;
      text-align: center;
      padding-top: 5px;
      font-size: 12px;
      left: 52px;
      top: -8px;
    }
    &__price {
      align-self: center;
      margin-left: 40px;
      flex-basis: 50%;
      text-align: right;
    }
  }
</style>