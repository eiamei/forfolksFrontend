<template>
  <div  class="store-card">
    <img class="store-card__image" :src="itemImage" :style="{'width': `${width}px`}" :alt="`{{item.name}} {{item.model}}`">
    <router-link class="store-card__data" :style="{'width': `${width}px`, 'height': `${width}px`}" :to="link">
      Узнать больше
    </router-link>
    <div class="store-card-description">
      <div class="store-card-description__name">
        <p class=""><b>{{item.name}} {{item.model}} </b> | {{$t(`items.${item.type}`)}}</p>
      </div>
      <div class="store-card-description__short-description">
        <p class="">{{item.shortDesc}}</p>
      </div>
      <div class="store-card-description__link-and-price">
        <router-link :to="link">Узнать больше</router-link>
        <p class="store-card-description__price">{{item.price}}₽</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StoreCard',
    props: {
      item: {
        type: Object,
        required: true
      },
      width: {
        type: Number,
        required: false,
        default: 470
      },
      isBig: {
        type: Boolean
      }
    },
    computed: {
      itemImage () {
        const name = this.item.name.toLowerCase();
        const model = this.item.model.toLowerCase();
        const type = this.item.type.toLowerCase();
        return require(`@/assets/images/storeIcons/${type}-${name}${model ? '-' + model : ''}.jpg`);
      },
      link () {
        const name = this.item.name.toLowerCase();
        const model = this.item.model.toLowerCase();
        const type = this.item.type.toLowerCase();
        const color = this.item.availableColors[0];
        return `/item?name=${name}&model=${model}&type=${type}&color=${color}`;
      }
    }
  };
</script>

<style lang='scss' scoped>
  @import '../../../assets/styles/colors';

  .store-card {
    text-decoration: none;
    position: relative;
    font-size: .8em;
    display: flex;
    flex-direction: column;
    &__image {
      width: 470px;
      position: relative;
    }
    &__data {
      position: absolute;
      display: flex;
      background-color: white;
      top: 0;
      opacity: 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 10;
      transition: all .3s;
      font-size: 16px;
      &:hover {
        opacity: .7;
      }
    }
    &__name {
      font-weight: 700;
    }
  }
  .store-card-description {
    &__name {
      font-size: 16px;
      margin: 8px 0;
      display: flex;
      p {
        margin: 0;
      }
      @media screen and (max-width: 700px) {
        font-size: 10px!important;
      }
    }
    &__short-description {
      font-size: 12px;
      margin: 8px 0;
      display: flex;
      p {
        margin: 0;
      }
      @media screen and (max-width: 700px) {
        font-size: 8px!important;
      }
    }
    &__link-and-price {
      margin: 8px 0;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      @media screen and (max-width: 700px) {
        font-size: 8px!important;
      }
    }
    &__price {
      font-size: 16px;
      margin: 0;
      @media screen and (max-width: 700px) {
        font-size: 8px!important;
      }
    }
    @media screen and (max-width: 500px) {
      &__name, &__short-description, &__link-and-price {
        margin: 4px 0;
      }
    }
  }
</style>