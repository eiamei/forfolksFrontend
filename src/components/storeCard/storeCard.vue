<template>
  <li class="store-card" :class="{'store-card--wide': isWide}">
    <div class="store-card__image-link">
      <router-link :to="getLink()">
        <img class="store-card__image" ref="image" :src="imageLink" loading="lazy" @load="imageLoaded"/>
      </router-link>
      <button v-if="isAvailable" class="regular-sans-text store-card__add-to-bag" @click="addToBag">
        Добавить в корзину
      </button>
    </div>
    <div v-show="isShowInfo" class="store-card__text-wrapper">
      <router-link class="store-card__text-link" :to="getLink()">
        <p class="small-regular-heading store-card__model">{{item.name}}</p>
        <p class="regular-sans-text store-card__type">{{ item.type && $t(`${item.type}` )}}</p>
      </router-link>
      <p v-if="item.isSale" class="regular-sans-text store-card__price">
        <span class="store-card__sale-price-old">{{item.price}}</span>
        <span class="store-card__sale-price">{{salePrice}}P</span>
      </p>
      <p v-else class="regular-sans-text store-card__price">{{item.price}}P</p>
    </div>
    <div v-if="badge.text.length" :class="badge.class">{{badge.text}}</div>
    <color-picker :item="item"/>
  </li>
</template>

<script lang="ts">
  import Vue from 'vue';
  import slugify from "slugify";
  import {ItemInterface} from "../../services/Store/Shop/shop.types";
  import ColorPicker from "../ColorPicker.vue";
  import { productLinkBuilder } from '../../utils/linkBuilder';

  interface BadgeInterface {
    text: string;
    class: Array<string>
  }

  interface Data {
    isShowInfo: boolean;
    isWide: boolean;
  }

  interface Methods {
    imageLoaded(): void;
    getLink(): string;
    addToBag(event: Event): void;
  }

  interface Computed {
    imageLink: Function;
    badge: BadgeInterface;
    isAvailable: boolean;
    salePrice: number;
  }

  interface Props {
    item: ItemInterface;
  }

  export default Vue.extend<Data, Methods, Computed, Props>({
    name: 'StoreCard',
    components: { ColorPicker },
    props: {
      item: {
        type: Object as () => ItemInterface,
        required: true
      }
    },
    data(): Data {
      return {
        isShowInfo: false,
        isWide: false
      }
    },
    computed: {
      imageLink() {
        let path = this.item.rootPath;
        if (this.item.selectableProperty.length)
          this.item.selectableProperty.forEach(property => {
            path += `-${slugify(property.value.toLowerCase())}`
          });
        return require(`../../assets/images/store/${path}-small.jpg`);
      },
      badge() {
        if (this.item.isSale || this.item.badges.includes('sale')) {
          return {
            text: 'SALE',
            class: [
              'store-card__badge',
              'store-card__badge--sale'
            ]
          }
        } else if (this.item.badges.includes('new')) {
          return {
            text: 'NEW',
            class: [
              'store-card__badge',
            ]
          }
        }
        return {
          text: '',
          class: []
        }
      },
      isAvailable() {
        return this.item.availability > 0;
      },
      salePrice() {
        return this.item.price - this.item.price * this.item.salePercent;
      }
    },
    methods: {
      imageLoaded(): void {
        this.isShowInfo = true;
        if (this.$refs.image)
          // @ts-ignore
          this.isWide = this.$refs.image.naturalWidth > this.$refs.image.naturalHeight;
      },
      getLink(): string {
        return productLinkBuilder(this.item);
      },
      addToBag(event: Event): void {
        event.preventDefault();
        this.$store.dispatch('bag/add', {item: this.item});
      }
    }
  });
</script>

<style>
  .store-card {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
  .store-card--wide {
    grid-column-end: span 2;
  }
  .store-card__image-link {
    display: flex;
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .store-card__image-link:hover .regular-sans-text.store-card__add-to-bag {
    background: rgba(255, 255, 255, 0.6);
    color: var(--dark-blue);
  }
  .store-card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .store-card .regular-sans-text.store-card__add-to-bag {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 10;
    text-align: center;
    border: none;
    padding: 1rem 0;
    margin: 0;
    background-color: rgba(255, 255, 255, 0);
    color: transparent;
    transition: color 0.3s, background-color 0.3s;
  }
  .store-card .regular-sans-text.store-card__add-to-bag:hover {
    background-color: var(--dark-blue);
    color: white;
  }
  .store-card__text-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
  }
  .store-card__text-link {
    display: flex;
    text-decoration: none;
    overflow: hidden;
  }
  .store-card .store-card__sale-price {
    color: var(--red);
  }
  .store-card .store-card__sale-price-old {
    margin-right: 4px;
    text-decoration: line-through;
  }
  .store-card .small-regular-heading.store-card__model, .store-card .regular-sans-text.store-card__type, .store-card .regular-sans-text.store-card__price {
    margin: 0;
    align-self: flex-end;
    white-space: nowrap;
  }
  .store-card .regular-sans-text.store-card__type {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .store-card .small-regular-heading.store-card__model {
    margin-right: 0.5rem;
  }
  .store-card .clean-button.store-card__color-button {
    width: 1rem;
    height: 1rem;
    border-radius: 1em;
    background-color: black;
  }
  .store-card__badge {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 1rem;
    right: 1rem;
    width: 4rem;
    height: 4rem;
    border-radius: 4rem;
    background-color: var(--dark-blue);
    color: white;
    font-weight: bold;
  }
  .store-card__badge--sale {
    background-color: var(--sale-red);
  }
</style>