<template>
  <div class="store">
    <div class="store__menu">
      <p><b> • Все</b></p>
      <p>Горшки</p>
      <p>Подсвечники</p>
      <p>Подставки</p>
    </div>
    <div class="store__cards">
      <card class="store__item" v-for="item in store" :name="item.name" :price="item.price" :type="item.type"/>
    </div>
  </div>
</template>

<script>
  import Card from './Card/Card';
  import Store from '../../../../Core/Constants/Store'
  export default {
    name: 'Cards',
    data () {
      return {
        store: Store
      }
    },
    components: { Card }
  };
</script>

<style lang="scss">
  @import '../../../../assets/styles/_colors';
  .store {
    /*padding: 24px 16px;*/
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    &__menu {
      padding: 24px;
      min-width: 160px;
      background-color: $menu-color;
      p {
        margin: 0 0 16px 0;
        cursor: pointer;
        &:hover {
          font-weight: 700;
        }
      }
    }
    &__cards {
      padding: 0px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: $store-card-bg-color;
    }
    &__item {
      margin: 4px 8px;
    }
  }
</style>