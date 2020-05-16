<template>
  <section class="item-card" :class="{'item-card--wide': isWide}">
    <router-link :to="getLink()">
      <div class="item-card__image-link">
        <img ref="image" :src="imageLink" loading="lazy" @load="imageLoaded"/>
        <button class="regular-sans-text item-card__add-to-bag" @click="addToBag">Добавить в корзину</button>
      </div>
    </router-link>
    <div v-show="isShowInfo" class="item-card__text-wrapper">
      <router-link class="item-card__text-link" to="/product/bag-net/natural">
        <p class="small-regular-heading item-card__model">{{item.name}}</p>
        <p class="regular-sans-text item-card__type">{{item.type}}</p>
      </router-link>
      <p class="regular-sans-text item-card__price">{{item.itemProperty.price}}P</p>
    </div>
    <div v-show="isShowInfo">
      <button class="clean-button item-card__color-button" @click="addToBag"></button>
    </div>
  </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import slugify from "slugify";

    interface Item {
        link: string;
        image: string;
    }

    export default Vue.extend({
        name: 'ItemCard',
        props: {
            item: {}
            // item: {
            //     type: Object as () => Item,
            //     required: true
            // }
        },
        data() {
            return {
                isShowInfo: false,
                isWide: false
            }
        },
        computed: {
            // TODO compute it in the store
            imageLink () {
                let path = this.item.rootPath;
                if (this.item.selectableProperty.length)
                    this.item.selectableProperty.forEach(property => {
                        path += `-${slugify(property.value.toLowerCase())}`
                    });
                return require(`@/assets/images/store/${path}-small.jpg`);
            }
        },
        methods: {
            imageLoaded () {
                this.isShowInfo = true;
                this.isWide = this.$refs.image.naturalWidth > this.$refs.image.naturalHeight;
            },
            getLink () {
                let path = this.item.rootPath;
                if (this.item.selectableProperty.length)
                    this.item.selectableProperty.forEach(property => {
                        path += `/${slugify(property.value.toLowerCase())}`
                    });
                return `/product/${path}`;
            },
            addToBag (event) {
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
    &--wide {
      grid-column-end: span 2;
    }
    &__image-link {
      position: relative;
      display: flex;
      width: 100%;
      img {
        width: 100%;
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
    }
    .small-regular-heading.item-card__model, .regular-sans-text.item-card__type, .regular-sans-text.item-card__price {
      margin: 0;
      align-self: flex-end;
      line-height: 1;
    }
    .small-regular-heading.item-card__model {
      margin-right: 0.5rem
    }
    .clean-button.item-card__color-button {
      width: 1rem;
      height: 1rem;
      border-radius: 1em;
      background-color: black;
    }
  }
</style>