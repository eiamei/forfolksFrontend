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
          <img src="../../../assets/svg/closeIcon.svg" alt="close icon"/>
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
  import AppButton from '../UI/AppButton';

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
          to: '/store/pot',
          text: 'items.pots'
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
        }
        // , {
        //   to: '/store/season',
        //   text: 'items.seasons'
        // }
        ],
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
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    &--open {
      background-color: rgba(0, 0, 0, .8);
      width: 100%;
      height: 100vh;
    }

    &__button {
      display: flex;
      background-color: transparent;
      border: none;
    }
    &__circle {
      width: 12px;
      height: 12px;
      background-color: black;
      border-radius: 8px;
      margin-right: 4px;
    }
    &__text {
      margin: 0;
      color: black;
      cursor: pointer;
    }
  }

  .menu-container {
    display: flex;
    .menu-catalogue, .menu-links {
      width: 220px;
      padding: 0;
      margin: 4px 0 0 0;
      &__item {
        list-style: none;
        margin-top: 4px;
      }
      &__text {
        font-weight: 300;
        font-size: 24px;
        color: white;
        text-decoration: none;
        &:hover {
          font-weight: 400;
        }
      }
    }
    .menu-catalogue {
      margin-left: 8px;
    }
    .menu-links {
      width: 300px;
      &__text {
        font-weight: 700;
        &:hover {
          font-weight: 700;
          font-size: 25px;
        }
      }
    }
  }

  @media screen and (max-width: 800px) {
    .header-menu {
      padding: 14px 16px;
      &__circle {
        width: 8px;
        height: 8px;
      }
    }

    .menu-container {
      .menu-catalogue, .menu-links {
        width: 180px;
        &__text {
          font-size: 16px;
        }
      }
      .menu-links {
        &__text {
          &:hover {
            font-size: 17px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    .header-menu {
      padding: 14px 8px;
      &__text {
        display: none;
      }
    }

    .menu-container {
      flex-direction: column;
      .menu-catalogue {
      }
      .menu-links {
        margin-left: 8px;
      }
    }
  }
</style>