<template>
  <ul class="item-more-info">
    <li class="regular-link">
      <button class="item-more-info__link regular-sans-text">Подробнее об уходе</button>
      <div></div>
    </li>
    <li class="item-more-info__color regular-sans-text">Цвет изделия может незначительно отличаться</li>
    <li class="item-more-info__design regular-sans-text">Дизайн: Forfolks</li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {ItemInterface} from '../../../services/Store/Shop/shop.types';

  interface Props {
    item: ItemInterface
  }

  export default Vue.extend<any, any, any, Props>({
    name: 'itemMoreInfo',
    props: {
      item: {
        type: Object as () => ItemInterface,
        required: true
      }
    },
  });
</script>

<style lang="scss">
  @import '../../../assets/styles/vars';
  @import '../../../assets/styles/ui';
  .item-more-info {
    box-sizing: border-box;
    max-width: 25rem;
    min-width: 25rem;
    width: 100%;
    align-self: flex-start;
    list-style: none;
    padding: 3rem 2rem;
    margin: 0 1rem 0 0;
    @media screen and (max-width: $tablet) {
      padding: 1rem;
      max-width: unset;
      min-width: unset;
    }
    &__link {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
    &__color {
      margin-top: 1rem;
      color: $light-gray;
    }
    &__design {
      margin-top: 0.5rem;
      color: $light-gray;
    }
  }
</style>