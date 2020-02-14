<template>
  <div class="app">
    <AppHeader/>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from './Core/Components/Header/AppHeader';

export default {
  name: 'app',
  components: {
    AppHeader
  },
  created () {
    window.addEventListener('resize', this.resizeHandler);
    this.$store.dispatch('store/loadStoreData');
  },
  mounted () {
    this.$store.dispatch('global/setNewWindowSize')
  },
  methods: {
    resizeHandler () {
      this.$store.dispatch('global/setNewWindowSize')
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<style lang="scss">
  @import "./assets/Styles/_globals";
  @import "assets/styles/colors";
  .app {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }
  html {
    font-size: 16px;
    background-color: white;
    @media screen and (max-width: 1400px) {
      font-size: 15px;
    }
    @media screen and (max-width: 1200px) {
      font-size: 14px;
    }
    @media screen and (max-width: 1000px) {
      font-size: 12px;
    }
    @media screen and (max-width: 800px) {
      font-size: 11px;
    }
    @media screen and (max-width: 600px) {
      font-size: 10px;
    }
    @media screen and (max-width: 400px) {
      font-size: 9px;
    }
  }
</style>
