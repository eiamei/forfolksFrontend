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
    this.$store.dispatch('setNewWindowSize')
  },
  methods: {
    resizeHandler () {
      this.$store.dispatch('setNewWindowSize')
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<style lang="scss">
  @import "./assets/Styles/_globals";
  .app {
    font-family: 'HK Grotesk', 'Montserrat', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
