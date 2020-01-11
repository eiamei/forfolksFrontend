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
  import ForfolksLogo from '../UI/Icons/Logo';
  import Bag from '../UI/Icons/Bag';
  import BagFull from '../UI/Icons/BagFull';
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
          'header--white': this.$route.name === 'bag' || this.$route.name === 'payments'
        }
      }
    }
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/_colors';
  @import '../../../assets/styles/atomic-common';
  @import '../../../assets/styles/z-index';
  .header {
    &--white {
      position: fixed;
      width: 100vw;
      height: 40px;
      top: 0;
      left: 0;
      background: white;
    }
  }

  .header-menu-container {
    @extend .a-position__fixed;
    @extend .z-index__top--header;
    top: 0;
    left: 0;
  }
  .header-logo {
    @extend .a-position__fixed;
    @extend .z-index__top--header;
    top: 8px;
    left: calc(50% - 51px);
    .forfolks-logo {
      width: 102px;
      height: 32px;
    }
  }
  .header-bag {
    @extend .a-position__fixed;
    @extend .a-flex;
    @extend .z-index__top--header;
    top: 12px;
    right: 16px;
    text-decoration: none;
    &__icon {
      @extend .a-position__relative;
      width: 28px;
      height: 28px;
      transition: all .3s;
      margin-right: 2px;
      &--empty {
        background: url("../../../assets/svg/bag-empty.svg") no-repeat;
      }
      &--filled {
        background: url("../../../assets/svg/bag-filled.svg") no-repeat;
      }
    }
    &__qty {
      margin: 4px 0 0 0;
      color: black;
    }
  }
  @media screen and (max-width: 800px) {
    .header-logo {
      top: 8px;
      left: calc(50% - 40px);
      .forfolks-logo {
        width: 80px;
        height: 25px;
      }
    }
    .header-bag {
      top: 12px;
      right: 16px;
      &__icon {
        width: 20px;
        height: 20px;
      }
      &__qty {
        margin: 2px 0 0 0;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .header-logo {
      top: 8px;
      left: calc(50% - 30px);
      .forfolks-logo {
        width: 60px;
        height: 19px;
      }
    }
    .header-bag {
      right: 8px;
      &__icon {
        width: 16px;
        height: 16px;
      }
      &__qty {
        margin: 0;
      }
    }
  }
</style>