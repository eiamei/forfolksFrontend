<template>
  <div class="bag-container">
    <div class="bag" v-if="Object.keys(bag).length">
      <p class="bag__header">Ваша корзина</p>
      <bag-item class="bag__items" v-for="(item, key) in bag" :item="item" :key="key"/>
      <div class="bag__total">
        <span v-if="!isPromo">
          <input class="bag__promo-input" placeholder="Промокод" v-model="promo" @keyup.enter="checkPromo"/>
          <app-button class="bag__promo-button" content="Применить" @click="checkPromo" @keyup.enter="checkPromo"/>
        </span>
        <p v-else class="bag__promo-success">Промокод успешно применен</p>
        <p v-if="isCorrect === false" class="bag__promo-error">Неверный промокод</p>
        <p v-else-if="isTooLate === true" class="bag__promo-error">Промокод истек</p>
        <span class="bag__total-text">
          <p>Итого:</p>
          <p v-if="!isPromo">{{total}}&thinsp;P</p>
          <p v-else><span style="text-decoration: line-through; font-size: 20px; margin-right: 8px">{{total * 1 / 0.9}}</span> {{total}} ₽</p>
        </span>
        <router-link class="bag__buy-button" to="payment">Оплатить</router-link>
      </div>
    </div>
    <div v-else class="empty-bag">Корзина пуста</div>
  </div>
</template>

<script>
  import BagItem from './ShoppingBag';
  import AppButton from '../../../Core/Components/UI/AppButton';
  export default {
    name: 'bag',
    components: {
      AppButton,
      BagItem
    },
    data () {
      return {
        isPromo: (new Date()) < 1572814799000 && localStorage.getItem('ip'),
        isTooLate: null,
        isCorrect: null,
        promo: ''
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
        if (this.isPromo)
          total *= 0.9;
        return total;
      }
    },
    methods: {
      checkPromo () {
        if ( this.promo === 'halloween' || this.promo === 'Halloween') {
          if ((new Date()) > 1572814799000) {
            this.isTooLate = true;
          } else {
            localStorage.setItem('ip', JSON.stringify(true));
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
  @import '../../../assets/styles/colors';
  .bag-container {
    margin-top: 48px;
    min-height: 100vh;
    width: 100%;
    .empty-bag {
      margin-top: 10%;
      text-align: center;
    }
    .bag {
      margin: 64px 0 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media screen and (max-width: 900px) {
        margin: 32px 0 0 0;
      }
      &__header {
        @media screen and (max-width: 900px) {
          width: calc(100% - 80px);
        }
        @media screen and (max-width: 770px) {
          width: calc(100% - 32px);
        }
        @media screen and (max-width: 500px) {
          width: calc(100% - 16px);
        }
        text-align: left;
        font-size: 24px;
        font-weight: 700;
      }
      &__items {
        width: 75%;
        @media screen and (max-width: 900px) {
          width: calc(100% - 80px);
        }
        @media screen and (max-width: 770px) {
          width: calc(100% - 32px);
        }
        @media screen and (max-width: 500px) {
          width: calc(100% - 16px);
        }
      }
      &__total {
        font-size: 24px;
        margin-top: 16px;
        width: 75%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        @media screen and (max-width: 900px) {
          width: calc(100% - 80px);
        }
        @media screen and (max-width: 770px) {
          width: calc(100% - 32px);
        }
        @media screen and (max-width: 500px) {
          width: calc(100% - 16px);
        }
        &-text {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 300px;
          font-weight: 500;
          color: $dark-gray;
          @media screen and (max-width: 600px) {
            width: 100%
          }
        }
      }
      &__promo-input {
        width: 190px;
        height: 40px;
        border-radius: 4px;
        border: 1px solid $dark-gray;
        /*margin-top: 8px;*/
        padding: 0 8px;
        outline: transparent;
      }
      &__promo-button {
        width: 80px;
        height: 40px;
        border-radius: 4px;
        border: 1px solid $dark-gray;
        margin-left: 8px;
        padding: 0 8px;
        background: $blue-gray;
        &:hover {
          background: $light-gray;
        }
      }
      &__promo-success, &__promo-error {
        font-size: 12px;
      }
      &__promo-error {
        color: $regular-red;
      }
      &__buy-button {
        width: 300px;
        background: $blue1;
        border: 1px solid $blue1;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 10px 0;
        font-size: 16px;
        text-decoration: none;
        text-align: center;
        color: white;
        font-weight: 700;
        &:hover {
          background: $blue2;
        }
        @media screen and (max-width: 600px) {
          width: 100%;
          font-size: 12px;
          margin-bottom: 16px;
        }
      }
    }
  }
</style>