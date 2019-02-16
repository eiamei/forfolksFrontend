<template>
  <div class="header">
    <div class="header__controls">
      <router-link class="header__link header__link--left" to="store">Магазин</router-link>
      <!--<router-link class="header__link header__link&#45;&#45;left" to="catalogue">Каталог</router-link>-->
      <!--<router-link class="header__link" to="catalogue">Каталог</router-link>-->
      <!--<app-button class="button&#45;&#45;menu" content="Меню"/>-->
    </div>
    <router-link to="/" class="header__logo"></router-link>
    <div class="header__controls">
      <!--<router-link class="header__link" to="store">Магазин</router-link>-->
      <router-link class="header__link header__link--right" to="about">Информация</router-link>
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
    width: calc(100% - 48px);
    margin: 0 24px;
    border-bottom: 1px solid black;
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    position: absolute;
    top: 0;
    &__logo {
      background: url('../../../assets/svg/ForfolksLogo.svg') no-repeat;
      width: 122px;
      height: 24px;
    }
    &__controls {
      font-weight: 300;
    }
    &__link {
      color: black;
      text-decoration: none;
      font-size: 18px;
      font-weight: 300;
      &--left {
        /*margin-left: 24px;*/
      }
      &--right {
        /*margin-right: 24px;*/
      }
      &:hover {
        color: $dark-gray;
      }
    }
  }
  .router-link-exact-active {
    /*border-bottom: 1px solid black;*/
    color: $dark-gray;
    cursor: default;
  }
</style>