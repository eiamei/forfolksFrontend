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
    window.addEventListener('resize', this.resizeHandler)
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
  @import "./assets/styles/_colors";
  .app {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*background-color: #494b4c;*/

  }
  html {
    font-size: 16px;
    background-color: white;
  }
  p {
    font-size: 16px;
  }
  @media screen and (max-width: 800px) {
    html {
      font-size: 14px;
    }
    p {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 500px) {
    html {
      font-size: 12px;
    }
    p {
      font-size: 12px;
    }
  }
</style>
