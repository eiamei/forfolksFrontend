<template>
  <header class="header">
      <div class="header__controls">
        <router-link class="header__link" to="store">Магазин</router-link>
      </div>
      <router-link to="/" class="header__logo"></router-link>
      <div class="header__controls">
        <router-link class="header__link" to="about">О нас</router-link>
      </div>
  </header>
</template>

<script>
  export default {
    name: 'app-header'
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/_colors';
  .header {
    width: calc(100% - 80px);
    margin: 0 40px;
    border-bottom: 1px solid black;
    padding: 12px 0 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    position: absolute;
    top: 0;
    &__logo {
      background: url('../../../assets/svg/ForfolksLogo.svg') no-repeat;
      width: 86px;
      height: 24px;
    }
    &__controls {
      font-weight: 300;
    }
    &__link {
      color: $active-link;
      text-decoration: none;
      font-size: 14px;
      font-weight: 400;
      &:hover {
        color: black;
      }
    }
  }
  .router-link-exact-active {
    color: $dark-gray2;
    cursor: default;
  }
  @media screen and (max-width: 770px) {
    .header {
      margin: 0 16px;
      width: calc(100% - 32px);
      &__link {
        font-size: .8em;
        margin: 0 4px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .header {
      margin: 0 8px;
      width: calc(100% - 16px);
    }
  }
</style>