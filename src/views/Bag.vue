<template>
  <article class="bag-container">
    <h2 style="text-align: center" v-if="Object.keys(bag).length === 0">Корзина пуста</h2>
    <section class="bag" v-else>
      <h2>Ваша корзина</h2>
      <bag-item v-for="(item, key) in bag" :item="item" :key="key"/>
      <section class="bag-total">
        <span v-if="!isPromo">
          <input class="bag-total__promo-input" placeholder="Промокод" v-model="promo" @keyup.enter="checkPromo"/>
          <button class="bag-total__promo-button" @click="checkPromo" @keyup.enter="checkPromo">Применить</button>
        </span>
        <p v-else-if="isPromo" class="bag-total__promo-success">Промокод успешно применен</p>
        <p class="bag-total__promo-error">{{promoResult.message}}</p>
        <span class="bag-total__total-text">
          <p style="margin-right: 8px">Итого:</p>
          <p v-if="!isSomeDiscount">{{total.realTotal}} ₽</p>
          <p v-else>
            <span class="bag-total__old-price">{{total.realTotal}}</span> 
            <span class="bag-total__discount-price">{{total.discountTotal}}P</span>
          </p>
        </span>
        <router-link class="bag-total__buy-button" to="payment">Оформить заказ</router-link>
      </section>
    </section>
  </article>
</template>

<script>
import BagItem from '../components/BagItem.vue';
import {PROMO} from '../constants/Globals';
export default {
  name: 'Bag',
  components: {BagItem},
  data () {
    return {
      isTooLate: null,
      isCorrect: null,
      promo: '',
      promoResult: {
        success: null,
        message: ''
      }
    }
  },
  computed: {
    bag () {
      return this.$store.getters['bag/bagItems'];
    },
    total () {
      return this.$store.getters['bag/total'];
    },
    isSale () {
      return this.total.isSale;
    },
    isPromo () {
      return this.$store.state.promo.selectedDiscount;
    },
    isSomeDiscount () {
      return this.total.isSale || this.isPromo;
    }
  },
  methods: {
    async checkPromo () {
      this.promoResult = await this.$store.dispatch('promo/checkPromo', this.promo)
    }
  }
};
</script>

<style>
  .bag-container {
    margin: 40px 0 0 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
  }
  .bag {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  @media screen and (max-width: 1264px) {
    .bag {
      width: calc(100% - 64px);
      padding: 0 32px;
    }
  }
  @media screen and (max-width: 600px) {
    .bag {
      width: calc(100% - 32px);
      padding: 0 16px;
      margin-bottom: 8px;
    }
  }
  @media screen and (max-width: 400px) {
    .bag {
      width: calc(100% - 16px);
      padding: 0 8px;
      margin-bottom: 0;
    }
  }
  .bag-total {
    margin: 1rem 0 0 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .bag-total__old-price {
    text-decoration: line-through;
    margin: 0 8px;
  }
  .bag-total__discount-price {
    color: var(--red);
  }
  .bag-total__total-text {
    display: flex;
  }
  .bag-total__promo-input {
    width: 190px;
    border: 1px solid black;
    padding: 1rem 0.5rem;
  }
  .bag-total__promo-button {
    width: 88px;
    border: 1px solid black;
    margin-left: 0.5rem;
    padding: 1rem 0.5rem;
    background: black;
    color: white;
    cursor: pointer;
  }
  .bag-total__promo-button:hover {
    background: #323232;
  }
  .bag-total__promo-error {
    color: var(--red);
  }
  .bag-total__buy-button {
    width: 296px;
    background: black;
    border: 1px solid black;
    box-sizing: border-box;
    padding: 1rem 0;
    text-decoration: none;
    text-align: center;
    color: white;
    font-weight: 700;
  }
  .bag-total__buy-button:hover {
    background: #323232;
  }
  @media screen and (max-width: 600px) {
    .bag-total__buy-button {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
</style>