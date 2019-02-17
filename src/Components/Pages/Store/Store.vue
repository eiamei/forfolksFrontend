<template>
  <div class="stores">
    <div class="store" ref="container">
      <div class="store__menu"  ref="menu">
        <p v-for="type in types"
           :class="{'menu-item--active': current === type}"
           @click="setCurrent(type)"
           :key="type"
        >
          {{$t(`items.${type}s`)}}
        </p>
      </div>
      <div class="store__cards">
        <card class="store__item" v-for="(item, index) in currentStore" :item="item" :key="index + item.name" :width="width"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from './StoreCard';
  import Store from '../../../Core/Constants/Store'
  export default {
    name: 'Store',
    components: { Card },
    data () {
      return {
        store: Store,
        types: ['all', 'pot', 'candlestick', 'stand', 'candle'],
        current: 'all',
        stdSizes: {
          minWidth: 140,
          defaultWidth: 400,
          maxWidth: 500
        },
        width: 470
      }
    },
    computed: {
      currentStore () {
        if (this.current === 'all') {
          return this.store;
        } else {
          return this.store.filter((item) => {
            if (item.type === this.current) return item;
          });
        }
      },
      windowWidth () {
        return this.$store.state.global.windowSize.width;
      }
    },
    watch: {
      windowWidth () {
        this.resizeHandler();
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.resizeHandler();
      });
    },
    updated () {
      this.resizeHandler();
    },
    methods: {
      setCurrent (value) {
        this.current = value;
      },
      resizeHandler () {
        if (this.$refs.container && this.$refs.menu) {
          const elementWidth = this.$refs.container.clientWidth - this.$refs.menu.clientWidth - 24;
          for (let i = 2; i < 6; i++) {
            let cardSize = Math.floor(elementWidth / i);
            if (cardSize > this.stdSizes.minWidth && cardSize < this.stdSizes.maxWidth) {
              if (this.windowWidth > 770) {
                this.width = cardSize - 80;
              } else if (this.windowWidth > 500) {
                this.width = cardSize - 36;
              } else {
                this.width = cardSize - 4;
              }
              break;
            }
          }
        }
      }
    }
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/_colors';
  .stores {
    min-height: calc(100vh);
    height: 100%;
    margin: 48px 0 0 0;
  }
  .fade-enter-active {
    transition: opacity 1s;
  }
  .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .store {
    /*padding: 24px 16px;*/
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    &__menu {
      padding: 24px;
      min-width: 160px;
      background-color: $menu-color;
      font-size: 14px;
      .menu-item {
        &--active {
          &:before {
            content: '•';
            padding: 0 4px;
          }
          font-weight: 700;
        }
      }
      p {
        margin: 0 0 16px 0;
        cursor: pointer;
        &:hover {
          font-weight: 700;
        }
      }
    }
    &__cards {
      padding: 24px 24px 0 0;
      background-color: $store-card-bg-color;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
    &__item {
      padding: 0 40px 80px 40px;
    }
  }
  @media screen and (max-width: 770px) {
    .store {
      &__menu {
        display: none;
      }
      &__cards {
        padding: 16px 0;
      }
      &__item {
        padding: 0 24px 32px 24px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .store {
      &__item {
        padding: 0 8px 16px 8px;
      }
    }
  }
</style>