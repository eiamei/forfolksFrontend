<template>
  <section class="item-side-bar">
    <header class="item-side-bar__heading">
      <h1 class="serif-heading item-side-bar__heading-name">{{item.name}}</h1>
      <p v-if="item.type" class="regular-sans-text item-side-bar__heading-type">{{$t(`${item.type}`)}}</p>
    </header>
    <p class="item-side-bar__id regular-sans-text">Артикул: {{item.id}}</p>
    <p v-if="item.isSale" class="item-side-bar__price">
      <span class="item-side-bar__sale-price-old">{{item.price}}</span>
      <span class="item-side-bar__sale-price">{{salePrice}}P</span>
    </p>
    <p v-else class="item-side-bar__price">{{item.price}}P</p>
    <color-picker class="item-side-bar__color-picker" :item="item"/>
    <div class="item-side-bar__divider"></div>
    <p class="item-side-bar__short-desc regular-sans-text">{{item.shortDesc}}</p>
    <p class="item-side-bar__id regular-sans-text">Детали</p>
    <ul class="item-side-bar__details">
      <li v-for="property in properties" class="item-side-bar__details-text regular-sans-text" :key="property">
        {{ property }}
      </li>
    </ul>
    <div v-if="isAvailable" class="item-side-bar__availability">В наличии: {{item.availability}} </div>
    <div class="item-side-bar__add-wrapper">
      <button v-if="isAvailable" class="item-side-bar__change-button" @click="decrement">
        <minus-icon/>
      </button>
      <input v-if="isAvailable" class="item-side-bar__input" v-model="quantity"/>
      <button v-if="isAvailable" class="item-side-bar__change-button" @click="increment">
        <plus-icon/>
      </button>
      <button v-if="isAvailable" class="item-side-bar__add-button" @click="add">Добавить</button>
      <button v-else class="item-side-bar__add-button item-side-bar__add-button--sold-out">Нет в наличии</button>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import ColorPicker from '../../../components/ColorPicker.vue';
  import {ItemInterface} from '../../../services/Store/Shop/shop.types';
  import MinusIcon from "../../../components/Icons/Minus.vue";
  import PlusIcon from "../../../components/Icons/Plus.vue";

  interface Data {
    quantity: number;
  }
  interface Methods {
    add(): void;
    decrement(): void;
    increment(): void;
  }
  interface Computed {
    properties: ItemInterface;
    isAvailable: boolean;
    salePrice: number;
  }
  interface Props {
    item: ItemInterface
  }

  export default Vue.extend<Data, Methods, Computed, Props>({
    name: 'ItemSideBar',
    components: {PlusIcon, MinusIcon, ColorPicker},
    props: {
      item: {
        type: Object as () => ItemInterface,
        required: true
      }
    },
    data() : Data {
      return {
        quantity: 1
      }
    },
    computed: {
      properties () : ItemInterface {
        return this.$store.getters['shop/findItemProperties'](this.item)
      },
      isAvailable () : boolean {
        return this.item.availability > 0;
      },
      salePrice() {
        return this.item.price - this.item.price * this.item.salePercent;
      }
    },
    methods: {
      add(): void {
        this.$store.dispatch('bag/add', { item: this.item, quantity: this.quantity });
      },
      decrement(): void {
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
      increment(): void {
        if (this.quantity + 1 <= this.item.availability) {
          this.quantity++;
        }
      }
    }
  })
</script>

<style lang="scss">
  @import '../../../assets/styles/ui';
  @import '../../../assets/styles/vars';

  .item-side-bar {
    max-width: 30rem;
    min-width: 30rem;
    position: sticky;
    top: 4rem;
    align-self: flex-start;
    padding: 0 1rem;
    box-sizing: border-box;
    @media screen and (max-width: $tablet) {
      max-width: 100%;
      min-width: 100%;
      padding: 1rem;
    }

    &__heading {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
    }

    &__heading-name {
      margin: 0 0.75rem 0 0;
    }

    &__heading-type {
      margin: 0;
      font-size: 1.25rem;
    }

    .regular-sans-text.item-side-bar__id {
      color: $light-gray;
      margin: 0;
      text-transform: none;
    }

    &__price {
      margin: 0;
      font-size: 1.5rem;
    }

    &__sale-price {
      color: $red;
    }

    &__sale-price-old {
      margin-right: 4px;
      text-decoration: line-through;
    }

    &__color-picker {
      margin-top: 1rem;
      height: auto;
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

    .regular-sans-text.item-side-bar__details-text {
      text-transform: none;
    }
    .item-side-bar__short-desc.regular-sans-text{
      text-transform: none;
    }

    &__availability {
      margin: 3rem 0 0.5rem 0;
      text-align: right;
    }

    &__add-wrapper {
      display: flex;
      justify-content: flex-end;
      margin: 0;
    }

    &__change-button {
      background: none;
      border: none;
      cursor: pointer;
      outline: none;
      &:focus {
        line {
          transition: stroke-width .3s;
          stroke-width: 5px;
        }
      }
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
      border: 1px solid $dark-blue;
      text-transform: uppercase;
      margin-left: 2rem;
      cursor: pointer;
      transition: outline .3s,
                  background .3s,
                  color .3s;
      &:focus {
        outline: 1px solid black;
      }
      &:hover {
        background: transparent;
        color: black;
      }
      &--sold-out {
        background: transparent;
        border: none;
        color: $red;
      }
    }
  }
</style>