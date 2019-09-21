<template>
  <section style="width: 50px;">
    <span class="header-menu">
      <section style="display: flex">
        <template v-if="!isOpen">
          <app-button class="header-menu__button" @click="open">
            <template slot="content">
              <div class="header-menu__circle"></div>
              <div class="header-menu__circle"></div>
              <div class="header-menu__circle"></div>
            </template>
          </app-button>
          <p class="header-menu__text">Горшки</p>
        </template>
        <template  v-if="isOpen">
          <app-button class="header-menu__button" v-if="isOpen" @click="close">
            <template slot="content">
              <p>X</p>
            </template>
          </app-button>
        </template>
      </section>
      <nav class="menu-container" style="position: absolute" v-if="isOpen">
        <ul class="menu-catalogue">
          <li class="menu-catalogue__item" v-for="link in catalogue" :key="link.to">
            <router-link class="menu-catalogue__text" :to="link.to">{{$t(link.text)}}</router-link>
          </li>
        </ul>
      </nav>
    </span>
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
          to: 'store/all',
          text: 'items.alls'
        }, {
          to: 'store/pot',
          text: 'items.pots'
        }, {
          to: 'store/candlestick',
          text: 'items.candlesticks'
        }, {
          to: 'store/plate',
          text: 'items.plates'
        }, {
          to: 'store/vase',
          text: 'items.vases'
        }, {
          to: 'store/bouquet',
          text: 'items.bouquets'
        }, {
          to: 'store/hanging',
          text: 'items.hangings'
        }, {
          to: 'store/season',
          text: 'items.seasons'
        }]
      }
    },
    methods: {
      open () {
        this.isOpen = true;
      },
      close () {
        this.isOpen = false;
      }
    }
  };
</script>

<style lang="scss">

  .header-menu {
    position: absolute;

    &__button {
      display: flex;
      background-color: transparent;
      border: none;
    }
    &__circle {
      width: 12px;
      height: 12px;
      background-color: white;
      border-radius: 8px;
      margin-right: 4px;
    }
    &__text {
      color: white;
    }
  }

  .menu-container {
    .menu-catalogue {
      &__item {
        list-style: none;
      }
      &__text {
        font-weight: 300;
        font-size: 24px;
        color: black;
        text-decoration: none;
        &:hover {
          font-weight: 400;
        }
      }
    }
  }
</style>