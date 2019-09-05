<template>
  <article class="store-card">
    <router-link :to="getLink()" class="store-card__link">
      <img :src="itemImage" :alt="alt" :style="{'width': width + 'px', 'height': height + 'px'}">
    </router-link>
    <section class="store-card-description">
      <section>
        <p class="store-card-description__title">{{item.name}}{{item.model ? `&nbsp;${item.model}` : ''}}</p>
        <span class="store-card-description__type-container">
          <p class="store-card-description__type">{{$t(`items.${item.type}`)}}</p>
          <p class="store-card-description__price">{{item.price}}&thinsp;р</p>
        </span>
        <section class="store-card-description-colors">
          <router-link
                  class="store-card-description-colors__circle"
                  v-for="color in colors"
                  :title="color"
                  :class="getColor(color)"
                  :key="color"
                  :to="getLink(color)"
          >
          </router-link>
        </section>
      </section>
    </section>
  </article>
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
      height: {
        type: Number,
        required: false,
        default: 470
      },
      isBig: {
        type: Boolean
      }
    },
    computed: {
      colors () {
        return this.item.availableColors;
      },
      itemImage () {
        const name = this.item.name.toLowerCase();
        const model = this.item.model.toLowerCase();
        const type = this.item.type.toLowerCase();
        return require(`@/assets/images/storeIcons/${type}-${name}${model ? '-' + model : ''}.jpg`);
      },
      alt () {
        const name = this.item.name.toLowerCase();
        const model = this.item.model.toLowerCase();
        const type = this.item.type.toLowerCase();
        return `${this.$t(`items.${type}`)} ${name} ${model}`
      }
    },
    methods: {
      getColor (color) {
        return `store-card-description-colors__circle--${color}`
      },
      getLink (color = this.colors[0]) {
        const name = this.item.name.toLowerCase();
        const model = this.item.model.toLowerCase();
        const type = this.item.type.toLowerCase();
        return `/product/${type}/${name}${model ? ('-' + model) : ''}/${color}`;
      }
    }
  };
</script>

<style lang='scss' scoped>
  @import '../../../assets/styles/colors';
  .store-card {
    display: flex;
    position: relative;
    cursor: pointer;
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
    &__title {
      font-weight: 700;
      font-size: 3em;
      margin: 0;
    }
    &__type-container {
      display: flex;
      justify-content: space-between;
    }
    &__type, &__price {
      font-size: 1.5em;
      margin: 0;
    }
    &__type {
      text-transform: capitalize;
      margin-right: 16px;
    }
  }
</style>