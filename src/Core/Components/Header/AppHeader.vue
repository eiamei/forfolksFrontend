<template>
  <nav class="header">
    <app-header-menu/>
    <router-link to="/" class="header__logo"></router-link>
    <router-link class="header__link header__link--bag" to="/bag">
      <div class="header-bag" :class="bagStyle"></div>
      <div v-if="this.bagQty">{{this.bagQty}}</div>
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
        return this.bagQty ? 'header-bag--filled' : 'header-bag--empty';
      }
    }
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/_colors';

  .header {
    position: fixed;
    width: calc(100% - 32px);
    margin: 0 16px;
    display: flex;
    top: 8px;
    z-index: 1000;
    background-color: transparent;
    &__logo {
      background: url('../../../assets/svg/ForfolksLogo.svg') no-repeat;
      width: 102px;
      height: 32px;
      align-self: center;
    }
    &__controls {
      font-weight: 300;
      display: flex;
      align-items: center;
    }
    &__link {
      color: $active-link;
      text-decoration: none;
      font-size: 14px;
      font-weight: 400;
      &:hover {
        color: black;
      }
      &--bag {
        position: absolute;
        margin-right: 8px;
        display: flex;
        color: white;
      }
    }
  }

  .router-link-exact-active {
    color: $dark-gray2;
    cursor: default;
  }

  @media screen and (max-width: 770px) {
    .header {
      padding: 12px 16px 10px 16px;
      width: calc(100% - 32px);
      &__link {
        font-size: .8em;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .header {
      /*margin: 0 8px;*/
      padding: 12px 8px 10px 8px;
      width: calc(100% - 16px);
    }
  }
  .header-bag {
    width: 32px;
    height: 32px;
    position: relative;
    transition: all .3s;
    margin-right: 2px;
    &--empty {
      background: url("../../../assets/svg/bag-empty.svg") no-repeat;
    }
    &--filled {
      background: url("../../../assets/svg/bag-filled.svg") no-repeat;
    }
  }
</style>