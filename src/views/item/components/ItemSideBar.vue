<template>
  <section class="item-side-bar">
    <header class="item-side-bar__heading">
      <h1 class="serif-heading item-side-bar__heading-name">{{item.name}}</h1>
      <p class="regular-sans-text item-side-bar__heading-type">{{$t(`items.${item.type}`)}}</p>
    </header>
    <p class="item-side-bar__id">{{item.articul}}</p>
    <p class="item-side-bar__price">{{item.price}}P</p>
    <color-picker class="item-side-bar__color-picker" :item="item"/>
    <div class="item-side-bar__divider"></div>
    <p class="">{{item.shortDesc}}</p>
    <p class="item-side-bar__id">Детали</p>
    <ul class="item-side-bar__details">
      <li>В: 4cm, Д: 26cм </li>
      <li>В: 4cm, Д: 26cм </li>
      <li>В: 4cm, Д: 26cм </li>
    </ul>
    <div class="item-side-bar__add-wrapper">
      <button class="item-side-bar__change-button" @click="decrement">
        <minus-icon/>
      </button>
      <input class="item-side-bar__input" v-model="quantity"/>
      <button class="item-side-bar__change-button" @click="increment">
        <plus-icon/>
      </button>
      <button class="item-side-bar__add-button">Добавить</button>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import ColorPicker from '../../../components/ColorPicker.vue';
  import { Color } from "@/global";
  import { ItemInterface } from '../../../services/Store/Shop/shop.types';
  import MinusIcon from "@/components/Icons/Minus.vue";
  import PlusIcon from "@/components/Icons/Plus.vue";

  export default Vue.extend({
      name: 'ItemSideBar',
      components: {PlusIcon, MinusIcon, ColorPicker },
      props: {
          item: {
              type: Object as () => ItemInterface,
              required: true
          }
      },
      data () {
          return {
              quantity: 1
          }
      },
      methods: {
          decrement (): void {
              if (this.quantity > 1) {
                  this.quantity--;
              }
          },
          increment (): void {
              this.quantity++;
          }
      }
  })
</script>

<style lang="scss">
  @import '../../../assets/styles/ui';
  @import '../../../assets/styles/vars';
  .item-side-bar {
    max-width: 520px;
    width: 100%;
    position: sticky;
    top: 4rem;
    align-self: flex-start;
    padding-right: 2rem;
    &__heading {
      display: flex;
      align-items: baseline;
    }
    &__heading-name {
      margin: 0 0.75rem 0 0;
    }
    &__heading-type {
      margin: 0;
      font-size: 1.25rem;
    }
    &__id {
      color: $light-gray;
      margin: 0;
    }
    &__price {
      margin: 0.75rem 0 0 0;
      font-size: 1.5rem;
    }
    &__color-picker {
      margin-top: 1rem;
    }
    &__divider {
      width: 100%;
      height: 1px;
      background-color: $light-gray;
      margin: 1.5rem 0;
    }
    &__details {
      padding: 0 0 0 1.5rem;
    }
    &__add-wrapper {
      display: flex;
      justify-content: flex-end;
      margin: 3rem 0;
    }
    &__change-button {
      background: none;
      border: none;
      cursor: pointer;
    }
    &__input {
      width: 50px;
      text-align: center;
      margin: 0 1rem;
    }
    &__add-button {
      padding: 1rem 1.5rem;
      color: white;
      background-color: $dark-blue;
      text-transform: uppercase;
      margin-left: 2rem;
      cursor: pointer;
    }
  }
</style>