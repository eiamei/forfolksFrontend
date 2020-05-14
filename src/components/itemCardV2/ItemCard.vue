<template>
  <section class="item-card">
    <router-link to="/product/bag-net/natural">
      <div class="item-card__image-link">
        <img :src="require('@/assets/images/store/bag-net-natural-small.jpg')" />
        <button class="regular-sans-text item-card__add-to-bag">Добавить в корзину</button>
      </div>
    </router-link>
    <div class="item-card__text-wrapper">
      <router-link class="item-card__text-link" to="/product/bag-net/natural">
        <p class="small-regular-heading item-card__model">{{item}}NET</p>
        <p class="regular-sans-text item-card__type">Bag</p>
      </router-link>
      <p class="regular-sans-text item-card__price">1100Р</p>
    </div>
    <div>
      <button class="clean-button item-card__color-button"></button>
    </div>
  </section>
</template>

<script lang="ts">
    import Vue from 'vue';

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
        }
    });
</script>

<style lang="scss">
  @import "../../assets/styles/ui";
  @import "../../assets/styles/vars";

  .item-card {
    display: flex;
    flex-direction: column;
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
      z-index: 1;
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