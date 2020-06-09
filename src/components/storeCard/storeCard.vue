<template>
  <li class="store-card" :class="{'store-card--wide': isWide}">
    <div class="store-card__image-link">
      <router-link :to="getLink()">
        <img class="store-card__image" ref="image" :src="imageLink" loading="lazy" @load="imageLoaded"/>
      </router-link>
      <button class="regular-sans-text store-card__add-to-bag" @click="addToBag">Добавить в корзину</button>
    </div>
    <div v-show="isShowInfo" class="store-card__text-wrapper">
      <router-link class="store-card__text-link" :to="getLink()">
        <p class="small-regular-heading store-card__model">{{item.name}}</p>
        <p class="regular-sans-text store-card__type">{{ item.type && $t(`items.${item.type}` )}}</p>
      </router-link>
      <p class="regular-sans-text store-card__price">{{item.price}}P</p>
    </div>
    <color-picker :item="item"/>
  </li>
</template>

<script lang="ts">
  import Vue from 'vue';
  import slugify from "slugify";
  import {ItemInterface} from "../../services/Store/Shop/shop.types";
  import ColorPicker from "../ColorPicker.vue";

  interface Data {
    isShowInfo: boolean;
    isWide: boolean;
  }

  export default Vue.extend({
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
      // TODO compute it in the store
      imageLink(): void {
        let path = this.item.rootPath;
        if (this.item.selectableProperty.length)
          this.item.selectableProperty.forEach(property => {
            path += `-${slugify(property.value.toLowerCase())}`
          });
        return require(`@/assets/images/store/${path}-small.jpg`);
      }
    },
    methods: {
      imageLoaded: function (): void {
        this.isShowInfo = true;
        // @ts-ignore
        this.isWide = this.$refs.image.naturalWidth > this.$refs.image.naturalHeight;
      },
      getLink(): string {
        let path = this.item.rootPath;
        if (this.item.selectableProperty.length)
          this.item.selectableProperty.forEach(property => {
            path += `/${slugify(property.value.toLowerCase())}`
          });
        return `/product/${path}`;
      },
      addToBag(event): void {
        event.preventDefault();
        this.$store.dispatch('bag/add', {item: this.item});
      }
    }
  });
</script>

<style lang="scss">
  @import "../../assets/styles/ui";
  @import "../../assets/styles/vars";

  .store-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &--wide {
      grid-column-end: span 2;
    }

    &__image-link {
      display: flex;
      position: relative;
      height: 100%;
      overflow: hidden;

      &:hover {
        .regular-sans-text.store-card__add-to-bag {
          background: rgba(white, 0.6);
          color: $dark-blue;
        }
      }
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .regular-sans-text.store-card__add-to-bag {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      z-index: 10;
      transition: .3s all;
      text-align: center;
      border: none;
      outline: none;
      padding: 1rem 0;
      margin: 0;
      background: rgba(white, 0);
      color: transparent;

      &:hover {
        background: rgba($dark-blue, 1);
        color: white;
      }
    }

    &__text-wrapper {
      display: flex;
      justify-content: space-between;
      margin: 0.5rem 0;
    }

    &__text-link {
      display: flex;
      text-decoration: none;
      overflow: hidden;
    }

    .small-regular-heading.store-card__model, .regular-sans-text.store-card__type, .regular-sans-text.store-card__price {
      margin: 0;
      align-self: flex-end;
      line-height: 1;
      white-space: nowrap;
    }

    .regular-sans-text.store-card__type, .regular-sans-text.store-card__price {
      @media screen and (max-width: $horizontal-tablet) {
        font-size: 10px;
      }
    }

    .regular-sans-text.store-card__type {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .small-regular-heading.store-card__model {
      margin-right: 0.5rem;
      @media screen and (max-width: $horizontal-tablet) {
        font-size: 12px;
      }
    }

    .clean-button.store-card__color-button {
      width: 1rem;
      height: 1rem;
      border-radius: 1em;
      background-color: black;
    }
  }
</style>