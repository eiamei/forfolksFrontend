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
        <app-button class="header-menu__button" v-if="isOpen">
          <img src="../../assets/svg/closeIcon.svg" alt="close icon"/>
        </app-button>
      </section>
      <nav class="menu-container" v-if="isOpen">
        <ul class="menu-catalogue">
          <li class="menu-catalogue__item" v-for="link in catalogue" :key="link.to">
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
        catalogue: [{
          to: '/store/all',
          text: 'items.alls'
        }, {
          to: '/store/cachepot',
          text: 'items.cachepots'
        }, {
          to: '/store/candlestick',
          text: 'items.candlesticks'
        }, {
          to: '/store/stand',
          text: 'items.stands'
        }, {
          to: '/store/vase',
          text: 'items.vases'
        }, {
          to: '/store/bouquet',
          text: 'items.bouquets'
        }, {
          to: '/store/hanging',
          text: 'items.hangings'
        }, {
          to: '/store/panno',
          text: 'items.panno'
        }, {
          to: '/store/candle',
          text: 'items.candles'
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
        if (this.$route.path.includes('store'))
          return `items.${this.$route.params.type}s`;
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
    /*&--open {*/
    /*  background-color: rgba(0, 0, 0, .8);*/
    /*  backdrop-filter: blur(4px);*/
    /*  width: 100%;*/
    /*  height: 100vh;*/
    /*}*/

    &__button {
      display: flex;
      background-color: transparent;
      border: none;
      padding: 0;
    }
    &__circle {
      width: 0.75rem;
      height: 0.75rem;
      background-color: black;
      border-radius: 0.5rem;
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
    width: 100vw;
    height: 100vh;
    .menu-catalogue, .menu-links {
      width: 220px;
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