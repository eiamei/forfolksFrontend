<template>
  <nav :class="headerClass">
    <app-header-menu class="header-menu-container"/>
    <router-link to="/" class="header-logo">
      <forfolks-logo/>
    </router-link>
    <router-link class="header-bag" to="/bag">
      <component class="header-bag__icon" :is="bagType" />
      <p class="header-bag__qty" v-if="this.bagQty">{{this.bagQty}}</p>
    </router-link>
  </nav>
</template>

<script>
  import AppHeaderMenu from './AppHeader.menu';
  import ForfolksLogo from '../Icons/Logo';
  import Bag from '../Icons/Bag';
  import BagFull from '../Icons/BagFull';
  export default {
    name: 'app-header',
    components: {BagFull, Bag, ForfolksLogo, AppHeaderMenu},
    computed: {
      bagQty () {
        let total = 0;
        if (this.$store.state.bag.bag) {
          Object.keys(this.$store.state.bag.bag).map(bag => {
            total += this.$store.state.bag.bag[bag].qty;
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
      }
    }
  };
</script>

<style lang="scss">
  @import '../../assets/styles/colors';
  @import 'src/assets/styles/z-index';
  .header {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 2rem);
    top: 0;
    padding: 0.5rem 1rem;
    background: white;
  }

  .header-menu-container {
    top: 0;
    left: 0;
  }
  .header-logo {
    top: 0.5rem;
    left: calc(50% - 51px);
    .forfolks-logo {
      width: 6rem;
      height: 2rem;
    }
  }
  .header-bag {
    display: flex;
    top: 0.75rem;
    right: 1rem;
    text-decoration: none;
    &__icon {
      position: relative;
      width: 1.75rem;
      height: 1.75rem;
      transition: all .3s;
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