<template>
    <section :class="containerClass" @click="toggleState">
      <section style="display: flex">
        <template v-if="!isOpen">
          <app-button class="header-menu__button">
            <div class="header-menu__circle"></div>
            <div class="header-menu__circle"></div>
            <div class="header-menu__circle"></div>
          </app-button>
          <p class="header-menu__text">{{$t(menuText)}}</p>
        </template>
        <app-button class="header-menu__close-button" v-if="isOpen">
          <img src="../../assets/svg/closeIcon.svg" alt="close icon" width="100%" height="100%"/>
        </app-button>
      </section>
      <nav class="menu-container" v-if="isOpen">
        <ul class="menu-catalogue">
          <li class="menu-catalogue__item">
            <router-link class="menu-catalogue__text" to="/store/category/all" replace>{{$t('items.alls')}}</router-link>
          </li>
          <br>
          <li class="menu-catalogue__item" v-for="link in byCategory" :key="link.to">
            <router-link class="menu-catalogue__text" :to="link.to" replace>{{$t(link.text)}}</router-link>
          </li>
          <br>
          <li class="menu-catalogue__item" v-for="link in byMaterial" :key="link.to">
            <router-link class="menu-catalogue__text" :to="link.to" replace>{{$t(link.text)}}</router-link>
          </li>
        </ul>
        <ul class="menu-links">
          <li class="menu-links__item" v-for="link in links" :key="link.to">
            <router-link class="menu-links__text" :to="link.to">{{$t(link.text)}}</router-link>
          </li>
        </ul>
      </nav>
    </section>
</template>

<script>
  import AppButton from '../AppButton';

  export default {
    name: 'appHeaderMenu',
    components: {AppButton},
    data () {
      return {
        isOpen: false,
        byCategory: [{
          to: '/store/category/cachepot',
          text: 'items.cachepots'
        }, {
          to: '/store/category/candlestick',
          text: 'items.candlesticks'
        }, {
          to: '/store/category/stand',
          text: 'items.stands'
        }, {
        //   to: '/store/category/bag',
        //   text: 'items.bags'
        // }, {
          to: '/store/category/vase',
          text: 'items.vases'
        }, {
          to: '/store/category/bouquet',
          text: 'items.bouquets'
        }, {
          to: '/store/category/hanging',
          text: 'items.hangings'
        }, {
          to: '/store/category/panno',
          text: 'items.panno'
        }, {
          to: '/store/category/candle',
          text: 'items.candles'
        }, {
          to: '/store/category/wax',
          text: 'items.wax'
        }],
        byMaterial: [{
          to: '/store/material/concrete',
          text: 'material.concrete'
        }, {
          to: '/store/material/dryflowers',
          text: 'material.dryflowers'
        }, {
          to: '/store/material/cotton',
          text: 'material.cotton'
        }],
        links: [{
          to: '/delivery',
          text: 'links.delivery'
        }, {
          to: '/about',
          text: 'links.about'
        }]
      };
    },
    computed: {
      menuText () {
        if (this.$route.path.includes('store')) {
          if (this.$route.params.type)
            return `items.${this.$route.params.type}s`;
          else if (this.$route.params.material)
            return `material.${this.$route.params.material}`;
        }
        return '';
      },
      containerClass () {
        return {
          'header-menu': true,
          'header-menu--open': this.isOpen
        }
      }
    },
    methods: {
      toggleState () {
        this.isOpen = !this.isOpen;
      }
    }
  };
</script>

<style lang="scss">

  .header-menu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__button {
      display: flex;
      background-color: transparent;
      border: none;
      padding: 0;
    }
    &__close-button {
      background-color: transparent;
      border: none;
      padding: 0;
      z-index: 9999;
      width: 1.5rem;
      height: 1.5rem;
    }
    &__circle {
      width: 0.75rem;
      height: 0.75rem;
      background-color: black;
      border-radius: 4rem;
      margin-right: 0.25rem;
    }
    &__text {
      position: fixed;
      left: 4.5rem;
      top: 0;
      color: black;
      cursor: pointer;
    }
  }

  .menu-container {
    position: fixed;
    display: flex;
    background-color: rgba(0, 0, 0, .8);
    backdrop-filter: blur(4px);
    left: 0;
    top: 0;
    width: 200vw;
    height: 200vh;
    padding: 2.5rem 0.5rem;
    .menu-catalogue, .menu-links {
      width: 14rem;
      padding: 0;
      margin: 0.25rem 0 0 0;
      &__item {
        list-style: none;
        margin-top: 0.25rem;
      }
      &__text {
        font-weight: 300;
        font-size: 1.5rem;
        color: white;
        text-decoration: none;
        &:hover {
          font-weight: 400;
        }
      }
    }
    .menu-catalogue {
      margin-left: 0.5rem;
    }
    .menu-links {
      width: 300px;
      &__text {
        font-weight: 700;
        &:hover {
          font-weight: 700;
          font-size: 1.5rem;
        }
      }
    }
  }
</style>