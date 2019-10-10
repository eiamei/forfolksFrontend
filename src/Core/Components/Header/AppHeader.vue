<template>
  <nav class="header header--white">
    <app-header-menu class="header-menu-container"/>
    <router-link to="/" class="header-logo"></router-link>
    <router-link class="header-bag" to="/bag">
      <div class="header-bag__icon" :class="bagStyle"></div>
      <p class="header-bag__qty" v-if="this.bagQty">{{this.bagQty}}</p>
    </router-link>
  </nav>
</template>

<script>
  import AppHeaderMenu from './AppHeader.menu';
  export default {
    name: 'app-header',
    components: {AppHeaderMenu},
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
  .header {

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
  @media screen and (max-width: 800px) {
    .header-logo {
      top: 8px;
      left: calc(50% - 40px);
      width: 80px;
      height: 25px;
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
      width: 60px;
      height: 19px;
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