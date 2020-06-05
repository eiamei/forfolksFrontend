<template>
  <p class="regular-sans-text item-description" v-html="item.desc"></p>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {ItemInterface} from '../../../services/Store/Shop/shop.types';

  interface Props {
    item: ItemInterface
  }

  export default Vue.extend<any, any, any, Props>({
    name: 'itemDescription',
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
  .item-description {
    padding: 1rem 2rem;
    border-right: 1px solid $dark-blue;
    margin: 2rem 0;
  }
</style>