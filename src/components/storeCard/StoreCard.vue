<template>
  <article class="store-card">
    <router-link :to="getLink()" class="store-card__link">
      <img ref='image' :src="itemImage" :alt="alt" :width="width" :height="height" @load="load">
    </router-link>
    <section class="store-card-description">
      <section>
        <p class="store-card-description__title">{{item.name}}</p>
        <span class="store-card-description__type-container">
          <p class="store-card-description__type">{{$t(`items.${item.type.toLowerCase()}`)}}</p>
          <p class="store-card-description__price">{{item.itemProperty.price}}&thinsp;р</p>
        </span>
<!--        <section class="store-card-description-colors">-->
<!--          <router-link-->
<!--                  class="store-card-description-colors__circle"-->
<!--                  v-for="color in colors"-->
<!--                  :title="color"-->
<!--                  :class="getColor(color)"-->
<!--                  :key="color"-->
<!--                  :to="getLink(color)"-->
<!--          >-->
<!--          </router-link>-->
<!--        </section>-->
      </section>
    </section>
  </article>
</template>

<script>
  import slugify from 'slugify';
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
        default: 0
      },
      height: {
        type: Number,
        required: false,
        default: 0
      },
      isBig: {
        type: Boolean
      }
    },
    computed: {
      // colors () {
      //   return this.item.availableColors;
      // },
      itemImage () {
        let path = this.item.rootPath;
        if (this.item.selectableProperty.length)
          this.item.selectableProperty.forEach(property => {
            path += `-${slugify(property.value.toLowerCase())}`
          });
        return require(`@/assets/images/store/${path}-small.jpg`);
      },
      alt () {
      //   const name = this.item.name.toLowerCase();
      //   const model = this.item.model.toLowerCase();
      //   const type = this.item.type.toLowerCase();
      //   return `${this.$t(`items.${type}`)} ${name} ${model}`
      }
    },
    methods: {
      getColor (color) {
        // return `store-card-description-colors__circle--${color}`
      },
      getLink (color) {
        let path = this.item.rootPath;
        if (this.item.selectableProperty.length)
          this.item.selectableProperty.forEach(property => {
            path += `/${slugify(property.value.toLowerCase())}`
          });
        return `/product/${path}`;
      },
      load () {
        this.$emit('isWide', this.$refs.image.naturalWidth > this.$refs.image.naturalHeight);
      }
    }
  };
</script>

<style lang='scss' scoped>
  @import '../../assets/styles/colors';
  .store-card {
    display: flex;
    position: relative;
    cursor: pointer;
    padding: 2px;
    &:hover {
      .store-card-description-colors {
        opacity: 1;
      }
    }
    &__link {
      margin-bottom: -5px;
    }
  }

  .store-card-description-colors {
    height: 20px;
    position: absolute;
    opacity: 0;
    transition: .3s all;
    display: flex;
    bottom: -32px;
    padding-left: 2px;
    @media (hover: none) and (pointer: coarse) {
      opacity: 1;
    }
    @media screen and (max-width: 800px) {
      bottom: -28px;
    }
    @media screen and (max-width: 500px) {
      bottom: -26px;
    }
    &__circle {
      width: 16px;
      height: 16px;
      background-color: white;
      border-radius: 16px;
      margin-right: 8px;
      transition: 0.1s all;
      &:hover {
        width: 18px;
        height: 18px;
        margin-right: 6px;
      }
      @media screen and (max-width: 800px) {
        width: 12px;
        height: 12px;
        &:hover {
          width: 14px;
          height: 14px;
        }
      }
      @media screen and (max-width: 500px) {
        width: 8px;
        height: 8px;
        margin-right: 6px;
        &:hover {
          width: 10px;
          height: 10px;
          margin-right: 4px;
        }
      }

      &--coated {
        background-color: $coated;
      }
      &--black_marble {
        background: $black_marble;
      }
      &--sakura {
        background-color: $sakura;
      }
      &--thunderstorm {
        background-color: $thunderstorm;
      }
      &--ash {
        background-color: $ash;
      }
      &--mint {
        background-color: $mint;
      }
      &--mustard {
        background-color: $mustard;
      }
      &--graphite {
        background-color: $graphite;
      }
      &--jute {
        background-color: $jute;
      }
      &--cornflower {
        background-color: $cornflower;
      }
      &--cacao {
        background-color: $cacao;
      }
      &--natural {
        background: $natural;
      }
      &--gray_fog {
        background: $gray_fog;
      }
      &--black {
        background: $black;
      }
      &--powder {
        background: $powder;
      }
      &--moonstone {
        background: $moonstone;
      }
    }
  }
  .store-card-description {
    font-family: 'Playfair Display', serif;
    position: absolute;
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: 48px;
    @media screen and (max-width: 800px) {
      bottom: 30px;
    }
    @media screen and (max-width: 500px) {
      bottom: 22px;
    }

    &__title {
      font-weight: 700;
      font-size: 3vw;
      margin: 0;
      @media screen and (max-width: 800px) {
        font-size: 24px;
      }
      @media screen and (max-width: 500px) {
        font-size: 16px;
      }
      @media screen and (max-width: 400px) {
        font-size: 12px;
      }
    }
    &__type-container {
      display: flex;
      justify-content: space-between;
    }
    &__type, &__price {
      font-size: 1.5vw;
      margin: 0;
      @media screen and (max-width: 800px) {
        font-size: 12px;
      }
      @media screen and (max-width: 500px) {
        font-size: 10px;
      }
    }
    &__type {
      text-transform: capitalize;
      margin-right: 16px;
      @media screen and (max-width: 800px) {
        margin-right: 8px;
      }
    }
  }
</style>