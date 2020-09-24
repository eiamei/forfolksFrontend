<template>
  <section class="bag-item-container">
    <router-link :to="link">
      <img :class="imageClass" :src="itemImage"/>
    </router-link>
    <div class="bag-item">
      <h3 class="bag-item__header">{{item.name}}</h3>
      <h5 class="bag-item__type">{{item.type}}</h5>
      <section class="bag-item__row">
        <p class="bag-item__field" style="width: 50%; margin: 0; padding: 0">
          <template v-for="(prop, index) in item.selectableProperty">{{index > 0 ? ', ' : ''}}{{$t(`common.${prop.name}`)}}: {{prop.text}}</template>
        </p>
        <section v-if="isAvailable" style="display: flex; justify-content: center; align-items: center">
          <p class="bag-item__field">{{item.price}}</p>
          <button class="clean-button bag-item__button" @click="decrement">-</button>
          <p class="bag-item__field">{{item.qty}}</p>
          <button class="clean-button bag-item__button" @click="increment">+</button>
          <p class="bag-item__field">{{item.price * item.qty}}</p>
        </section>
        <p class="bag-item__not-available" v-else>Нет в наличии</p>
        <button class="clean-button bag-item__button" @click="remove">Удалить</button>
      </section>
    </div>
  </section>
</template>

<script>
  import slugify from 'slugify';
  import { productLinkBuilder } from '../utils/linkBuilder';

  export default {
    name: 'bagItem',
    props: {
      item: {
        required: true
      }
    },
    computed: {
      itemImage () {
        if (this.id)
          return require(`../assets/images/store/${this.id}-small.jpg`);
        return '';
      },
      id () {
        let id = this.item.rootPath;
        if (this.item.selectableProperty.length)
          this.item.selectableProperty.forEach(property => {
            id += `-${slugify(property.value.toLowerCase())}`
          });
        return id;
      },
      isAvailable () {
        return this.item.qty > 0;
      },
      imageClass () {
        return {
          'bag-item-image': true,
          'bag-item-image--hidden': !this.isAvailable
        }
      },
      link () {
        return productLinkBuilder(this.item);
      }
    },
    methods: {
      decrement () {
        this.$store.dispatch('bag/decrement', this.id);
      },
      increment () {
        if (this.item.qty + 1 <= this.item.availability)
          this.$store.dispatch('bag/increment', this.id);
      },
      remove () {
        this.$store.dispatch('bag/remove', this.id);
      }
    }
  };
</script>

<style lang="scss">
  @import '../assets/styles/ui.scss';
  @import '../assets/styles/vars.scss';
  .bag-item-container {
    display: flex;
    text-align: left;
    width: 100%;
    border-bottom: 1px solid black;
    margin: 0 0 8px 0;
    padding: 0 0 8px 0;
  }
  .bag-item-image {
    height: 180px;
    width: 180px;
    object-fit: cover;
    object-position: 50% 100%;
    &--hidden {
      filter: blur(2px);
    }
    @media screen and (max-width: 1100px) {
      height: 140px;
      width: 140px;
    }
    @media screen and (max-width: 800px) {
      height: 120px;
      width: 120px;
    }
    @media screen and (max-width: 600px) {
      height: 80px;
      width: 80px;
    }
    @media screen and (max-width: 500px) {
      height: 70px;
      width: 70px;
    }
    @media screen and (max-width: 400px) {
      height: 60px;
      width: 60px;
    }
  }
  .bag-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 0 0 16px;
    &__header {
      margin: 4px 0;
      @media screen and (max-width: 600px) {
        margin: 0 0 4px 0;
      }
    }
    &__type {
      font-weight: 400;
      margin: 4px 0 8px 0;
      @media screen and (max-width: 600px) {
        margin: 0 0 4px 0;
      }
    }
    &__row {
      display: flex;
      justify-content: space-between;
    }
    &__field {
      padding: 0 16px;
      margin: 0;
      cursor: default;
      @media screen and (max-width: 900px) {
        padding: 0 8px;
        font-size: 14px;
      }
      @media screen and (max-width: 600px) {
        font-size: 12px;
      }
      @media screen and (max-width: 400px) {
        padding: 0 4px;
        font-size: 10px;
      }
    }
    &__button.clean-button {
      color: black;
      font-size: 16px;
      border: 1px solid black;
      padding: 1px 8px 4px 8px;
      cursor: pointer;
      @media screen and (max-width: 900px) {
        font-size: 14px;
      }
      @media screen and (max-width: 600px) {
        font-size: 12px;
      }
      @media screen and (max-width: 400px) {
        font-size: 10px;
      }
    }
    &__not-available {
      margin: 0;
      color: $sale-red;
    }
  }
</style>