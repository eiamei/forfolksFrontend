<template>
  <div class="bag-container">
    <div class="bag" v-if="Object.keys(bag).length">
      <p class="bag__header">Ваша корзина</p>
      <bag-item class="bag__items" v-for="(item, key) in bag" :item="item" :key="key"/>
      <div class="bag__total">
        <span class="bag__total-text">
          <p>Итого:</p>
          <p>{{total}} ₽</p>
        </span>
        <router-link class="bag__buy-button" to="payment">Оплатить</router-link>
      </div>
    </div>
    <div v-else class="empty-bag">Корзина пуста</div>
  </div>
</template>

<script>
  import BagItem from './ShoppingBag';
  export default {
    name: 'bag',
    components: {
      BagItem
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
      &__header {
        width: 75%;
        text-align: left;
        font-size: 24px;
        font-weight: 700;
      }
      &__items {
        width: 75%;
      }
      &__total {
        font-size: 24px;
        margin-top: 16px;
        width: 75%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        &-text {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 300px;
          font-weight: 500;
          color: $dark-gray;
        }
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
        }
      }
    }
  }
</style>