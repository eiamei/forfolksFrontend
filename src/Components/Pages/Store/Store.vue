<template>
  <div class="stores">
    <div class="store" ref="container">
      <ul class="store__menu" ref="menu">
        <li v-for="type in types"
            class="menu-item"
            :class="{'menu-item--active': current === type}"
            @click="setCurrent(type)"
            :key="type"
        >
          {{$t(`items.${type}s`)}}
        </li>
      </ul>
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
        types: ['all', 'pot', 'candlestick', 'stand', 'vase', 'bouquet', 'hanging', 'season'],
        current: 'all',
        stdSizes: {
          minWidth: 140,
          defaultWidth: 400,
          maxWidth: 450
        },
        width: 400
      }
    },
    computed: {
      currentStore () {
        if (this.current === 'all') {
          return this.store;
        } else {
          return this.store.filter((item) => {
            try {
              if (item.category.find(category => category === this.current))
                return item;
            }
            catch (e) {console.warn(e)}
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
        if (this.$refs.container) {
          let elementWidth = this.$refs.container.clientWidth;
          if (this.windowWidth > 770) {
            elementWidth -= 156 + 40;
          }
          for (let i = 2; i < 7; i += 2) {
            let cardSize = Math.floor(elementWidth / i);
            if (cardSize > this.stdSizes.minWidth && cardSize < this.stdSizes.maxWidth) {
              this.width = cardSize - 16;
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
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    &__menu {
      position: fixed;
      margin: 24px 0 0 40px;
      padding: 0;
      background-color: $menu-color;
      font-size: 14px;
      list-style: none;
      display: flex;
      flex-direction: column;

      .menu-item {
        margin-bottom: 8px;
        cursor: pointer;
        &--active {
          font-weight: 700;
        }
      }
    }
    &__cards {
      padding: 24px 0 0 0;
      margin-left: 160px;
      background-color: $store-card-bg-color;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
    &__item {
      padding: 0 8px 16px 8px;
    }
  }
  @media screen and (max-width: 770px) {
    .store {
      flex-direction: column;
      &__menu {
        position: static;
        flex-direction: row;
        margin: 16px 16px 0 16px;
        .menu-item {
          margin: 0 8px 0 0;
        }
      }
      &__cards {
        margin-left: 0;
        padding: 16px 0;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .store {
      &__menu {
        margin: 8px 8px 0 8px;
        font-size: 10px;
        .menu-item {
          margin-right: 8px;
        }
      }
      &__cards {
        margin-left: 0;
        padding: 8px 0;
      }
      &__item {
        padding: 0 8px 16px 8px;
      }
    }
  }
</style>