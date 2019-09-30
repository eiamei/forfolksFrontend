<template>
  <nav class="header">
    <app-header-menu class="header-menu-container"/>
    <router-link to="/" class="header-logo"></router-link>
    <router-link class="header-bag" to="/bag">
      <div class="header-bag__icon" :class="bagStyle"></div>
      <p class="header-bag__qty" v-if="this.bagQty">{{this.bagQty}}</p>
    </router-link>
  </nav>
</template>

<script>
  import AppButton from '../UI/AppButton';
  import AppHeaderMenu from './AppHeader.menu';
  export default {
    name: 'app-header',
    components: {AppHeaderMenu, AppButton},
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
      bagStyle () {
        return this.bagQty ? 'header-bag__icon--filled' : 'header-bag__icon--empty';
      }
    }
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/_colors';
  @import '../../../assets/styles/atomic-common';
  @import '../../../assets/styles/z-index';

  .header-menu-container {
    @extend .a-position__fixed;
    @extend .z-index__top--header;
    top: 16px;
    left: 16px;
  }
  .header-logo {
    @extend .a-position__fixed;
    @extend .z-index__top--header;
    top: 8px;
    left: calc(50% - 51px);
    background: url('../../../assets/svg/ForfolksLogo.svg') no-repeat;
    width: 102px;
    height: 32px;
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
      color: white;
    }
  }
</style>