<template>
  <div class="header">
    <router-link to="/" class="header__logo"></router-link>
    <div class="header__controls">
      <router-link class="header__link" to="store">Магазин</router-link>
      <router-link class="header__link" to="about">О нас</router-link>
      <!--<router-link class="header__link" to="catalogue">Каталог</router-link>-->
      <!--<app-button class="button&#45;&#45;menu" content="Меню"/>-->
    </div>
  </div>
</template>

<script>
  // import AppButton from '../../Reusable/UI/AppButton';
  export default {
    name: 'app-header',
    components: {
      // AppButton
    }
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/_colors';
  .header {
    padding: 16px 24px;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $header-color;
    &__logo {
      background: url('../../../assets/svg/ForfolksLogo.svg') no-repeat;
      width: 122px;
      height: 40px;
    }
    &__controls {
      * {
        margin: 0 24px;
      }
    }
    &__link {
      color: black;
      text-decoration: none;
      &:hover {
        color: $active-link;
      }
    }
  }
  .router-link-exact-active {
    color: $active-link;
    font-weight: 700;
    cursor: default;
  }
</style>