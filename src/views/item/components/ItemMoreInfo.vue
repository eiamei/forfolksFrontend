<template>
  <ul class="item-more-info">
    <li v-if="isShowcare" class="item-more-info__link-container regular-link">
      <button class="item-more-info__link regular-sans-text" @click="open">Подробнее об уходе</button>
      <div></div>
    </li>
    <li class="item-more-info__color regular-sans-text">Цвет изделия может незначительно отличаться</li>
    <li class="item-more-info__design regular-sans-text">{{createdBy}}</li>
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
    computed: {
      createdBy () : string {
        if (this.item.itemProperty.createdBy && this.item.itemProperty.createdBy.manufacture) {
          return `Производитель: ${this.item.itemProperty.createdBy.manufacture}`
        } else if (this.item.itemProperty.createdBy && this.item.itemProperty.createdBy.design) {
          return `Дизайн: ${this.item.itemProperty.createdBy.design}`
        }
        return 'Дизайн: Forfolks'
      },
      isShowcare () : boolean {
        return Boolean(this.item.care) && Object.keys(this.item.care).length > 0
      }
    },
    methods: {
      open () : void {
        this.$emit('open', true)
      }
    }
  });
</script>

<style lang="scss">
  @import '../../../assets/styles/vars';
  @import '../../../assets/styles/ui';
  .item-more-info {
    box-sizing: border-box;
    max-width: 30rem;
    min-width: 30rem;
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
    &__link-container.regular-link {
      margin-bottom: 1rem;
    }
    &__link {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
    &__color.regular-sans-text {
      color: $light-gray;
      margin-bottom: .5rem;
      line-height: 1.4;
    }
    &__design.regular-sans-text {
      color: $light-gray;
      line-height: 1.4;
    }
  }
</style>