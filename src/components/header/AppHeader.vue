<template>
  <nav :class="headerClass">
    <button :class="menuButtonClass" @click="toogleMenu" title="Открыть меню">
      <hamburger></hamburger>
    </button>
    <router-link to="/" class="header-logo">
      <forfolks-logo/>
    </router-link>
    <router-link class="header-bag" to="/bag">
      <p class="header-bag__qty" v-if="this.bagQty">{{this.bagQty}}</p>
      <component class="header-bag__icon" :is="bagType" />
    </router-link>
    <app-header-menu class="header-menu-container" :isOpen="isMenuOpen" @close="toogleMenu"/>
  </nav>
</template>

<script>
  import AppHeaderMenu from './AppHeader.menu';
  import ForfolksLogo from '../Icons/Logo';
  import Bag from '../Icons/Bag';
  import BagFull from '../Icons/BagFull';
  import Hamburger from '../Icons/Hamburger';
  export default {
    name: 'app-header',
    components: {BagFull, Bag, ForfolksLogo, AppHeaderMenu, Hamburger},
    data () {
      return {
        isMenuOpen: false
      }
    },
    computed: {
      bagQty () {
        let total = 0;
        const items = this.$store.getters['bag/bagItems'];
        if (items) {
          Object.keys(items).map(bag => {
            total += items[bag].qty;
          });
        }
        return total;
      },
      bagType () {
        return this.bagQty ? 'bag-full' : 'bag';
      },
      headerClass () {
        return {
          'header': true,
          'z-index__top--header': true
        }
      },
      menuButtonClass () {
        return {
          'clean-button': true,
          'header__menu-button': true,
          'hamburger-icon--cross': this.isMenuOpen
        }
      }
    },
    methods: {
      toogleMenu () {
        this.isMenuOpen = !this.isMenuOpen;
      }
    }
  };
</script>

<style lang="scss">
  @import '../../assets/styles/vars';
  @import '../../assets/styles/colors';
  @import 'src/assets/styles/z-index';
  .header {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    top: 0;
    padding: 0.5rem 1rem;
    background: white;
    box-sizing: border-box;
    &__menu-button {
      z-index: 1;
    }
  }

  .header-menu-container {
    top: 0;
    left: 0;
  }
  .header-logo {
    top: 0.5rem;
    left: calc(50% - 51px);
    z-index: 1;
    .forfolks-logo {
      height: 1rem;
    }
  }
  .header-bag {
    display: flex;
    top: 0.75rem;
    right: 1rem;
    text-decoration: none;
    z-index: 1;
    &__icon {
      position: relative;
      width: 1.75rem;
      height: 1.75rem;
      &--empty {
        background: url("../../assets/svg/bag-empty.svg") no-repeat;
      }
      &--filled {
        background: url("../../assets/svg/bag-filled.svg") no-repeat;
      }
    }
    &__qty {
      margin: 0.25rem 0 0 0;
      color: black;
    }
  }
</style>