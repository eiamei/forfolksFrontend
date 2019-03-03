<template>
  <div  class="store-card">
    <div class="store-card__bg"
         :class="[`store-card__bg--var${getRandomClassNumber()}`, `store-card__bg--color${getRandomClassNumber()}`]"
         :style="{'width': `${width}px`, 'height': `${width - 8}px`}">
      <div class="store-card__bg-text">
        {{$t(`items.${item.type}`)}} {{item.name}} {{item.model}}, {{item.price}}₽
      </div>
    </div>
    <img class="store-card__image" :src="itemImage" :style="{'width': `${width}px`}" :alt="`{{item.name}} {{item.model}}`">
    <div class="store-card__image-text" :style="{'width': `${width - 8}px`}">
      {{$t(`items.${item.type}`)}} {{item.name}} {{item.model}}, {{item.price}}₽
    </div>
    <router-link :to="link">
      <div class="store-card__data" :style="{'width': `${width}px`, 'height': `${width}px`}">
        <div class="store-card__name">{{$t(`items.${item.type}`)}} {{item.name}} {{item.model}}</div>
        <div>{{item.price}}₽</div>
      </div>
    </router-link>
  </div>
</template>

<script>
  import COLORS from '../../../Core/Constants/Colors'
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
        const color = COLORS[this.item.colors][0].label;
        return `/item?name=${name}&model=${model}&type=${type}&color=${color}`;
      }
    },
    methods: {
      getRandomClassNumber () {
        const min = 1;
        const max = 3;
        return Math.floor(Math.random() * max) + min;
      }
    }
  };
</script>

<style lang='scss'>
  @import '../../../assets/styles/colors';
  .store-card {
    text-decoration: none;
    cursor: pointer;
    position: relative;
    font-size: .8em;
    display: flex;
    flex-direction: column;
    &:hover {
      .store-card__data {
        opacity: .7;
      }
      .store-card__bg {
        top: 0!important;
        left: 40px!important;
        right: 0;
      }
    }
    &__image {
      width: 470px;
      position: relative;
    }
    &__image-text {
      display: none;
      text-align: center;
      z-index: 10;
      margin-top: 8px;
    }
    &__data {
      position: absolute;
      display: flex;
      background-color: black;
      top: 0;
      opacity: 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      z-index: 10;
      transition: all .3s;
    }
    &__bg {
      position: absolute;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: rgba($dusty-rose, .7);
      color: white;
      z-index: 0;
      transition: all .3s;
      border-radius: 4px;
      padding: 0 0 8px 0;
      height: calc(100% - 16px);
      top: 32px;
      &--var1 {
        left: 20px;
      }
      &--var2 {
        left: 56px;
      }
      &--var3 {
        left: 40px;
        border-radius: 100px;
      }
      &--color1 {
        background-color: rgba($dusty-rose, .7);
      }
      &--color2 {
        background-color: rgba($blue-gray, .7);
      }
      &--color3 {
        background-color: rgba($sandy, .7);
      }
    }
    &__bg-text {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      align-content: flex-end;
      height: 100%;
      color: black
    }
    &__name {
      font-weight: 700;
    }
    @media screen and (max-width: 770px) {
      &:hover {
        .store-card__bg {
          left: 24px!important;
        }
      }
      .store-card {
        &__image-text {
          display: block;
        }
        &__bg {
          display: none;
          top: 24px;
          &--var1 {
            left: 16px;
          }
          &--var2 {
            left: 36px;
          }
        }
        &__bg-text {
          display: none;
        }
      }
    }
    @media screen and (max-width: 500px) {
      .store-card {
        &__image-text {
          font-size: 6px;
        }
      }
    }
  }
</style>