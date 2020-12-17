<template>
  <div class="cart-info">
    <div class="cart-item" v-for="(item, key) in bag" :item="item" :key="key">
      <img class="cart-item__image" :src="itemImage(item)"/>
      <div class="cart-item__info">
        <p class="cart-item__name">{{item.name}}</p>
        <p class="cart-item__color">
          <template v-for="(prop, index) in item.props">{{index > 0 ? ', ' : ''}}{{$t(`common.${prop.name}`)}}: {{prop.name !== 'model' ? $t(`${prop.name}s.${prop.value}`) : prop.value}}</template>
        </p>
      </div>
      <div v-if="item.isSale" class="cart-item__price cart-item__price--sale">{{(+item.price - +item.price * item.salePercent) * item.qty}}&thinsp;P</div>
      <div v-else class="cart-item__price">{{+item.price * item.qty}}&thinsp;P</div>
      <div class="cart-item__qty">{{item.qty}}</div>
    </div>
    <span class="cart-info__total">
      <p>Итого:</p>
      <p v-if="!isPromo">{{total.realTotal}} ₽</p>
      <p v-else><span class="cart-info__total-old">{{total.realTotal}}</span> <span class="cart-info__total-new">{{total.discountTotal}}&thinsp;P</span></p>
    </span>
  </div>
</template>

<script>
  import {PROMO} from '../../../constants/Globals';
  import slugify from 'slugify';

  export default {
    name: 'PaymentCart',
    computed: {
      isPromo () {
        return this.$store.state.promo.selectedDiscount || this.total.isSale;
      },
      bag () {
        return this.$store.getters['bag/bagItems']
          // only ones with qty > 0
          .filter(function (item) {
            return item.qty > 0;
          });
      },
      total () {
        return this.$store.getters['bag/total'];
      },
    },
    methods: {
      itemImage (item) {
        if (item) {
          let id = item.rootPath;
          if (item.selectableProperty.length)
            item.selectableProperty.forEach(property => {
              id += `-${slugify(property.value.toLowerCase())}`
            });
          return require(`../../../assets/images/store/${id}-small.jpg`);
        }
        return '';
      }
    }
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/colors';
  @import '../../../assets/styles/vars';
  .cart-info {
    padding-top: 64px;
    &__total {
      display: flex;
      justify-content: space-between;
    }
    &__total-old {
      text-decoration: line-through;
      margin-right: 8px;
    }
    &__total-new {
        color: $red;
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
    }
    &__color {
      color: $dark-gray2;
    }
    &__qty {
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      border-radius: 50%;
      background-color: $sandy;
      text-align: center;
      left: 52px;
      top: -8px;
    }
    &__price {
      align-self: center;
      margin-left: 40px;
      flex-basis: 50%;
      text-align: right;
      &--sale {
        color: $red;
      }
    }
  }
</style>