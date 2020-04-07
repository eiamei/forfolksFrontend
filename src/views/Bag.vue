<template>
  <article class="bag-container">
    <h2 style="text-align: center" v-if="Object.keys(bag).length === 0">Корзина пуста</h2>
    <section class="bag" v-else>
      <h2>Ваша корзина</h2>
      <bag-item v-for="(item, key) in bag" :item="item" :key="key"/>
      <section class="bag-total">
        <span v-if="!isPromo && !isConstantDiscount">
          <input class="bag-total__promo-input" placeholder="Промокод" v-model="promo" @keyup.enter="checkPromo"/>
          <button class="bag-total__promo-button" @click="checkPromo" @keyup.enter="checkPromo">Применить</button>
        </span>
        <p v-else-if="isPromo && !isConstantDiscount" class="bag-total__promo-success">Промокод успешно применен</p>
        <p v-if="isCorrect === false" class="bag-total__promo-error">Неверный промокод</p>
        <p v-else-if="isTooLate === true" class="bag-total__promo-error">Промокод истек</p>
        <span class="bag-total__total-text">
          <p style="margin-right: 8px">Итого:</p>
          <p v-if="!isPromo && !isConstantDiscount">{{total}} ₽</p>
          <p v-else><span style="text-decoration: line-through; font-size: 14px; margin: 0 8px">{{total}}</span> {{promoPrice}} ₽</p>
        </span>
        <router-link class="bag-total__buy-button" to="payment">Оформить заказ</router-link>
      </section>
    </section>
  </article>
</template>

<script>
import BagItem from '../components/BagItem';
import {PROMO} from '../constants/Globals';
export default {
  name: 'Bag',
  components: {BagItem},
  data () {
    return {
      isPromo: ((new Date()) < PROMO.PROMO_DISCOUNT_TILL && localStorage.getItem('ip1')),
      isTooLate: null,
      isCorrect: null,
      promo: ''
    }
  },
  computed: {
    isConstantDiscount () {
      return (this.total >= PROMO.CONSTANT_DISCOUNT_PRICE_CASE) && ((new Date()) < PROMO.CONSTANT_DISCOUNT_TILL);
    },
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
    checkPromo () {
      if (typeof this.promo === 'string' && this.promo.toLowerCase() === PROMO.CODE.toLowerCase()) {
        if ((new Date()) > PROMO.PROMO_DISCOUNT_TILL) {
          this.isTooLate = true;
        } else {
          localStorage.setItem('ip1', JSON.stringify(true));
          this.isPromo = true;
          this.isCorrect = true;
          this.isTooLate = false;
        }
      } else {
        this.isCorrect = false;
      }
    }
  }
};
</script>

<style lang="scss">
  @import 'src/assets/styles/colors';
  .bag-container {
    margin: 40px 0 0 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .bag {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    @media screen and (max-width: 1264px) {
      width: calc(100% - 64px);
      padding: 0 32px;
    }
    @media screen and (max-width: 600px) {
      width: calc(100% - 32px);
      padding: 0 16px;
      margin-bottom: 8px;
    }
    @media screen and (max-width: 400px) {
      width: calc(100% - 16px);
      padding: 0 8px;
      margin-bottom: 0;
    }
  }
  .bag-total {
    font-size: 1.5rem;
    margin: 1rem 0 0 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    &__total-text {
      display: flex;
    }
    &__promo-input {
      width: 190px;
      border: 1px solid black;
      padding: 1rem 0.5rem;
      outline: transparent;
    }
    &__promo-button {
      width: 80px;
      border: 1px solid black;
      margin-left: 0.5rem;
      padding: 1rem 0.5rem;
      background: black;
      color: white;
      cursor: pointer;
      &:hover {
        background: rgb(50, 50, 50);
      }
    }
    &__promo-success, &__promo-error {
      font-size: 0.75rem;
    }
    &__promo-error {
      color: $regular-red;
    }
    &__buy-button {
      width: 296px;
      background: black;
      border: 1px solid black;
      box-sizing: border-box;
      padding: 1rem 0;
      font-size: 1.25rem;
      text-decoration: none;
      text-align: center;
      color: white;
      font-weight: 700;
      &:hover {
        background: rgb(50, 50, 50);
      }
      @media screen and (max-width: 600px) {
        width: 100%;
        margin-bottom: 1rem;
      }
    }
  }
</style>