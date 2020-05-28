<template>
  <li class="item-card" :class="{'item-card--wide': isWide}">
    <router-link class="item-card__image-link" :to="getLink()">
      <img ref="image" :src="imageLink" loading="lazy" @load="imageLoaded"/>
      <button class="regular-sans-text item-card__add-to-bag" @click="addToBag">Добавить в корзину</button>
    </router-link>
    <div v-show="isShowInfo" class="item-card__text-wrapper">
      <router-link class="item-card__text-link" to="/product/bag-net/natural">
        <p class="small-regular-heading item-card__model">{{item.name}}</p>
        <p class="regular-sans-text item-card__type">{{$t(`items.${item.type}`)}}</p>
      </router-link>
      <p class="regular-sans-text item-card__price">{{item.itemProperty.price}}P</p>
    </div>
<!--    <div v-show="isShowInfo">-->
<!--      <button class="clean-button item-card__color-button" @click="addToBag"></button>-->
<!--    </div>-->
  </li>
</template>

<script lang="ts">
    import Vue from 'vue';
    import slugify from "slugify";
    import { ItemInterface } from "../../services/Store/Item/item.types";

    interface Data {
        isShowInfo: boolean;
        isWide: boolean;
    }

    export default Vue.extend({
        name: 'ItemCard',
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
            imageLink (): void {
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
            getLink (): string {
                let path = this.item.rootPath;
                if (this.item.selectableProperty.length)
                    this.item.selectableProperty.forEach(property => {
                        path += `/${slugify(property.value.toLowerCase())}`
                    });
                return `/product/${path}`;
            },
            addToBag (event): void {
                event.preventDefault();
                this.$store.dispatch('bag/add', this.item);
            }
        }
    });
</script>

<style lang="scss">
  @import "../../assets/styles/ui";
  @import "../../assets/styles/vars";

  .item-card {
    display: inline-block;
    overflow: hidden;
    &--wide {
      grid-column-end: span 2;
    }
    &__image-link {
      position: relative;
      width: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: calc(100% - 2.9rem);
        object-fit: fill;
      }
      &:hover {
        .regular-sans-text.item-card__add-to-bag {
          background: rgba(white, 0.6);
          color: $dark-blue;
        }
      }
    }
    .regular-sans-text.item-card__add-to-bag {
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
      overflow-x: hidden;
    }
    .small-regular-heading.item-card__model, .regular-sans-text.item-card__type, .regular-sans-text.item-card__price {
      margin: 0;
      align-self: flex-end;
      line-height: 1;
      white-space: nowrap;
    }

    .regular-sans-text.item-card__type, .regular-sans-text.item-card__price {
      @media screen and (max-width: $horizontal-tablet) {
        font-size: 10px;
      }
    }

    .regular-sans-text.item-card__type {
      overflow-x: hidden;
      text-overflow: ellipsis;
    }

    .small-regular-heading.item-card__model {
      margin-right: 0.5rem;
      @media screen and (max-width: $horizontal-tablet) {
        font-size: 12px;
      }
    }
    .clean-button.item-card__color-button {
      width: 1rem;
      height: 1rem;
      border-radius: 1em;
      background-color: black;
    }
  }
</style>