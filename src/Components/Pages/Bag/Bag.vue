<template>
  <div class="bag-container">
    <div class="bag" v-if="Object.keys(bag).length">
      <bag-item v-for="(item) in bag" :item="item"/>
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
      }
    }
  };
</script>

<style lang="scss">
  .bag-container {
    margin-top: 48px;
    min-height: 100vh;
    width: 100%;
    .empty-bag {
      margin-top: 10%;
      margin-left: 10%;
    }
    .bag {
      margin: 64px 0 0 40px;
    }
  }
</style>